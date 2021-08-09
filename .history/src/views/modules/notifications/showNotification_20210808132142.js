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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

function showNotification() {
  return (
    <CRow className="h-100">
      <CCol lg="3">
        <CCard className="border-0 shadow-sm">
          <CCardBody>
              <div className="card-botton p-5">
                <div className="message">
                <div className="pt-3 mr-3 float-left">
                icon
                </div>
                <div>
              <small className="text-muted">Joe Doe</small>
              <small className="text-muted float-right mt-1">4:03 AM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <div className="small text-muted text-truncate">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt...
            </div>
                </div>
                          
                <div>Tous les Notifications</div>
                  </div>
              <div className="card-botton p-5">Réunions Rdi</div>
              <div className="card-botton p-5">Encadrement</div>
              <div className="card-botton p-5">supprimés</div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" sm="12" md="12" lg="9" className="mt-2 mb-4">
        <CRow>
          <CCol className="mt-2">
            <div>
              <h5 className="d-inline mr-2">Notifications </h5>
            </div>
          </CCol>
          <CCol lg="6" sm="6" md="6" xs="6" className="mr-4 mt-2">
            <CInputGroup>
              <CInputGroupPrepend>
                <CButton
                  type="button"
                  color="primary"
                  className="shadow-lg search-button"
                  style={{ zIndex: 1 }}
                >
                  <CIcon name="cil-magnifying-glass" />
                </CButton>
              </CInputGroupPrepend>
              <CInput
                id="input1-group2"
                name="input1-group2"
                placeholder="Rechercher..."
                //value={searchInput}
                //onChange={handleInputChange}
                className="shadow-sm bg-white rounded border-0 search-bar"
                style={{ zIndex: 0 }}
              />
            </CInputGroup>
          </CCol>
        </CRow>

        <CRow className="d-flex mt-3">
            <CCol lg="12" xs="12" md="12" sm="12">
                <CCard>

                </CCard>
            </CCol>
        </CRow>
      </CCol>
    </CRow>
  );
}

export default showNotification;
