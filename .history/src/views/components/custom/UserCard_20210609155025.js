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
import avatar from "../../../assets/img/avatars/6.jpg";
const UserCard = () => {
  return (
    <>
      <div class="post-module">
        <div class="thumbnail">
          <div class="date">
            <div class="day">27</div>
            <div class="month">Mar</div>
          </div>
          <CImg src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg" alt="image alt"/>
        </div>
        <div class="post-content">
          <div class="category">Info</div>
          <h1 class="title">Firas Matoussi</h1>
          <h2 class="sub_title">Chef de département</h2>
          <p
            class="description"
            style={{height:"100px",display:"none",opacity:"1"}}
          >
          <div className="date">
            <Link to="/users/1">
              <span className="fa fa-info-circle"></span>
            </Link>
          </div>
            <Link to="/user/update/1">
              {" "}
              <span className="fa fa-pencil"></span>
            </Link>
            <Link to="#">
              {" "}
              <span className="fa fa-trash"></span>
            </Link>
          </div>
          </p>
          <div class="post-meta">
            <span class="timestamp">
              <i class="fa fa-clock-">o</i> 6 mins ago
            </span>
            <span class="comments">
              <i class="fa fa-comments"></i>
              <CLink to="#"> 39 comments</CLink>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
