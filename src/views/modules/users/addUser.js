import React, { useEffect, useState } from "react";
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
  CInput,
  CLabel,
  CSelect,
  CRow,
} from "@coreui/react";
import { queryApi } from '../../../utils/queryApi';
import Accept from '../../components/custom/Accept';
import { userRoles } from '../../../enums/roles.enum';

import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import SuccessErrorModal from "../../components/custom/SuccessErrorModal";
import { SignalCellularConnectedNoInternet0Bar } from "@material-ui/icons";


const AddUserSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(5, "Le nom complet de d'utilisateur est trop court!")
    .max(30, "Le nom complet de d'utilisateur est trop long!")
    .required("Nom d'utilisateur obligatoire!"),
  email: Yup.string().email().required("Email Obligatoire!"),
  password: Yup.string()
    .required("Mot de passe obligatoire!")
    /* .min(
       8,
       "Le mot de passe est trop court - devrait être de 8 caractères minimum!"
     )*/
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Le mot de passe doit contenir au minimum: 8 caractères, une lettre majuscule, une lettre minuscule, un nombre et un Caractère spécial!"),
  role: Yup.string()
    .required("Le role est obligatoire"),
});

const initValues = {
  fullname: "",
  email: "",
  role: "",
  password: "",
  files: [],
}

