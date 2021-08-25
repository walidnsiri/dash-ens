import React, { useEffect, useState } from "react";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { queryApi } from '../../../utils/queryApi';
import { useFormik } from "formik";
import * as Yup from "yup";
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

const RefProductionSchema = Yup.object().shape({
    refproduction: Yup.string().min("5", "Ce champ doit avoir 5 caractères au minimum").required("Réference de production Obligatoire!"),
});




const AddProductionModal = (props) => {

    const { type, show, onClose, refprod } = props;
    const [message, setMessage] = useState("");

    const id = refprod?.id;
    const value = refprod?.refproduction;

    let initialValues = {
        refproduction: refprod?.refproduction ? refprod.refproduction: "",
    }

    const addrefproduction = async function (values) {
        const body = {
            refproduction: values.refproduction,
        };
        const [refprod, error] = await queryApi("rdi/refproduction", body, 'POST');
        if (refprod) {
            setMessage("La réference de production a été ajouté avec succès");
        }
        if (error) setMessage("Veuillez réessayez svp!")
    }

    const editrefproduction = async function (values) {
        const body = {
            refproduction: values.refproduction,
        };
        const [refprod, error] = await queryApi("rdi/refproduction/" + id, body, 'PUT');
        if (refprod) {
            setMessage("La réference de production a été modifier avec succès");
        }
        if (error) setMessage("Veuillez réessayez svp!")
    }



    useEffect(() => {
        setMessage("")
        const closeOnEspaceKeyDown = (e) => {
            if (e.charCode || e.keyCode === 27) {
                onClose();
            }
        };
        document.body.addEventListener("keydown", closeOnEspaceKeyDown);
        return () => {
            document.body.removeEventListener("keydown", closeOnEspaceKeyDown);
        };
    }, [onClose]);

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: RefProductionSchema,
        onSubmit: values => {
            if (type == "add") { addrefproduction(values) }
            else { editrefproduction(values) }
            console.log(values);
        },
    });

    return (
        <div
            className={`modal ${type === "add" ? "success" : "error"} ${show ? "show" : ""
                } `}
            onClick={onClose}
        >
            <div className="modal-dialog modal-confirm">
                <div className="modal-content">
                    <div className="modal-header" onClick={(e) => e.stopPropagation()}>
                        <div className="icon-box">
                            {type === "add" ? (
                                <AddIcon style={{ fontSize: 60 }} />
                            ) : (
                                <EditIcon style={{ fontSize: 60 }} />
                            )}
                        </div>
                        <h4 className="modal-title w-100">
                            {type === "add" ? (
                                "Ajouter Réference de production"
                            ) : (
                                "Modifier Réference de production"
                            )}

                        </h4>
                    </div>
                    <CForm className="form-horizontal" onSubmit={formik.handleSubmit}>
                        <div className="modal-body" onClick={(e) => e.stopPropagation()}>

                            <CFormGroup>
                                <CLabel htmlFor="refproduction">
                                    <em>Réference de production</em>
                                </CLabel>

                                <CInput
                                    id="refproduction"
                                    name="refproduction"
                                    placeholder="Réference de production"
                                    value={formik.values.refproduction}
                                    onChange={formik.handleChange}
                                />
                                {formik.errors.refproduction && formik.touched.refproduction ? (
                                    <CFormText>
                                        <p className="text-danger">{formik.errors.refproduction}</p>
                                    </CFormText>
                                ) : (
                                    <CFormText className="help-block">
                                        Veillez saisir la réference de production
                                    </CFormText>
                                )}
                            </CFormGroup>
                            

                            <CButton type="submit" color="primary">
                            {type === "add" ? (
                                "Ajouter"
                            ) : (
                                "Modifier"
                            )}
                            </CButton>
                            {message &&
                                <CFormText>
                                    <p className="text-danger">{message}</p>
                                </CFormText>
                            }

                        </div>
                        <div className="modal-footer">
                           
                        </div>
                    </CForm>
                </div>
            </div>
        </div>
    );
}

export default AddProductionModal;