import React, { useState, useContext, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import CIcon from "@coreui/icons-react";
import logo from "../../../assets/img/brand/logo-esprit.svg";
import { UserContext } from "utils/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
//import useQuery from "../../components/custom/useQuery";

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
  CFormGroup,
} from "@coreui/react";
import { useHistory, useLocation } from "react-router-dom";
import { queryApi } from "utils/queryApi";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Veuillez saisir un email valide")
    .required("Email Obligatoire!"),
  password: Yup.string().required("Mot de passe obligatoire!"),
});

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Mot de passe obligatoire!"),
  repassword: Yup.string().oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
});

const EmailSchema = Yup.object().shape({
  email: Yup.string()
    .email("Veuillez saisir un email valide")
    .required("Email Obligatoire!"),
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Login() {
  const history = useHistory();
  const [user, setUser] = useContext(UserContext);
  const [cardIsMounted, setCardIsMounted] = useState(false);

  const setUsr = function (user) {
    if (user) setUser(user);
  };

  useEffect(() => {
    setCardIsMounted(true);
    if (user) {
      history.replace("dashboard");
      setCardIsMounted(false);
    }
    return () => {
      setCardIsMounted(false);
    };
  }, [user, history]);

  return (
    <div className="c-app c-default-layout flex-row align-items-center hero">
      <CContainer>
        <Logo />
        <CRow className="justify-content-center">
          <CCol>
            <CCardGroup>
              {cardIsMounted && <Card setUser={setUsr} />}
              <CCard
                className="text-white py-5 d-md-down-none cardbg"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Inscription</h2>
                    <p>
                      Bienvenue dans l'espace d'administration d'Esprit,
                      veuillez contacter votre administrateur pour accéder à cet
                      espace !
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
  let query = useQuery();
  console.log(query.get("token"));
  const [isTokenValid, setIsTokenValid] = useState(false);

  useEffect(() => {
    const isResetTokenValid = async () => {
      const [result, error] = await queryApi(
        "/public/isTokenValid/" + query.get("token")
      );
      if (result) {
        setIsTokenValid(result);
        setFlipped(true);
      }
      if (error) {
        setIsTokenValid(false);
        setFlipped(true);
      }
    };
    if (query?.get("token")) {
      isResetTokenValid();
    }
  }, [query]);

  const [renderError, setRenderError] = useState(false);
  const [renderEmailError, setRenderEmailError] = useState(null);
  //const history = useHistory();
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  const LogininitialValues = {
    email: "",
    password: "",
  };
  const PasswordResetValues = {
    password: "",
    repassword: "",
  };
  const EmailForPasswordResetinitialValues = {
    email: "",
  };

  const formik = useFormik({
    initialValues: LogininitialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });


  const passwordResetFormik = useFormik({
    initialValues: PasswordResetValues,
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      handlePasswordReset(values);
    },
  });

  const formikEmail = useFormik({
    initialValues: EmailForPasswordResetinitialValues,
    validationSchema: EmailSchema,
    onSubmit: (values) => {
      handleReintialiserEmail(values);
    },
  });

//////////////
  const handlePasswordReset = async function (values) {
    const body = JSON.stringify({
      password: values.password,
      repassword: values.repassword,
      token: query.get("token")
    });
    const [result, error] = await queryApi("public/resetpassword", body, "POST");
    if (result) {
      setUser.setUser(result);
      setRenderError(false);
    }
    if (error) {
      setRenderError(true);
    }
  };

  const handleLogin = async function (values) {
    const body = JSON.stringify({
      username: values.email,
      password: values.password,
    });
    const [user, error] = await queryApi("public/login", body, "POST");
    if (user) {
      setUser.setUser(user);
      setRenderError(false);
    }
    if (error) {
      setRenderError(true);
    }
  };

  const handleReintialiserEmail = async function (values) {
    const [msg, error] = await queryApi(
      "/public/forgottenpassword/" + values.email
    );
    if (msg) {
      setRenderEmailError(msg);
    }
    if (error) {
      setRenderEmailError(
        "Veuillez consulter votre email pour terminer la réinitialisation."
      );
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
                    <p className="text-danger">{formik.errors.email}</p>
                  </CFormText>
                )}
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
                    <p className="text-danger">{formik.errors.password}</p>
                  </CFormText>
                )}
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
                  <CButton color="primary" className="px-4" type="submit">
                    Login
                  </CButton>
                </CCol>
                <CCol xs="6" className="text-right">
                  <CButton
                    color="link"
                    className="px-0"
                    onClick={() => setFlipped((state) => !state)}
                  >
                    Mot de passe oublié?
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </animated.div>
      )}
      {flipped && !query.get("token") && (
        <animated.div
          className="p-4 cardlogin"
          style={{
            opacity,
            transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
          }}
        >
          <CCardBody>
            <CForm onSubmit={formikEmail.handleSubmit}>
              <h1>Réinitialisation du mot de passe</h1>
              <p className="text-muted">Veuillez saisir votre email</p>
              <br />
              <CInputGroup className="mb-3">
                <CInputGroupPrepend>
                  <CInputGroupText>
                    <CIcon name="cil-envelope-closed" />
                  </CInputGroupText>
                </CInputGroupPrepend>
                <CInput
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  name="email"
                  value={formikEmail.values.email}
                  onChange={formikEmail.handleChange}
                />
              </CInputGroup>
              {formikEmail.errors.email && formikEmail.touched.email && (
                <CFormText className="mt-0">
                  <p className="text-danger">{formikEmail.errors.email}</p>
                </CFormText>
              )}
              <br />
              {renderEmailError && (
                <CFormText>
                  <p className="text-danger">{renderEmailError}</p>
                </CFormText>
              )}
              <br />
              <CRow>
                <CCol xs="6">
                  <CButton color="primary" className="px-4" type="submit">
                    Réinitialiser
                  </CButton>
                </CCol>
                <CCol xs="6" className="text-right">
                  <CButton
                    color="link"
                    className="px-0"
                    onClick={() => setFlipped((state) => !state)}
                  >
                    Annuler
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </animated.div>
      )}
      {flipped && query.get("token") && isTokenValid && ( 
        <animated.div
          className="p-4 cardlogin"
          style={{
            opacity,
            transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
          }}
        >
          <CCardBody>
            <CForm onSubmit={passwordResetFormik.handleSubmit}>
              <h1>Réinitialisation du mot de passe</h1>
              <p className="text-muted">
                Veuillez saisir un nouveau mot de passe
              </p>
              <br />
              <CFormGroup>
                <CInputGroup className="mb-1">
                  <CInputGroupPrepend>
                    <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                  </CInputGroupPrepend>
                  <CInput
                    type="password"
                    placeholder="nouveau mot de passe"
                    name="password"
                    autoComplete="current-password"
                    value={passwordResetFormik.values.password}
                    onChange={passwordResetFormik.handleChange}
                  />
                </CInputGroup>
                {passwordResetFormik.errors.password && passwordResetFormik.touched.password && (
                  <CFormText>
                    <p className="text-danger">{passwordResetFormik.errors.password}</p>
                  </CFormText>
                )}
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
                    placeholder="Confirmer le nouveau mot de passe"
                    name="repassword"
                    autoComplete="current-password"
                    value={passwordResetFormik.values.password}
                    onChange={passwordResetFormik.handleChange}
                  />
                </CInputGroup>
                {passwordResetFormik.errors.password && passwordResetFormik.touched.password && (
                  <CFormText>
                    <p className="text-danger">{passwordResetFormik.errors.password}</p>
                  </CFormText>
                )}
              </CFormGroup>
              <br />
              <br />
              <CRow>
                <CCol xs="6">
                  <CButton color="primary" className="px-4" type="submit">
                    Réinitialiser
                  </CButton>
                </CCol>
                <CCol xs="6" className="text-right">
                  <CButton
                    color="link"
                    className="px-0"
                    onClick={() => setFlipped((state) => !state)}
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
