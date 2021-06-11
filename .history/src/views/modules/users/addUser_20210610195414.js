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
} from "@coreui/react";
import Accept from '../../components/custom/Accept';
import CIcon from "@coreui/icons-react";

import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";



const AddUserSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(5, "Le nom complet de d'utilisateur est trop court!")
    .max(30, "Le nom complet de d'utilisateur est trop long!")
    .required("Nom d'utilisateur obligatoire!"),
  email: Yup.string().email().required("Email Obligatoire!"),
  password: Yup.string()
    .required("Mot de passe obligatoire!")
    .min(
      6,
      "Le mot de passe est trop court - devrait être de 6 caractères min"
    ),
  role: Yup.string()
  .required("Role is required"),
});

const AddUsers = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = React.useState(true);
  const [collapsed2, setCollapsed2] = React.useState(false);
  const [roles, setRoles] = useState([]);

  const handleCancel = () => {
    history.push("/user");
  };

  useEffect(() => {
    console.log(roles);
  }, [roles]);

  const handleTypeSelect = (e) => {
    switch (e.target.value) {
      case "ens":
        setRoles("");
        break;
      case "ens-cup":
        setRoles("");
        break;
      case "chef":
        setRoles("");
        break;
      case "admin":
        setRoles("");
        break;
      default:
        setRoles("");
    }
  };


  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      role: "",
      files: [],
    },
    validationSchema: AddUserSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
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
                        <em>Nom complet</em>
                      </CLabel>
                      <CInput
                        id="text-input"
                        name="fullname"
                        placeholder="Nom Complet"
                        value={formik.values.fullname}
                        onChange={formik.handleChange}
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
                      >
                        <option value="">Veuillez choisir le role</option>
                        <option value="ens">Chef de département</option>
                        <option value="ens-cup">Enseignant cup</option>
                        <option value="chef">Enseignant</option>
                        <option value="admin">Admin</option>
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
      </CForm>
    </>
  );
};

export default AddUsers;
