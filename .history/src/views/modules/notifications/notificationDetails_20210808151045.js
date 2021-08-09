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
        <CBadge color="success" style={{marginBottom:"2%",marginTop:"2%"}}>success</CBadge>
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
        <div className="Participants">
            <h5>Participants:</h5>
            <ul>
                <li>Dhia khmiri</li>
                <li>Rayen touati</li>
                <li>Aziz daboussi</li>
            </ul>
        </div>
        <div className="createdAt text-muted">Crée le : 31 July 2021, 14:30</div>
        <div className="modifiedAt text-muted">Modifiée le: 31 July 2021, 14:30</div>
        </>
    )
}

export default NotificationDetails
