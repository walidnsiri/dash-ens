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
    CBadge,
    CFormText
} from "@coreui/react";
import CheckboxCardMultiple from "../../../views/components/custom/checkboxCardMultiple";
import SuccessErrorModal from "./SuccessErrorModal";
import { queryApi } from '../../../utils/queryApi';
import { fetchImageFromService } from "../../../utils/getImage";
import { LoaderSmallArea } from "../../../views/components/custom/Loaders";
import { trackPromise } from 'react-promise-tracker';
import { areas } from "../../../constants/areas";

const fetchimg = async (im) => {
    const img = await fetchImageFromService(im);
    if (img) return img;
};

const fetchUserImage = async (user) => {
    const img = await fetchimg(user.image);
    return { ...user, "image": img ? img : "" }
}

const ModalAddGroup = (props) => {
    const { show, onClose, onConfirm, setEnseignant, enseignant, triggerUpdate } = props;
    const [modal, setModal] = useState({ show: false, message: "", type: "success" });
    const [typeGroup, setTypeGroup] = useState("");
    const [up, setUp] = useState("");
    const [users, setUsers] = useState([]);
    const [selectedUsers, setselectedUsers] = useState([]);
    const [ups, setUps] = useState([]);

    const setSelectsUsers = (users) => {
        setselectedUsers(users);
    }

    useEffect(() => {
        const fetchNotBeloningUsers = async () => {

            const body = {
                type: typeGroup ? typeGroup : ""
            };
            const [res, error] = await queryApi("user/group/notbelonging", body, "POST");
            if (res) {
                const users = await Promise.all(res.map(async (user, index) => {
                    return res[index] = await fetchUserImage(user);
                }));
                setUsers(users);
            }
        }
        if (typeGroup != "") {
            trackPromise(fetchNotBeloningUsers(), areas.group_users_to_add_modal);
        }
    }, [typeGroup])

    const validateFields = () => {
        if (typeGroup == 'rdi' && up == "") { return true }
        if (typeGroup == "up" && up != "") { return true }
        if (typeGroup == "up" && up == "") { return false }
        return false;
    }

    const addGroup = async function (e) {
        let proceed = validateFields();

        let ne_users = selectedUsers.map((user, index) => {
            if (user.createdUser) { delete user.createdUser }
            if (user.lastModifiedByUser) { delete user.lastModifiedByUser }
            //if(user.createdAt) {delete user.createdAt}
            //if(user.modifiedAt) {delete user.modifiedAt}
            return user;
        })
        //console.log(ne_users);
        const body = {
            "type": typeGroup,
            "up": up,
            "users": ne_users,
        }

        if (proceed) {
            const [group, error] = await queryApi("group/register", body, 'POST');
            if (group) {
                onClose();
                setTimeout(() => {
                    setModal({ show: true, message: "Le groupe a été ajouté avec succès", type: 'success' });
                    triggerUpdate();
                }, 400);
            }
            if (error) {
                onClose();
                console.error(error)
                setTimeout(() => {
                    setModal({ show: true, message: error.details, type: 'error' });
                }, 400);
            }
        } else {

        }
    }
    const handleTypeChange = (e) => {
        const type = e.target.value;
        setTypeGroup(type);
        if (type == "rdi") {
            setUp("");
        }
        setUsers([]);
    }
    const handleUpChange = (e) => { setUp(e.target.value) }


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

    useEffect(() => {
        //fetch ups not in agroup
        const fetchUps = async () => {
            //get all ups
            const [resUp, errorUp] = await queryApi("pedagogique/ups/up", null, 'GET');
            if (resUp) {
                // fetch ups not in a group
                const [res, error] = await queryApi("group/upNotInGroup", resUp, 'POST');
                if (res) {
                    setUps(res);
                } else { setUps([]) }
            } else { setUps([]) }
        }
        fetchUps();
    }, [])

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
                                    <em>Type Group</em>
                                </CLabel>
                                <CSelect
                                    custom
                                    name="typecompte"
                                    id="select"
                                    value={typeGroup}
                                    onChange={e => handleTypeChange(e)}
                                >
                                    <option value="">Veuillez choisir l'up</option>
                                    <option value="rdi" >rdi</option>
                                    <option value="up" >up</option>
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
                                        {ups.map((key, val) => {
                                        return <option value={key} key={key}>{key}</option>
                                        })}
                                    </CSelect>
                                </CFormGroup>
                            }
                            {typeGroup == "up" && !validateFields() && <CFormText>
                                <p className="text-danger">
                                    L'up ne doit pas être vide!
                                </p>
                            </CFormText>}

                            {typeGroup != "" && <div className="scroll-ens">
                                <LoaderSmallArea area={areas.group_users_to_add_modal} />
                                <CheckboxCardMultiple users={users} checkboxgrid="gridCheckbox" type="toadd" setSelectsUsers={setSelectsUsers} />
                            </div>}
                        </div>

                        <div className="modal-footer justify-content-center">
                            <button
                                type="button"
                                style={{ backgroundColor: "#34c38f", color: "white" }}
                                className="btn btn-secondary"
                                onClick={e => addGroup(e)}
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