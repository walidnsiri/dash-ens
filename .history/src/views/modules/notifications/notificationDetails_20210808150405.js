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
  CBadge
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

function NotificationDetails() {
    return (
        <>
        <CBadge color="success">success</CBadge>
        <hr
              style={{
                height: "1px",
                border: "none",
                color: "#333",
                backgroundColor: "#333",
                marginTop: "0%",
                marginBottom: "0%",
              }}
            />
            
        <div className="time text-muted">Today, 31 July 2021, 14:30</div>
        <div className="title text-truncate font-weight-bold">Titre Réunion</div>
        <div className="description">Signature</div>
        <div className="createdby">Crée par :<span>Walid Nsiri</span></div>
        </>
    )
}

export default NotificationDetails
