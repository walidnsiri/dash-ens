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
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CImg } from "@coreui/react";
import { Link } from "react-router-dom";
import {noimg} from "../../../assets/img/noimage.png";
const UserCard = () => {
  return (
    <>
      <div class="post-module">
        <div class="thumbnail">
          <div class="role">
            <div class="title">admin</div>
          </div>
          <CImg src={noimg} alt="userimg"/>
        </div>
        <div class="post-content">
          <div class="category">Info</div>
          <h1 class="title">Firas Matoussi</h1>
          <h2 class="sub_title">Chef de département</h2>
          <p
            class="description"
            style={{height:"100px",display:"none",opacity:"1"}}
          >
        
        <div className="crud-buttoms">          
          <div className="item">
            <Link to="/users/1">
              <span className="fa fa-trash fa-2x"></span>
            </Link>
          </div>
          <div className="item">
            <Link to="/users/1">
              <span className="fa fa-pencil fa-2x"></span>
            </Link>
          </div>
          </div>
          </p>
          <div class="post-meta">
            <span class="timestamp">
              <i class="fa fa-clock-o"> Crée depuis</i> 6 mins
            </span>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
