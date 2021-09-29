import React, { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from '@material-ui/icons/FilterList';
import {
    CForm,
    CSelect,
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
import CheckboxCardMultiple from "../../../views/components/custom/checkboxCardMultiple";
import SuccessErrorModal from "./SuccessErrorModal";
import { queryApi } from '../../../utils/queryApi';

const ModalAddGroup = (props) => {
    const { show, onClose, onConfirm, setEnseignant, enseignant } = props;
    const [modal, setModal] = useState({ show: false, message: "", type: "success" });
    const [typeGroup,setTypeGroup] = useState("");
    const [up,setUp] = useState("");
    const [users,setUsers] = useState([]);

    const setens = (ens) => {
        setEnseignant(ens);
        setTimeout(() => {
            onClose();
        }, 600)
    }

    const addGroup = async function (e) {
        const body = {
            "type": typeGroup,
            "up": up,
            "users": users,
        }
        const [group, error] = await queryApi("group/register", body, 'POST', true);
        if (group) {
            onClose();
            setTimeout(() => {
                setModal({ show: true, message: "Le groupe a été ajouté avec succès", type: 'success' });
            },400);
        }
        if (error) {
            onClose();
            setTimeout(() => {
                setModal({ show: true, message: error.details, type: 'error' });
            },400);
        }
    }
    const handleTypeChange = (e) => {setTypeGroup(e.target.value)}
    const handleUpChange = (e) => {setUp(e.target.value)}


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
            <SuccessErrorModal onClose={() => setModal({ ...modal, show: false })} show={modal.show} type={modal.type} message={modal.message} />
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
                            <h4 className="modal-title w-100">Ajouter Groupe</h4>
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
                                <CFormGroup>
                                    <CLabel htmlFor="text-input">
                                        <em>Type</em>
                                    </CLabel>
                                    <CSelect
                                        custom
                                        name="typecompte"
                                        id="select"
                                        value={typeGroup}
                                        onChange={e => handleTypeChange(e)}
                                    >
                                        <option value="">Veuillez choisir le type</option>
                                        <option value="up">UP</option>
                                        <option value="rdi">RDI</option>
                                    </CSelect>
                                </CFormGroup>
                               {typeGroup == "up" &&
                                <CFormGroup>
                                    <CLabel htmlFor="text-input">
                                        <em>Type up</em>
                                    </CLabel>
                                    <CSelect
                                        custom
                                        name="up"
                                        id="select"
                                        value={up}
                                        onChange={e => handleUpChange(e)}
                                    >
                                        <option value="">Veuillez choisir le type</option>
                                        <option value="up">UP</option>
                                        <option value="rdi">RDI</option>
                                    </CSelect>
                                </CFormGroup>
                                }
                            <div className="scroll-ens">
                                <CheckboxCardMultiple users={users} setEnseignant={setens} enseignant={enseignant} checkboxgrid="gridCheckbox"/>
                            </div>
                        </div>

                            <div className="modal-footer justify-content-center">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={e=>addGroup(e)}
                                >
                                    Ajouter
                                </button>
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

            export default ModalAddGroup;