const AddUsers = (props) => {
  const [modal, setModal] = useState({ show: false, message: "", type: "success" });
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(true);
  const [collapsed1, setCollapsed1] = useState(true);
  const [collapsed2, setCollapsed2] = useState(false);
  const [typeCompte, setTypeCompte] = useState("");
  const [unregisteredteachers, setunregisteredteachers] = useState([]);
  const [selectedteacher, setSelectedteacher] = useState("");
  const [renderInformationBasique, setRenderInformationBasique] = useState(false);
  const [initialValues, setInitialValues] = useState(initValues);


  const handleCancel = () => {
    history.push("/user");
  };

  useEffect(()=>{
    if(typeCompte == userRoles.ENS){
      if(selectedteacher=="")setRenderInformationBasique(false)
    }
    else{
      setSelectedteacher("");
    }
    
    },[typeCompte])

  useEffect(() => {
    const fetchUnregisteredteachers = async () => {
      const [res, error] = await queryApi("user/getNonRegisteredENS", null, 'GET');
      if (res) {
        setunregisteredteachers(res);
      }
      if (error) { setunregisteredteachers([]) }
    }
    if (typeCompte == userRoles.ENS) { fetchUnregisteredteachers(); }
  }, [typeCompte])

  const addUser = async function (values) {
    const body = {
      request: {
        "username": values.email,
        "password": values.password,
        "fullName": values.fullname,
        "authorities": [values.role],
        "up": typeCompte == userRoles.ENS?JSON.parse(selectedteacher).up:""
      },
      file: values.files
    }
    console.log(body)
    const [user, error] = await queryApi("user/register", body, 'POST', true);
    if (user) {
      setModal({ show: true, message: "L'utilisateur a été ajouté avec succès", type: 'success' });
    }
    if (error) setModal({ show: true, message: error.details, type: 'error' });
  }

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: AddUserSchema,
    enableReinitialize: true,
    onSubmit: values => {
      addUser(values);

    },
  });
  const handleTypeChange = (e) => {
    let type= e.target.value;
    setTypeCompte(type);
    if(type==userRoles.USER_ADMIN || type ==userRoles.DSI){
      const initv = {
        fullname: "",
        email: "",
        role: type,
        password: "",
        files: []
      }
      setInitialValues(initv)
      setRenderInformationBasique(true)
    }
  }
  const handleteacherChange = (e) => {
    let teacher = e.target.value;
    setSelectedteacher(teacher)
    if(teacher !== ""){
    teacher =JSON.parse(teacher);
    setRenderInformationBasique(true)
    const fullname = teacher.prenom_ENS+" "+teacher.nom_ENS;
    const email = teacher.mail_ENS;
    let role = "";
    if (teacher.type_UP == 'O') { role = userRoles.ENS_UP; }
    else if (teacher.chef_DEPT == 'O') { role = userRoles.ENS_CHEF }
    else { role = userRoles.ENS }
    const initv = {
      fullname: fullname,
      email: email,
      role: role,
      password: "",
      files: []
    }
    setInitialValues(initv)
  }
  }
  return (
    <>
      <SuccessErrorModal onClose={() => setModal({ ...modal, show: false })} show={modal.show} type={modal.type} message={modal.message} />
      <CForm className="form-horizontal" onSubmit={formik.handleSubmit}>
        <CFade timeout={300}>
          <CCard>
            <CRow>
              <CCol className="float-left">
                <h5 className="mt-4 ml-4">
                  <strong>Type du compte</strong>
                  <br />
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
                <CRow>
                  <CCol sm="6">
                    <CFormGroup>
                      <CLabel htmlFor="text-input">
                        <em>Type</em>
                      </CLabel>
                      <CSelect
                        custom
                        name="typecompte"
                        id="select"
                        value={typeCompte}
                        onChange={e => handleTypeChange(e)}
                      >
                        <option value="">Veuillez choisir le role</option>
                        <option value={userRoles.ENS}>Enseignant</option>
                        <option value={userRoles.USER_ADMIN}>Admin</option>
                        <option value={userRoles.DSI}>DSI</option>
                      </CSelect>
                    </CFormGroup>
                    {typeCompte == userRoles.ENS && <CFormGroup>
                      <CLabel htmlFor="role">
                        <em>Enseignant</em>
                      </CLabel>
                      <CSelect
                        custom
                        name="enseignant"
                        id="select"
                        value={selectedteacher}
                        onChange={e => handleteacherChange(e)}
                      >
                        <option value="">Veuillez choisir le role</option>
                        {unregisteredteachers?.map((teacher, index) => {
                          return <option key={index} value={JSON.stringify(teacher)}>{teacher.mail_ENS}</option>
                        })}
                      </CSelect>

                      <CFormText>
                        L'enseignant à ajouter
                      </CFormText>
                    </CFormGroup>}
                  </CCol>
                </CRow>
              </CCardBody>
            </CCollapse>
          </CCard>
        </CFade>



        {renderInformationBasique &&
          <>
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
                            <em>Nom complet</em>
                          </CLabel>
                          <CInput
                            id="text-input"
                            name="fullname"
                            placeholder="Nom Complet"
                            value={formik.values.fullname}
                            onChange={formik.handleChange}
                            disabled={typeCompte == userRoles.ENS?true:false}

                          />
                          {formik.errors.fullname && formik.touched.fullname ? (
                            <CFormText>
                              <p className="text-danger">
                                {formik.errors.fullname}
                              </p>
                            </CFormText>
                          ) : (
                            <CFormText>
                              Nom complet de l'utilisateur à ajouter
                            </CFormText>
                          )}
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="role">
                            <em>Role</em>
                          </CLabel>
                          <CSelect
                            custom
                            name="role"
                            id="select"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            disabled={true}
                          >
                            <option value="">Veuillez choisir le role</option>
                            <option value={userRoles.ENS_CHEF}>Chef de département</option>
                            <option value={userRoles.ENS_UP}>Enseignant cup</option>
                            <option value={userRoles.ENS}>Enseignant</option>
                            <option value={userRoles.USER_ADMIN}>Admin</option>
                            <option value={userRoles.DSI}>DSI</option>
                          </CSelect>
                          {formik.errors.role && formik.touched.role ? (
                            <CFormText>
                              <p className="text-danger">
                                {formik.errors.role}
                              </p>
                            </CFormText>
                          ) : (
                            <CFormText>
                              Le role de l'utilisateur à ajouter
                            </CFormText>
                          )}
                        </CFormGroup>
                      </CCol>
                      <CCol sm="6">
                        <CFormGroup>
                          <CLabel htmlFor="email-input">
                            <em>Email</em>
                          </CLabel>

                          <CInput
                            type="email"
                            id="email-input"
                            name="email"
                            placeholder="Email"
                            autoComplete="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            disabled={typeCompte == userRoles.ENS?true:false}
                          />
                          {formik.errors.email && formik.touched.email ? (
                            <CFormText>
                              <p className="text-danger">{formik.errors.email}</p>
                            </CFormText>
                          ) : (
                            <CFormText className="help-block">
                              Veillez entrer votre adresse e-mail
                            </CFormText>
                          )}
                        </CFormGroup>
                        <CFormGroup>
                          <CLabel htmlFor="password-input">
                            <em>Mot de passe</em>
                          </CLabel>
                          <CInput
                            type="password"
                            id="password-input"
                            name="password"
                            placeholder="Mot de passe"
                            autoComplete="new-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                          />
                          {formik.errors.password && formik.touched.password ? (
                            <CFormText>
                              <p className="text-danger">
                                {formik.errors.password}
                              </p>
                            </CFormText>
                          ) : (
                            <CFormText className="help-block">
                              Veuillez saisir un mot de passe complexe
                            </CFormText>
                          )}
                        </CFormGroup>
                      </CCol>
                    </CRow>
                    <div className="form-actions">
                      <CButton type="submit" color="primary">
                        Save changes
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
                      <strong>Image Utilisateur</strong>
                      <br />
                      <small>Veuillez choisir l'image de l'utilisateur</small>
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
                    <Accept setFieldValue={formik.setFieldValue} />
                  </CCardBody>
                </CCollapse>
              </CCard>
            </CFade>
          </>}
      </CForm>
    </>
  );
};

export default AddUsers;
