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
  CCallout
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CImg } from "@coreui/react";
import avatar from "../../../assets/img/avatars/6.jpg";

const ShowSuivi = () => {
  return (
    <>
    <CRow>
      <CCol xs="12" sm="12" md="12" lg="12" xl="12">
        <CCard className="border-0 shadow-sm pb-1">
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
                  <div className="d-inline-block">
                    <h5>Grade: </h5>
                    <p>Assistant Technologue</p>
                  </div>
                  
                  <div>
                    <h5>Grade Actuelle:</h5><br/>
                    <b>Assistant Technologue</b>
                  </div>
                  <div>
                  <h5>Tel:</h5>
                  <b>+216 52566912</b>
                  </div>
                  <div>
                  <h5>e-mail</h5>
                  <b>user@esprit.tn</b>
                  </div>
                </div>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    <CRow className="mr-5 ml-5 heigher-row">
    <CCol xs="2" sm="2" md="2" lg="2" xl="2">
        <CCard className="mb-5 shadow-sm border-0 small-card-as-button">
            <CCardBody>
            <CCallout color="danger d-inline-block mt-0">
                        <h5 className="mb-1">Rdis</h5>
                        <strong className="h2 mb-0">12</strong>
                      </CCallout>
                <div className="float-right">img</div>
            </CCardBody>
        </CCard>
    </CCol>
    <CCol xs="2" sm="2" md="2" lg="2" xl="2">
        <CCard className="mb-5 shadow-sm border-primary small-card-as-button">
            <CCardBody>
            <CCallout color="danger d-inline-block mt-0">
                        <h5 className="mb-1">Congés</h5>
                        <strong className="h2 mb-0">7</strong>
                      </CCallout>
                <div className="float-right">img</div>
            </CCardBody>
        </CCard>
    </CCol><CCol xs="2" sm="2" md="2" lg="2" xl="2">
        <CCard className="mb-5 shadow-sm border-0 small-card-as-button">
            <CCardBody>
            <CCallout color="danger d-inline-block mt-0">
                        <h5 className="mb-1">Encadrements</h5>
                        <strong className="h2 mb-0">2</strong>
                      </CCallout>
                <div className="float-right">img</div>
            </CCardBody>
        </CCard>
    </CCol><CCol xs="2" sm="2" md="2" lg="2" xl="2">
        <CCard className="mb-5 shadow-sm border-0 small-card-as-button">
            <CCardBody>
            <CCallout color="danger d-inline-block mt-0">
                        <h5 className="mb-1">Formations</h5>
                        <strong className="h2 mb-0">8</strong>
                      </CCallout>
                <div className="float-right">img</div>
            </CCardBody>
        </CCard>
    </CCol>
    <CCol xs="2" sm="2" md="2" lg="2" xl="2">
        <CCard className="mb-5 shadow-sm border-0 small-card-as-button">
            <CCardBody>
            <CCallout color="danger d-inline-block mt-0">
                        <h5 className="mb-1">Services</h5>
                        <strong className="h2 mb-0">8</strong>
                      </CCallout>
                <div className="float-right">img</div>
            </CCardBody>
        </CCard>
    </CCol>
    <CCol xs="2" sm="2" md="2" lg="2" xl="2">
        <CCard className="mb-5 shadow-sm border-0 small-card-as-button">
            <CCardBody>
            <CCallout color="danger d-inline-block mt-0">
                        <h5 className="mb-1">Interventions</h5>
                        <strong className="h2 mb-0">50</strong>
                      </CCallout>
                <div className="float-right">img</div>
            </CCardBody>
        </CCard>
    </CCol>
    </CRow>
    </>
  );
};

export default ShowSuivi;
