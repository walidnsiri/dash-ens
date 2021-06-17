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
} from "@coreui/react";
import { useHistory } from "react-router-dom";
import { queryApi } from "utils/queryApi";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email Obligatoire!"),
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
  const [errors, setErrors] = useState([]);
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
      console.log(values);
    },
  });

  useEffect(() => {
    // la7dha
  }, [errors]);

  const handleLogin = async function (e) {
    e.preventDefault();
    const body = JSON.stringify({
      username: "blablabla@nix.io",
      password: "walid",
    });
    const [user, error] = await queryApi("public/login", body, "POST");
    if (error) {
      setErrors(error);
    } else {
      setUser.setUser(user);
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
              <CInputGroup className="mb-3">
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
                {formik.errors.email && formik.touched.email && (
                <CFormText>
                  <p className="text-danger">
                    {formik.errors.email}
                  </p>
                </CFormText>)}
              </CInputGroup>
              <CInputGroup className="mb-4">
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
                {formik.errors.password && formik.touched.password && (
                <CFormText>
                  <p className="text-danger">
                    {formik.errors.password}
                  </p>
                </CFormText>)}
              </CInputGroup>
              {errors && (
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
                    onClick={ e => e.preventDefault()}
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
              <h1>Password Reset</h1>
              <p className="text-muted">Please enter your email</p>
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
                    Reset
                  </CButton>
                </CCol>
                <CCol xs="6" className="text-right">
                  <CButton
                    color="link"
                    className="px-0"
                    onClick={() => set((state) => !state)}
                  >
                    Cancel
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
