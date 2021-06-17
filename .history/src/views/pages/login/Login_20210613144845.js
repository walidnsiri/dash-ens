import React, { useState, useContext, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import CIcon from "@coreui/icons-react";
import logo from "../../../assets/img/brand/logo-esprit.svg";
import { UserContext } from "utils/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CFormText,
  CFormGroup
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { queryApi } from "utils/queryApi";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Veuillez saisir un email valide').required("Email Obligatoire!"),
  password: Yup.string().required("Mot de passe obligatoire!"),
});

function Login() {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);

  const setUsr = function (user) {
    setUser(user);
  };

  useEffect(() => {
    if (user) history.replace("dashboard");
  }, [user, history]);

  return (
    <div className="c-app c-default-layout flex-row align-items-center hero">
      <CContainer>
        <Logo />
        <CRow className="justify-content-center">
          <CCol>
            <CCardGroup>
              <Card setUser={setUsr} />
              <CCard
                className="text-white py-5 d-md-down-none cardbg"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Inscription</h2>
                    <p>
                    Bienvenue dans l'espace d'administration d'Esprit, veuillez contacter votre administrateur pour accéder à cet espace !
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

function Logo() {
  return (
    <div className="info">
      <CIcon src={logo} name="logo" height="70" alt="Logo" />
    </div>
  );
}

function Card(setUser) {
  const [requesterrors, setRequestErrors] = useState(null);
  const [renderError, setRenderError] = useState(false);
  const history = useHistory();
  const [flipped, set] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  const initialValues= {
    email: "",
    password: "",
  }
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: values => {
      handleLogin(values);
      setRequestErrors(null);
    },
  });

  useEffect(() => {
    console.log(requesterrors);
  }, [requesterrors]);

  const handleLogin = async function (values) {
    
    const body = JSON.stringify({
      username: values.email,
      password: values.password,
    });
    const [user, error] = await queryApi("public/login", body, "POST");
    if (error) {
      setRequestErrors(error);
      setRenderError(true);
    } else {
      setUser.setUser(user);
      setRenderError(false)
    }
  };
 
  return (
    <>
      {!flipped && (
        <animated.div
          className="p-4 cardlogin"
          style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
        >
          <CCardBody>
            <CForm onSubmit={formik.handleSubmit}>
              <h1>Login</h1>
              <p className="text-muted">Connectez-vous à votre compte</p>
              <CFormGroup>
              <CInputGroup className="mb-1">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-user" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="text"
                  placeholder="Email"
                  autoComplete="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </CInputGroup>
              {formik.errors.email && formik.touched.email && (
                <CFormText className="mt-0">
                  <p className="text-danger">
                    {formik.errors.email}
                  </p>
                </CFormText>)}
              </CFormGroup>
              
              <CFormGroup>
              <CInputGroup className="mb-1">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-lock-locked" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="password"
                  placeholder="Mot de passe"
                  name="password"
                  autoComplete="current-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                /> 
              </CInputGroup>
              {formik.errors.password && formik.touched.password && (
                <CFormText>
                  <p className="text-danger">
                    {formik.errors.password}
                  </p>
                </CFormText>)}
              </CFormGroup>
              
              
              {renderError && (
                <CFormText>
                  <p className="text-danger">
                    Nom d'utilisateur ou mot de passe incorrect
                  </p>
                </CFormText>
              )}
              <CRow>
                <CCol xs="6">
                  <CButton
                    color="primary"
                    className="px-4"
                    type="submit"
                  >
                    Login
                  </CButton>
                </CCol>
                <CCol xs="6" className="text-right">
                  <CButton
                    color="link"
                    className="px-0"
                    onClick={() => set((state) => !state)}
                  >
                    Mot de passe oublié?
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </animated.div>
      )}
      {flipped && (
        <animated.div
          className="p-4 cardlogin"
          style={{
            opacity,
            transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
          }}
        >
          <CCardBody>
            <CForm>
              <h1>Réinitialisation du mot de passe</h1>
              <p className="text-muted">Veuillez saisir votre email</p>
              <br />
              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-envelope-closed" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput type="email" placeholder="Email" autoComplete="email" />
              </CInputGroup>
              <br />
              <br />
              <CRow>
                <CCol xs="6">
                  <CButton color="primary" className="px-4">
                  Réinitialiser
                  </CButton>
                </CCol>
                <CCol xs="6" className="text-right">
                  <CButton
                    color="link"
                    className="px-0"
                    onClick={() => set((state) => !state)}
                  >
                    Annuler
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </animated.div>
      )}
    </>
  );
}

export default Login;
