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
import CheckboxCardMultiple from "../../components/custom/checkboxCardMultiple";
import { groupBy } from "lodash-es";
import { fetchImageFromService } from "../../../utils/getImage";
import { LoaderSmallArea } from "../../../views/components/custom/Loaders";
import { trackPromise } from 'react-promise-tracker';
import {areas} from "../../../constants/areas";

const AnswerFollowupSchema = Yup.object().shape({
    answer: Yup.string()
        .required("Réponse obligatoire!"),
});





function GroupDetails(props) {
    const [modal, setModal] = useState({ show: false, message: "", type: "success" });
    moment.locale("fr");
    const { group,setTriggerComponentReRender,triggerComponentReRender } = props;
    const [collapsed, setCollapsed] = useState(false);
    const [collapsed1, setCollapsed1] = useState(true);
    const [users, setUsers] = useState([]);
    const [usersNotActive, setUsersNotActive] = useState([]);
    const [usersCombined, setUsersCombined] = useState([]);

    const setFilterUsersCombines = (user) =>{
        let users = usersCombined;
        let userIn = users.filter(u => u.id == user.id); 
        if(userIn.length == 0){
            users = [...users,user];
            setUsersCombined(users);
        }
        if(userIn.length > 0){
            let new_users = users.filter(u => u.id != user.id);
            setUsersCombined(new_users);
        }
        
    }

    const initialValues = {
        answer: group?.isAnswered ? group.answer : "",
    }

    const answerFollowup = async function (values) {
        const body = {
            "answer": values.answer,
        }
        const [res, error] = await queryApi("/notification/group/" + group?.id, body, "PUT");
        if (res) {
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
    const fetchimg = async (im) => {
        const img = await fetchImageFromService(im);
        if (img) return img;
    };

    const fetchUserImage = async(user)  => {
        const img = await fetchimg(user.image);
        return {...user, "image" : img? img : ""}
    }


    useEffect(() => {
        setUsersNotActive([]);
        setUsers(group.users);
        setUsersCombined(group.users);
    }, [group])


    useEffect(() => {
        const fetchNotBeloningUsers = async () => {

            const body = {
                type : group?.type ? group?.type : "" 
            };
            const [res, error] = await queryApi("user/group/notbelonging", body, "POST");
            if(res){
                const users = await Promise.all(res.map(async (user, index) => {
                        return res[index] = await fetchUserImage(user);
                }));
                setUsersNotActive(users);
            }
        }
        trackPromise(fetchNotBeloningUsers(),areas.group_users_to_add);
    }, [group]);


    //update groups
    const handleAddEnseignant = async() => {
        let ne_users =usersCombined.map((user,index) => {
            if(user.createdUser) {delete user.createdUser}
            if(user.lastModifiedByUser) {delete user.lastModifiedByUser}
            //if(user.createdAt) {delete user.createdAt}
            //if(user.modifiedAt) {delete user.modifiedAt}
            return user;   
        })
        const body = {
            type : group?.type ,
            up : group?.up,
            users : ne_users,
        };
        const [res, error] = await queryApi("group/"+ group.id, body, "PUT");
        if(res){
            setModal({ show: true, message: "Le groupe a été modifié avec succès", type: 'success' });
            //update group
            setTriggerComponentReRender(!triggerComponentReRender);
        }else {
            setModal({ show: true, message: error.details, type: 'error' });
        }
    }

    //delete groups
    const handleDeleteEnseignant = async() => {
        const [res, error] = await queryApi("group/" + group.id, null, "DELETE");
        if(res) {
            setModal({ show: true, message: "Le groupe a été modifié avec succès", type: 'success' });
            //remove group 
            setTriggerComponentReRender(!triggerComponentReRender);

        }else {
            setModal({ show: true, message: error.details, type: 'error' });
        }

    }

    return (
        <>
            <SuccessErrorModal onClose={() => setModal({ ...modal, show: false })} show={modal.show} type={modal.type} message={modal.message} />


            <CBadge color="success" style={{ marginBottom: "2%", marginTop: "2%" }}>{group?.type === "rdi" ? "RDI" : "UP"}</CBadge>


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
                                <strong>La liste des enseignants du groupe {group?.type}</strong>
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
                            <div className="scroll-grp">
                                <CheckboxCardMultiple users={users} setFilterUsersCombines={setFilterUsersCombines} checkboxgrid="gridCheckbox-grp" type="added"/> 
                            </div>
                            <div className="createdAt text-muted">Crée {moment(group?.createdAt).calendar()}</div>
                            <div className="modifiedAt text-muted">Modifiée {moment(group?.modifiedAt).calendar()}</div>
                        </CCardBody>
                    </CCollapse>
                </CCard>
            </CFade>
            <CForm className="form-horizontal mt-4" onSubmit={formik.handleSubmit}>
                <CFade timeout={300}>
                    <CCard>
                        <CRow>
                            <CCol className="float-left">
                                <h5 className="mt-4 ml-4">
                                    <strong>Modifier ou supprimer le groupe</strong>
                                    <br />
                                    <small className="text-danger">{group?.answered ? "Pas d'enseignants à ajouter" : "Veuillez ajouter les enseignants"}</small>
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
                                    </CCol>
                                    <div className="scroll-grp">
                                        <LoaderSmallArea area={areas.group_users_to_add} height={50} width={50} />
                                        <CheckboxCardMultiple users={usersNotActive} setFilterUsersCombines={setFilterUsersCombines} checkboxgrid="gridCheckbox-grp" type="toadd"/>
                                    </div>
                                </CRow>
                                <div className="form-actions">
                                    <CButton type="submit" style={{ backgroundColor: "#34c38f", color: "white" }} onClick={e => handleAddEnseignant()}>
                                        Ajouter/Supprimer enseignants
                                    </CButton>
                                    <CButton type="submit" className="ml-2" style={{ backgroundColor: "#e74c3c", color: "white" }} onClick={e =>handleDeleteEnseignant()}>
                                        supprimer le groupe
                                    </CButton>
                                </div>
                            </CCardBody>
                        </CCollapse>
                    </CCard>
                </CFade>
            </CForm>
        </>
    )
}


export default GroupDetails
