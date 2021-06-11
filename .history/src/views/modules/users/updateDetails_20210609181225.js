import React, { useMemo, useState, useEffect, useCallback } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useDropzone } from "react-dropzone";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const updateUserSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Le nom d'utilisateur est trop court!")
    .max(15, "Le nom d'utilisateur est trop long!")
    .required("Nom d'utilisateur obligatoire!"),
  email: Yup.string().email().required("Email Obligatoire!"),
  password: Yup.string()
    .required("Mot de passe obligatoire!")
    .min(
      6,
      "Le mot de passe est trop court - devrait être de 6 caractères min"
    ),
});

const UpdateUser = () => {
  const history = useHistory();
  const [collapsed, setCollapsed] = React.useState(true);
  const [collapsed1, setCollapsed1] = React.useState(false);
  const [collapsed2, setCollapsed2] = React.useState(false);
  const [collapsed3, setCollapsed3] = React.useState(false);
  const [type, setType] = useState({ type: "NORMAL", renderRoles: true });
  const [roles, setRoles] = useState([]);
  const [rolevalidation, setrolevalidation] = useState(false);

  const handleCancel = () => {
    history.push("/user");
  };
  useEffect(() => {
    console.log(roles);
  }, [roles]);

  const handleTypeSelect = (e) => {
    switch (e.target.value) {
      case "NORMAL":
        setType({ type: e.target.value, renderRoles: true });
        setRoles([]);
        break;
      case "RDI":
        setType({ type: e.target.value, renderRoles: false });
        setRoles(["createEvent", "updateEvent", "handleArchivedEvent"]);
        break;
      case "CLUB":
        setType({ type: e.target.value, renderRoles: false });
        setRoles(["createEvent", "updateEvent", "handleArchivedEvent"]);
        break;
      default:
        setType({ type: e.target.value, renderRoles: false });
    }
  };


  function Accept(props) {
    const { setFieldValue } = props;
    const onDrop = useCallback((acceptedFiles) => {
      setFieldValue("files", acceptedFiles);
    }, []);
    const {
      acceptedFiles,
      fileRejections,
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: "image/jpeg, image/png",
      onDrop,
      maxFiles: 1
    });

    const style = useMemo(
      () => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      }),
      [isDragActive, isDragReject, isDragAccept]
    );
    const acceptedFileItems = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map((e) => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    ));

    return (
      <section className="container">
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(Only *.jpeg and *.png images will be accepted)</em>
        </div>
        <aside className="mt-4">
          <h5>Accepted files</h5>
          <ul>{acceptedFileItems}</ul>
          <h5>Rejected files</h5>
          <ul>{fileRejectionItems}</ul>
        </aside>
      </section>
    );
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      files: [],
    },
    validationSchema: updateUserSchema,
    onSubmit: (values) => {
      console.log(values);
      if (type.type === "NORMAL") {
        if (roles.length === 0) {
          if (collapsed1 === true) {
            setrolevalidation(true);
          } else {
            setCollapsed1(true);
            setrolevalidation(true);
          }
        } else {
          setrolevalidation(false);
        }
      }
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
                    <CIcon
                      name={collapsed ? "cil-arrow-top" : "cil-arrow-bottom"}
                    />
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
                        <em>Nom d'utilisateur</em>
                      </CLabel>

                      <CInput
                        id="text-input"
                        name="username"
                        placeholder="Username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.username && formik.touched.username ? (
                        <CFormText>
                          <p className="text-danger">
                            {formik.errors.username}
                          </p>
                        </CFormText>
                      ) : (
                        <CFormText>Nouveau nom d'utilisateur </CFormText>
                      )}
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="select">
                        <em>Type</em>
                      </CLabel>
                      <CSelect
                        custom
                        name="select"
                        id="select"
                        onChange={(e) => handleTypeSelect(e)}
                      >
                        <option value="NORMAL">Normal</option>
                        <option value="RDI">RDI</option>
                        <option value="CLUB">Club</option>
                      </CSelect>
                    </CFormGroup>
                    {type.type === "CLUB" && (
                      <CFormGroup>
                        <CLabel htmlFor="select">
                          <em>Clubs</em>
                        </CLabel>
                        <CSelect custom name="select" id="select">
                          <option value="Club1">Club1</option>
                          <option value="Club2">Club2</option>
                          <option value="Club3">Club3</option>
                        </CSelect>
                      </CFormGroup>
                    )}

                    {type.type === "RDI" && (
                      <CFormGroup>
                        <CLabel htmlFor="select">
                          <em>Rdis</em>
                        </CLabel>
                        <CSelect custom name="select" id="select">
                          <option value="RDI1">RDI1</option>
                          <option value="RDI2">RDI2</option>
                          <option value="RDI3">RDI3</option>
                        </CSelect>
                      </CFormGroup>
                    )}
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
                          Veillez entrer l'adresse e-mail
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
                    <CIcon
                      name={collapsed2 ? "cil-arrow-top" : "cil-arrow-bottom"}
                    />
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

        <CFade timeout={300}>
          <CCard>
            <CRow>
              <CCol className="float-left">
                <h5 className="mt-4 ml-4">
                  <strong>Mot de Passe</strong>
                  <br />
                  <small className="text-danger">
                    Mise à jour du mot de passe
                  </small>
                </h5>
              </CCol>
              <CCol className="float-right mt-4 mr-4">
                <div className="card-header-actions">
                  <CButton
                    color="link"
                    className="card-header-action btn-minimize"
                    onClick={() => setCollapsed3(!collapsed3)}
                  >
                    <CIcon
                      name={collapsed3 ? "cil-arrow-top" : "cil-arrow-bottom"}
                    />
                  </CButton>
                </div>
              </CCol>
            </CRow>
            <CCollapse show={collapsed3} timeout={1000}>
              <CCardBody>
                <CFormGroup>
                  <CLabel htmlFor="password-input2">
                    <em>Nouveau mot de passe</em>
                  </CLabel>

                  <CInput
                    type="password"
                    id="password-input2"
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />

                  {formik.errors.password && formik.touched.password ? (
                    <CFormText>
                      <p className="text-danger">{formik.errors.password}</p>
                    </CFormText>
                  ) : (
                    <CFormText className="help-block">
                      veuillez saisir le nouveau mot de passe
                    </CFormText>
                  )}
                </CFormGroup>
              </CCardBody>
            </CCollapse>
          </CCard>
        </CFade>
      </CForm>
    </>
  );
};

export default UpdateUser;
