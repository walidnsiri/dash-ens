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
      <CCol lg="3" md="12" sm="12" xs="12" xl="4" xxl="12">
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
      <CCol>
        <NotificationDetails />
      </CCol>
    </CRow>
  );
};

export default Notifications;