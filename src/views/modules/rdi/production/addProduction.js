import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CCollapse,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CInput,
  CLabel,
  CSelect,
  CRow,
  CBadge,
  CInputGroup,
  CInputGroupPrepend
} from "@coreui/react";



import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DatePicker from 'react-date-picker';
import { productionEnum } from "enums/production.enum"
import CIcon from "@coreui/icons-react";
import { queryApi } from '../../../../utils/queryApi';
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import SuccessErrorModal from "../../../components/custom/SuccessErrorModal";
import AddProductionModal from "../../../components/custom/addproductionModal";


const AddRdiSchema = Yup.object().shape({
  production: Yup.string()
    .required("Production obligatoire!"),
  description: Yup.string().min("5", "La description doit avoir 5 caractères au minimum").required("Email Obligatoire!"),
  charge: Yup.number().typeError("Doit être un nombre")
    .required("Charge horaire obligatoire!"),
  refproduction: Yup.string()
    .required("Reférence de production obligatoire!"),
  dateproduction: Yup.date().required("date de production obligatoire!").typeError("Date invalide")
});

const initialValues = {
  production: "",
  description: "",
  refproduction: "",
  charge: "",
  dateproduction: null,
}

const AddProduction = (props) => {
  const [modal, setModal] = useState({ show: false, message: "", type: "success" });
  const [modalproduction, setModalAddProduction] = useState({ show: false, value: "", type: "add", refprod: {} });
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);
  const [collapsed2, setCollapsed2] = useState(true);
  const [date, setdate] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedBadge, setSelectedBadge] = useState(1);
  const [refs, setRefs] = useState([]);
  const [filtered, setFiltered] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [hoveredRef, setHoveredRef] = useState("");

  const deleteRefProd = async function (refp) {
    const [resultRefProdDelete, error] = await queryApi("rdi/refproduction/" + refp.id, null, 'DELETE');
    if (resultRefProdDelete) {
      setModal({ show: true, message: "La réference de production a été supprimé avec succès", type: 'success' });
    }
    if (error) console.log(error)//setModal({ show: true, message: error.details, type: 'error' });
  }


  const addrdi = async function (values) {
    let year = values.dateproduction.getFullYear();
    let month = values.dateproduction.getMonth() + 1;
    if (month < 10) { month = "0" + month }
    let day = values.dateproduction.getDate();
    if(day < 10) {day= "0" + day}
    const body = {
      production: values.production,
      description: values.description,
      refproduction_id: values.refproduction,
      charge_h: values.charge,
      date_production: year + "-" + month + "-" + day
    };
    const [user, error] = await queryApi("rdi", body, 'POST');
    if (user) {
      setModal({ show: true, message: "L'rdi a été ajouté avec succès", type: 'success' });
    }
    if (error) setModal({ show: true, message: error.details, type: 'error' });
  }

  const filteredresults = function (search) {
    if (filtered) {
      return refs.filter(element => element.refproduction.includes(search));
    } else return [];
  }


  //fetch ref productions!
  useEffect(() => {
    const fetchref = async () => {
      const [res, error] = await queryApi("rdi/refproduction");
      if (res) {
        setRefs(res);
      }
      if (error) console.error(error);
    }
    fetchref();
  }, [modal,modalproduction])

  useEffect(() => {
    setFilteredResults(filteredresults(searchInput));
  }, [searchInput])

  function handleSelect(e) {
    const id = e.target.getAttribute("data-key");
    if (id === null) return;
    formik.setFieldValue("refproduction", id);
    setSelectedBadge(id);
  }

  function handleInputChange(e) {
    setSearchInput(e.target.value);
    if (e.target.value.length == 0) { setFiltered(false); }
    else { setFiltered(true); }
  }

  const handleCancel = () => {
    history.push("/rdi/production");
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: AddRdiSchema,
    onSubmit: values => {
      addrdi(values);
    },
  });

  const handleAddproduction = function () {
    setModalAddProduction({ ...modalproduction, show: true, type: 'add' });
  }

  return (
    <>
      <SuccessErrorModal onClose={() => setModal({ ...modal, show: false })} show={modal.show} type={modal.type} message={modal.message} />
      <AddProductionModal onClose={() => setModalAddProduction({ ...modalproduction, show: false })} show={modalproduction.show} type={modalproduction.type} refprod={modalproduction.refprod} />
      <CForm className="form-horizontal" onSubmit={formik.handleSubmit}>
        <CFade timeout={300}>
          <CCard>
            <CRow>
              <CCol className="float-left">
                <h5 className="mt-4 ml-4">
                  <strong>Information Basique</strong>
                  <br />
                  <small>veuillez remplir tous les champs</small>
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
                        <em>Description</em>
                      </CLabel>
                      <CInput
                        id="text-input"
                        name="description"
                        placeholder="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}

                      />
                      {formik.errors.description && formik.touched.description ? (
                        <CFormText>
                          <p className="text-danger">
                            {formik.errors.description}
                          </p>
                        </CFormText>
                      ) : (
                        <CFormText>
                          Description rdi
                        </CFormText>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="production">
                        <em>Production</em>
                      </CLabel>
                      <CSelect
                        custom
                        name="production"
                        id="select"
                        value={formik.values.production}
                        onChange={formik.handleChange}
                      >
                        <option value="">Veuillez choisir la production</option>
                        <option value={productionEnum.Article_de_recherche}>Article de recherche</option>
                        <option value={productionEnum.papier_scientifique}>Papier scientifique</option>
                        <option value={productionEnum.these_de_recherche}>Thèse de recherche</option>
                        <option value={productionEnum.developpement_projet_innovant}>Développement projet innovant</option>
                      </CSelect>
                      {formik.errors.production && formik.touched.production ? (
                        <CFormText>
                          <p className="text-danger">
                            {formik.errors.production}
                          </p>
                        </CFormText>
                      ) : (
                        <CFormText>
                          La production rdi à ajouter
                        </CFormText>
                      )}
                    </CFormGroup>
                  </CCol>
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="chargehoraire">
                        <em>Charge Horaire</em>
                      </CLabel>

                      <CInput
                        id="chargehoraire"
                        name="charge"
                        placeholder="Charge horaire"
                        value={formik.values.charge}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.charge && formik.touched.charge ? (
                        <CFormText>
                          <p className="text-danger">{formik.errors.charge}</p>
                        </CFormText>
                      ) : (
                        <CFormText className="help-block">
                          Veillez entrer la charge horaire
                        </CFormText>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="password-input">
                        <em>Date de production</em>
                      </CLabel>
                      <DatePicker
                        format="yyyy-MM-dd"
                        className="datepicker border-0"
                        onChange={(e) => { formik.setFieldValue("dateproduction", e); }}
                        value={formik.values.dateproduction}
                      />
                      {formik.errors.dateproduction && formik.touched.dateproduction ? (
                        <CFormText>
                          <p className="text-danger">
                            {formik.errors.dateproduction}
                          </p>
                        </CFormText>
                      ) : (
                        <CFormText className="help-block">
                          Veuillez saisir la date de production
                        </CFormText>
                      )}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <div className="form-actions">
                  <CButton type="submit" color="primary">
                    Ajouter
                  </CButton>
                  <CButton
                    color="secondary"
                    className="ml-1"
                    onClick={handleCancel}
                  >
                    Cancel
                  </CButton>
                </div>
              </CCardBody>
            </CCollapse>
          </CCard>
        </CFade>

        <CFade timeout={300}>
          <CCard>
            <CRow>
              <CCol className="float-left">
                <h5 className="mt-4 ml-4">
                  <strong>Réference de production</strong>
                  <CButton className="addbutton ml-2 mb-2" onClick={(e) => handleAddproduction()}>
                    <i className="fa fa-plus"></i>
                  </CButton>
                  <br />
                  {formik.errors.refproduction && formik.touched.refproduction ? (
                    <CFormText>
                      <p className="text-danger">
                        {formik.errors.refproduction}
                      </p>
                    </CFormText>
                  ) : (
                    <CFormText className="help-block">
                      <small>Veuillez choisir la réference de production</small>
                    </CFormText>
                  )}
                </h5>
              </CCol>
              <CCol className="float-right mt-4 mr-4">
                <div className="card-header-actions">
                  <CButton
                    color="link"
                    className="card-header-action btn-minimize"
                    onClick={() => setCollapsed2(!collapsed2)}
                  >
                    {collapsed2 ? (
                      <span className="fa fa-arrow-up"></span>
                    ) : (
                      <span className="fa fa-arrow-down"></span>
                    )}
                  </CButton>
                </div>
              </CCol>
            </CRow>
            <CCollapse show={collapsed2} timeout={1000}>
              <CCardBody>
                <CInputGroup >
                  <CInputGroupPrepend>
                    <CButton type="button" color="primary" className="shadow-lg " style={{ zIndex: 1 }}>
                      <CIcon name="cil-magnifying-glass" />
                    </CButton>
                  </CInputGroupPrepend>
                  <CInput
                    id="input1-group2"
                    name="input1-group2"
                    placeholder="Rechercher la réference de production..."
                    value={searchInput}
                    onChange={handleInputChange}
                    className="shadow-sm bg-white rounded  search-bar"
                    style={{ zIndex: 0 }}
                  />
                </CInputGroup>
                <CRow className="d-flex mt-5">
                  <CCol sm="12" xl="12" xs="12" md="12" >
                    <div className="scroll-refprod">

                      {filtered && filteredResults?.map((ref,index) => (
                        <div key={index} className="" style={{ display: "inline-block" }} onMouseEnter={() => setHoveredRef(ref.id)}
                          onMouseLeave={() => setHoveredRef("")}>
                          <CBadge key={ref.id} data-key={ref.id} color={selectedBadge == ref.id ? "success" : "danger"} style={{ padding: "20px", marginRight: "15px", marginBottom: "15px" }} onClick={(e) => { handleSelect(e) }}
                          >
                            {ref.refproduction}
                          </CBadge>
                          {hoveredRef == ref.id && <div style={{ display: "inline-block" }}>
                            <CButton onClick={e => { deleteRefProd(ref) }}><DeleteIcon /></CButton>
                            <CButton onClick={e => { setModalAddProduction({ ...modalproduction, show: true, type: 'edit', refprod: ref }); }}><EditIcon /></CButton>
                          </div>}
                        </div>
                      ))}


                      {!filtered && refs?.map((ref,index) => (
                        <div key={index} className="" style={{ display: "inline-block" }} onMouseEnter={() => setHoveredRef(ref.id)}
                          onMouseLeave={() => setHoveredRef("")}>
                          <CBadge key={ref.id} data-key={ref.id} color={selectedBadge == ref.id ? "success" : "danger"} style={{ padding: "20px", marginRight: "15px", marginBottom: "15px" }} onClick={(e) => { handleSelect(e) }}
                          >
                            {ref.refproduction}
                          </CBadge>
                          {hoveredRef == ref.id && <div style={{ display: "inline-block" }}>
                            <CButton onClick={e => { deleteRefProd(ref) }}><DeleteIcon /></CButton>
                            <CButton onClick={e => { setModalAddProduction({ ...modalproduction, show: true, type: 'edit', refprod: ref }); }}><EditIcon /></CButton>
                          </div>}
                        </div>
                      ))}
                    </div>
                  </CCol>
                </CRow>

              </CCardBody>
            </CCollapse>
          </CCard>
        </CFade>
      </CForm>
    </>);
};

export default AddProduction;
