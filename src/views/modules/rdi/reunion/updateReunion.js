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
import { descriptionEnum } from "../../../../enums/description.enum";
import { reunionEnum } from "../../../../enums/reunion.enum";

import { useHistory,useLocation } from "react-router-dom";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DatePicker from 'react-date-picker';
import { productionEnum } from "enums/production.enum"
import CIcon from "@coreui/icons-react";
import { queryApi } from '../../../../utils/queryApi';
import { useFormik } from "formik";
import * as Yup from "yup";
import SuccessErrorModal from "../../../components/custom/SuccessErrorModal";
import AddProductionModal from "../../../components/custom/addproductionModal";
import { Range, getTrackBackground } from "react-range";
import { DateRangeSharp } from "@material-ui/icons";

const updateRdiSchema = Yup.object().shape({
    titre: Yup.string()
        .required("Titre obligatoire!"),
    description: Yup.string().required("Description Obligatoire!"),
    heured: Yup.object()
        .required("Heure début obligatoire!").test('heured-test',"L'heure de début doit être inférieur a l'heure de fin", function(value){
            const {heuref} = this.parent;
            return heuref.values[0] > value.values[0];
        }),
    heuref: Yup.object()
        .required("Heure fin obligatoire!").test('heured-test',"L'heure de fin doit être supérieur a l'heure de début", function(value){
            const {heured} = this.parent;
            return heured.values[0] < value.values[0];
        }),
    datereunion: Yup.date().required("date réunion obligatoire!").typeError("Date invalide")
});



