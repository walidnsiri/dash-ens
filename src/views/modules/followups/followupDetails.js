import React, { useState, useEffect } from "react";
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CRow,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CButton,
  CPagination,
  CAlert,
  CSwitch,
  CImg,
  CBadge,
  CForm,
  CFade,
  CCollapse,
  CFormText,
  CSelect
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Moment from 'react-moment';
import moment from 'moment'
import { queryApi } from "../../../utils/queryApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import SuccessErrorModal from "../../components/custom/SuccessErrorModal";

const AnswerFollowupSchema = Yup.object().shape({
  answer: Yup.string()
    .required("Réponse obligatoire!"),
});





function FollowupDetails(props) {
  const [modal, setModal] = useState({ show: false, message: "", type: "success" });
  moment.locale("fr");
  const [reunion, setReunion] = useState({})
  const { followup } = props;
  const notification = followup?.notification;
  const [collapsed, setCollapsed] = useState(followup?.answered? false:true);
  const [collapsed1, setCollapsed1] = useState(followup?.answered? true:false);

  const initialValues = {
    answer: followup?.isAnswered? followup.answer:"",
  }

  const answerFollowup = async function (values) {
    const body = {
      "answer": values.answer,
    }
    const [res, error] = await queryApi("/notification/followup/"+followup?.id, body, "PUT");
    if(res){
      setModal({ show: true, message: "Répondu avec succès", type: 'success' });
    }
    if (error) setModal({ show: true, message: error.details, type: 'error' });
  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: AnswerFollowupSchema,
    onSubmit: values => {
      answerFollowup(values);
    },
  });

  useEffect(() => {
    const setRead = async () => {
      if (followup?.read == false) {
        const body = {
          "read": true,
        }
        const [res, error] = await queryApi("notification/followup/"+followup?.id, body, "PUT");
      }
    }

    const fetchRdi = async () => {
      if (notification?.type == "rdi") {
        const [res, error] = await queryApi("rdi/reunion/" + notification?.id_event);
        if (res) { setReunion(res) }
      }
    }

    if (!notification?.deleted) {
      setRead();
      fetchRdi();
    }
  }, [followup])

  if (!followup?.deleted) {
    return (
      <>
<SuccessErrorModal onClose={() => setModal({ ...modal, show: false })} show={modal.show} type={modal.type} message={modal.message} />


        <CBadge color="success" style={{ marginBottom: "2%", marginTop: "2%" }}>{notification?.type === "rdi" ? "Réunion RDI" : "Encadrement"}</CBadge>


        <hr
          style={{
            height: "1px",
            border: "none",
            color: "#333",
            backgroundColor: "#333",
            marginTop: "0%",
            marginBottom: "0%",
          }}
        />
        <CFade timeout={300} className="mt-4">



          <CCard>
            <CRow>
              <CCol className="float-left">
                <h5 className="mt-4 ml-4 mb-4">
                  <strong>Information de la réunion {notification?.type}</strong>
                  <small><div className="time text-muted">{moment(notification?.due_date).format('dddd')} de {reunion?.heure_deb}h à {reunion?.heure_fin}h</div></small>
                </h5>
              </CCol>
              <CCol className="float-right mt-4 mr-4">
                <div className="card-header-actions">
                  <CButton
                    color="link"
                    className="card-header-action btn-minimize"
                    onClick={() => setCollapsed1(!collapsed1)}
                  >
                    {collapsed1 ? (
                      <span className="fa fa-arrow-up"></span>
                    ) : (
                      <span className="fa fa-arrow-down"></span>
                    )}
                  </CButton>
                </div>
              </CCol>
            </CRow>
            <CCollapse show={collapsed1} timeout={1000}>
              <CCardBody>
                <div className="title text-truncate font-weight-bold">Titre: {reunion?.titre}</div>
                <div className="description"><h4>Description:</h4> {reunion?.description}</div>
                <div className="createdby"><h4>Crée par:</h4><span>{followup?.fullName}</span></div>
                <div className="Participants">
                  <div className="pt-3 mr-3 float-right">
                    <div className="c-avatar">
                      <CImg
                        src={followup?.image ? followup?.image : ""}
                        style={{ borderRadius: "50%", width: "200px", marginTop: "-250px", marginRight: "120px" }}
                        alt="admin@bootstrapmaster.com"
                      />

                    </div>
                  </div>
                </div>
                <div className="createdAt text-muted">Crée {moment(notification?.createdAt).calendar()}</div>
                <div className="modifiedAt text-muted">Modifiée {moment(notification?.modifiedAt).calendar()}</div>
              </CCardBody>
            </CCollapse>
          </CCard>
        </CFade>
        {followup?.active && (<CForm className="form-horizontal mt-4" onSubmit={formik.handleSubmit}>
          <CFade timeout={300}>
            <CCard>
              <CRow>
                <CCol className="float-left">
                  <h5 className="mt-4 ml-4">
                    <strong>Répondre au suivi</strong>
                    <br />
                    <small className="text-danger">{followup?.answered? "Vous avez déjà répondu à ce suivi": "veuillez remplir tous les champs"}</small>
                  </h5>
                </CCol>
                <CCol className="float-right mt-4 mr-4">
                  <div className="card-header-actions">
                    <CButton
                      color="link"
                      className="card-header-action btn-minimize"
                      onClick={() => setCollapsed(!collapsed)}
                    >
                      {collapsed ? (
                        <span className="fa fa-arrow-up"></span>
                      ) : (
                        <span className="fa fa-arrow-down"></span>
                      )}
                    </CButton>
                  </div>
                </CCol>
              </CRow>
              <CCollapse show={collapsed} timeout={1000}>
                <CCardBody>
                  <CRow>
                    <CCol sm="6">
                      <CFormGroup>
                        <CLabel htmlFor="text-input">
                          <em>Réponse</em>
                        </CLabel>
                        <CSelect
                          custom
                          name="answer"
                          id="select"
                          value={formik.values.answer}
                          onChange={formik.handleChange}
                        >
                          <option value="">Veuillez choisir la réponse</option>
                          <option value="done">la réunion a été faite</option>
                          <option value="not_done">la réunion n'a pas été faite</option>
                        </CSelect>
                        {(formik.errors.answer && formik.touched.answer) && (
                          <CFormText>
                            <p className="text-danger">
                              {formik.errors.answer}
                            </p>
                          </CFormText>
                        )}
                      </CFormGroup>
                    </CCol>

                  </CRow>
                  <div className="form-actions">
                    <CButton type="submit" style={{ backgroundColor: "#e74c3c", color: "white" }}>
                      Répondre
                    </CButton>
                  </div>
                </CCardBody>
              </CCollapse>
            </CCard>
          </CFade>
        </CForm>)}
      </>
    )
  }
}

export default FollowupDetails
