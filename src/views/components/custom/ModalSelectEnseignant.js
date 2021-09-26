import React, { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from '@material-ui/icons/FilterList';
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
    CInputRadio,
    CBadge
} from "@coreui/react";
import CheckboxCard from "../../../views/components/custom/CheckboxCards";

const ModalSelectEnseignant = (props) => {

    const { show, onClose, users, onConfirm, setEnseignant,enseignant } = props;

    const setens = (ens) =>  {
        setEnseignant(ens);
        setTimeout(()=>{
            onClose();
        },600)
    }
    useEffect(() => {
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


    return (
        <>
            <div className={`modal checkcard ${show ? "show" : ""}`} onClick={onClose}>
                <div className="modal-dialog modal-confirm">
                    <div className="modal-content">
                        <div
                            className="modal-header flex-column"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="icon-box">
                                <FilterListIcon
                                    style={{ fontSize: 60, color: "#f15e5e", marginTop: "8%" }}
                                />
                            </div>
                            <h4 className="modal-title w-100">Veuillez sélectionner l'utilisateur</h4>
                            <button
                                type="button"
                                className="close"
                                aria-hidden="true"
                                onClick={onClose}
                            >
                                &times;
                            </button>
                        </div>
                        <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                            <div className="scroll-ens">
                                <CheckboxCard users={users} setEnseignant={setens} enseignant={enseignant}/>
                            </div>
                        </div>

                        <div className="modal-footer justify-content-center">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >
                                Anuller
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default ModalSelectEnseignant;