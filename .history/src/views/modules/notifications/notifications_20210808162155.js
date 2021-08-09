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
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import NotificationDetails from "./notificationDetails";

const Notifications = () => {
  return (
    <CRow>
      <CCol lg="12" md="12" sm="12" xs="12" xl="4" xxl="4">
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
        <div className="scroll-notifs">
          <CCard>
            <CCardBody>
              <div className="message">
                <div className="pt-3 mr-3 float-left">
                  <div className="c-avatar">
                    <CImg
                      src={"avatars/6.jpg"}
                      className="c-avatar-img"
                      alt="admin@bootstrapmaster.com"
                    />
                    <span className="c-avatar-status bg-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">John Doe</small>
                  <small className="text-muted float-right mt-1">
                    Just now
                  </small>
                </div>
                <div className="text-truncate font-weight-bold">
                  <span className="fa fa-exclamation text-danger"></span>{" "}
                  Important message
                </div>
                <div className="small text-muted text-truncate">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt...
                </div>
              </div>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody>
              <div className="message">
                <div className="pt-3 mr-3 float-left">
                  <div className="c-avatar">
                    <CImg
                      src={"avatars/6.jpg"}
                      className="c-avatar-img"
                      alt="admin@bootstrapmaster.com"
                    />
                    <span className="c-avatar-status bg-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">John Doe</small>
                  <small className="text-muted float-right mt-1">
                    Just now
                  </small>
                </div>
                <div className="text-truncate font-weight-bold">
                  <span className="fa fa-exclamation text-danger"></span>{" "}
                  Important message
                </div>
                <div className="small text-muted text-truncate">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt...
                </div>
              </div>
            </CCardBody>
          </CCard>

          <CCard>
            <CCardBody>
              <div className="message">
                <div className="pt-3 mr-3 float-left">
                  <div className="c-avatar">
                    <CImg
                      src={"avatars/6.jpg"}
                      className="c-avatar-img"
                      alt="admin@bootstrapmaster.com"
                    />
                    <span className="c-avatar-status bg-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">John Doe</small>
                  <small className="text-muted float-right mt-1">
                    Just now
                  </small>
                </div>
                <div className="text-truncate font-weight-bold">
                  <span className="fa fa-exclamation text-danger"></span>{" "}
                  Important message
                </div>
                <div className="small text-muted text-truncate">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt...
                </div>
              </div>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody>
              <div className="message">
                <div className="pt-3 mr-3 float-left">
                  <div className="c-avatar">
                    <CImg
                      src={"avatars/6.jpg"}
                      className="c-avatar-img"
                      alt="admin@bootstrapmaster.com"
                    />
                    <span className="c-avatar-status bg-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">John Doe</small>
                  <small className="text-muted float-right mt-1">
                    Just now
                  </small>
                </div>
                <div className="text-truncate font-weight-bold">
                  <span className="fa fa-exclamation text-danger"></span>{" "}
                  Important message
                </div>
                <div className="small text-muted text-truncate">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt...
                </div>
              </div>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody>
              <div className="message">
                <div className="pt-3 mr-3 float-left">
                  <div className="c-avatar">
                    <CImg
                      src={"avatars/6.jpg"}
                      className="c-avatar-img"
                      alt="admin@bootstrapmaster.com"
                    />
                    <span className="c-avatar-status bg-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">John Doe</small>
                  <small className="text-muted float-right mt-1">
                    Just now
                  </small>
                </div>
                <div className="text-truncate font-weight-bold">
                  <span className="fa fa-exclamation text-danger"></span>{" "}
                  Important message
                </div>
                <div className="small text-muted text-truncate">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt...
                </div>
              </div>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody>
              <div className="message">
                <div className="pt-3 mr-3 float-left">
                  <div className="c-avatar">
                    <CImg
                      src={"avatars/6.jpg"}
                      className="c-avatar-img"
                      alt="admin@bootstrapmaster.com"
                    />
                    <span className="c-avatar-status bg-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">John Doe</small>
                  <small className="text-muted float-right mt-1">
                    Just now
                  </small>
                </div>
                <div className="text-truncate font-weight-bold">
                  <span className="fa fa-exclamation text-danger"></span>{" "}
                  Important message
                </div>
                <div className="small text-muted text-truncate">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt...
                </div>
              </div>
            </CCardBody>
          </CCard>
        </div>
      </CCol>
      <CCol xs="12" sm="12" md="12" lg="12" xl="8" xxl="8">
        <NotificationDetails />
      </CCol>
    </CRow>
  );
};

export default Notifications;