const UpdateReunion = (props) => {
    const location = useLocation();
    const { reunion } = location.state;
    const [modal, setModal] = useState({ show: false, message: "", type: "success" });
    const history = useHistory();
    const [collapsed, setCollapsed] = useState(true);
    const [collapsed2, setCollapsed2] = useState(true);

    const initialValues = {
        titre: reunion? reunion.titre : "",
        description: reunion? reunion.description:"",
        heured: reunion? { values: [reunion.heure_deb] } : {values:[8]},
        heuref: reunion? { values: [reunion.heure_fin] } : {values:[9]},
        datereunion: new Date(reunion.date_reunion),
    }


    const updatereunion = async function (values) {
        let year = values.datereunion.getFullYear();
        let month = values.datereunion.getMonth() + 1;
        if (month < 10) { month = "0" + month }
        let day = values.datereunion.getDate();
        if(day < 10) {day= "0" + day}
        let heured = values.heured.values[0]; 
        let heuref= values.heuref.values[0];
        if(heured <10 && heured.toString().length == 1) heured= "0" + heured;
        if(heuref <10 && heuref.toString().length == 1) heuref= "0" + heuref;

        const body = {
          titre: values.titre,
          description: values.description,
          heure_deb: heured,
          heure_fin: heuref,
          date_reunion: year + "-" + month + "-" + day
        };
        
        const [res, error] = await queryApi("rdi/reunion/" + reunion.id, body, 'PUT');
        if (res) {
          setModal({ show: true, message: "La réunion a été modifié avec succès", type: 'success' });
        }
        if (error) setModal({ show: true, message: error.details, type: 'error' });
    }


    const handleCancel = () => {
        history.push("/reunion");
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: updateRdiSchema,
        onSubmit: values => {
            updatereunion(values);
        },
    });


    return (
        <>
            <SuccessErrorModal onClose={() => setModal({ ...modal, show: false })} show={modal.show} type={modal.type} message={modal.message} />
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
                                                <em>Titre</em>
                                            </CLabel>
                                            <CSelect
                                                custom
                                                name="titre"
                                                id="select"
                                                value={formik.values.titre}
                                                onChange={formik.handleChange}
                                            >
                                                <option value="">Veuillez choisir le titre</option>
                                                <option value={reunionEnum.Equipe_rdi}>Equipe RDI</option>
                                                <option value={reunionEnum.Partenaire}>Partenaire</option>
                                                <option value={reunionEnum.DRDI}>DRDI</option>
                                            </CSelect>
                                            {formik.errors.titre && formik.touched.titre ? (
                                                <CFormText>
                                                    <p className="text-danger">
                                                        {formik.errors.titre}
                                                    </p>
                                                </CFormText>
                                            ) : (
                                                <CFormText>
                                                    Titre réunion
                                                </CFormText>
                                            )}
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="production">
                                                <em>Description</em>
                                            </CLabel>
                                            <CSelect
                                                custom
                                                name="description"
                                                id="select"
                                                value={formik.values.description}
                                                onChange={formik.handleChange}
                                            >
                                                <option value="">Veuillez choisir la description</option>
                                                <option value={descriptionEnum.Lancement_project}>Lancement Projet</option>
                                                <option value={descriptionEnum.Suivie}>Suivie</option>
                                                <option value={descriptionEnum.Signature}>Signature</option>
                                                <option value={descriptionEnum.Autre}>Autre</option>
                                            </CSelect>
                                            {formik.errors.description && formik.touched.description ? (
                                                <CFormText>
                                                    <p className="text-danger">
                                                        {formik.errors.description}
                                                    </p>
                                                </CFormText>
                                            ) : (
                                                <CFormText>
                                                    La description de la réunion à modifier
                                                </CFormText>
                                            )}
                                        </CFormGroup>
                                    </CCol>

                                </CRow>
                                <div className="form-actions">
                                    <CButton type="submit" color="primary">
                                        Modifier
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
                                    <strong>Dates</strong>
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
                                <CRow>
                                    <CCol sm="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="heuredebut">
                                                <em>Heure Début</em>
                                            </CLabel>
                                            <Range
                                                step={1}
                                                min={8}
                                                max={17}
                                                values={formik.values.heured.values}
                                        onChange={(values) => { formik.setFieldValue("heured", {values}) }}
                                                renderTrack={({ props, children }) => (
                                                    <div
                                                        onMouseDown={props.onMouseDown}
                                                        onTouchStart={props.onTouchStart}
                                                        style={{
                                                            ...props.style,
                                                            height: "36px",
                                                            display: "flex",
                                                            width: "100%"
                                                        }}
                                                    >
                                                        <div
                                                            ref={props.ref}
                                                            style={{
                                                                height: "5px",
                                                                width: "100%",
                                                                borderRadius: "4px",
                                                                background: getTrackBackground({
                                                                    values: formik.values.heured.values,
                                                                    colors: ["#548BF4", "#ccc"],
                                                                    min: 8,
                                                                    max: 17
                                                                }),
                                                                alignSelf: "center"
                                                            }}
                                                        >
                                                            {children}
                                                        </div>
                                                    </div>
                                                )}
                                                renderThumb={({ props, isDragged }) => (
                                                    <div
                                                        {...props}
                                                        style={{
                                                            ...props.style,
                                                            height: "42px",
                                                            width: "42px",
                                                            borderRadius: "4px",
                                                            backgroundColor: "#FFF",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            boxShadow: "0px 2px 6px #AAA"
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                color: isDragged ? "#548BF4" : "#000",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            {formik.values.heured.values}
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                            {formik.errors.heured && formik.touched.heured ? (
                                                <CFormText>
                                                    <p className="text-danger">{formik.errors.heured}</p>
                                                </CFormText>
                                            ) : (
                                                <CFormText className="help-block">
                                                    Veillez sélectionner l'heure de début
                                                </CFormText>
                                            )}
                                        </CFormGroup>
                                        <CFormGroup>
                                            <CLabel htmlFor="password-input">
                                                <em>Date de réunion</em>
                                            </CLabel>
                                            <DatePicker
                                                format="y-MM-dd"
                                                className="datepicker border-0"
                                                onChange={(e) => { formik.setFieldValue("datereunion", e); }}
                                                value={formik.values.datereunion}
                                            />
                                            {formik.errors.datereunion && formik.touched.datereunion ? (
                                                <CFormText>
                                                    <p className="text-danger">
                                                        {formik.errors.datereunion}
                                                    </p>
                                                </CFormText>
                                            ) : (
                                                <CFormText className="help-block">
                                                    Veuillez saisir la date de réunion
                                                </CFormText>
                                            )}
                                        </CFormGroup>
                                    </CCol>
                                    <CCol sm="6">
                                        <CFormGroup>
                                            <CLabel htmlFor="heuredebut">
                                                <em>Heure Fin</em>
                                            </CLabel>
                                            <Range
                                                step={1}
                                                min={9}
                                                max={18}
                                                values={formik.values.heuref.values}
                                                onChange={(values) => { formik.setFieldValue("heuref", { values }); }}
                                                renderTrack={({ props, children }) => (
                                                    <div
                                                        onMouseDown={props.onMouseDown}
                                                        onTouchStart={props.onTouchStart}
                                                        style={{
                                                            ...props.style,
                                                            height: "36px",
                                                            display: "flex",
                                                            width: "100%"
                                                        }}
                                                    >
                                                        <div
                                                            ref={props.ref}
                                                            style={{
                                                                height: "5px",
                                                                width: "100%",
                                                                borderRadius: "4px",
                                                                background: getTrackBackground({
                                                                    values: formik.values.heuref.values,
                                                                    colors: ["#548BF4", "#ccc"],
                                                                    min: 9,
                                                                    max: 18
                                                                }),
                                                                alignSelf: "center"
                                                            }}
                                                        >
                                                            {children}
                                                        </div>
                                                    </div>
                                                )}
                                                renderThumb={({ props, isDragged }) => (
                                                    <div
                                                        {...props}
                                                        style={{
                                                            ...props.style,
                                                            height: "42px",
                                                            width: "42px",
                                                            borderRadius: "4px",
                                                            backgroundColor: "#FFF",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                            boxShadow: "0px 2px 6px #AAA"
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                color: isDragged ? "#548BF4" : "#000",
                                                                textAlign: "center",
                                                            }}
                                                        >
                                                            {formik.values.heuref.values}
                                                        </div>
                                                    </div>
                                                )}
                                            />
                                            {formik.errors.heuref && formik.touched.heuref ? (
                                                <CFormText>
                                                    <p className="text-danger">{formik.errors.heuref}</p>
                                                </CFormText>
                                            ) : (
                                                <CFormText className="help-block">
                                                    Veillez sélectionner l'heure de fin
                                                </CFormText>
                                            )}
                                        </CFormGroup>
                                    </CCol>
                                </CRow>

                            </CCardBody>
                        </CCollapse>
                    </CCard>
                </CFade>
            </CForm>
        </>);
};

export default UpdateReunion;
