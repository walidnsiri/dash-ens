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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CImg } from "@coreui/react";
import avatar from "../../../assets/img/avatars/6.jpg";

const ShowSuivi = () => {
  return (
    <>
    <CRow>
      <CCol xs="12" sm="12" md="12" lg="12" xl="12">
        <CCard className="mb-5 border-0 shadow-sm pb-1">
          <CCardBody>
            <CRow>
              <CCol xs="12" sm="12" md="12" lg="12" xl="12">
                <div className="suivi-card-info">
                  <div className="avatar-lg mr-4">
                    <CImg
                      src={avatar}
                      className="c-avatar-img"
                      alt="admin@bootstrapmaster.com"
                    />
                  </div>
                  <div className="mb-4">
                      <h2 className="mt-1">Firas matoussi</h2>
                  </div>
                  <div className="left-button">
                      <CButton color="success buttonstyle">changer enseignant</CButton>
                  </div>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow>
    <CCol xs="3" sm="3" md="3" lg="3" xl="3">
        <CCard className="mb-5 shadow-sm">
            <CCardBody>
                <div className="d-inline-block">
                    <h5 className="text-muted mb-3">Rdis</h5>
                    <h2 className="mb-0">12</h2>
                </div>
                <div className="float-right">img</div>
            </CCardBody>
        </CCard>
    </CCol>
    <CCol xs="3" sm="3" md="3" lg="3" xl="3">
        <CCard className="mb-5 shadow-sm">
            <CCardBody>
                <div className="d-inline-block">
                    <h5 className="text-muted mb-3">Rdis</h5>
                    <h2 className="mb-0">12</h2>
                </div>
                <div className="float-right">img</div>
            </CCardBody>
        </CCard>
    </CCol>
    <CCol xs="3" sm="3" md="3" lg="3" xl="3">
        <CCard className="mb-5 shadow-sm">
            <CCardBody>
                <div className="d-inline-block">
                    <h5 className="text-muted mb-3">Rdis</h5>
                    <h2 className="mb-0">12</h2>
                </div>
                <div className="float-right">img</div>
            </CCardBody>
        </CCard>
    </CCol>
    <CCol xs="3" sm="3" md="3" lg="3" xl="3">
        <CCard className="mb-5 shadow-sm">
            <CCardBody>
                <div className="d-inline-block">
                    <h5 className="text-muted mb-3">Rdis</h5>
                    <h2 className="mb-0">12</h2>
                </div>
                <div className="float-right">img</div>
            </CCardBody>
        </CCard>
    </CCol>
    
    </CRow>
    </>
  );
};

export default ShowSuivi;
