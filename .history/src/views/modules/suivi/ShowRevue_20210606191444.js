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
const ShowRevue = () => {
  return (
    <div className="performance-section">
      <div className="performance-container">
        <div className="performance-wrapper">
          <h1 className="title">
            Meilleur Performance de la semaine
          </h1>
          <div className="performance-top">
            <figure className="performance-thumbnail">
              <div className="performance-card"></div>
            </figure>
            <div className="performance-side">
              <div className="performance-avatar">
                <CImg
                  src={avatar}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
              </div>
              <h3 className="performance-title">Firas Matoussi</h3>
              <h4 className="performance-subtitle">Assistant Technologue</h4>
            </div>
            <div className="performance-desc mobile">
              <p>
                <em>Mension Honorable</em>
              </p>
            </div>
          </div>
          <div className="performance-scores">
            <div className="performance-scores-top">
              <div className="performance-desc">
                <p>
                  <em>Mension Honorable</em>
                </p>
              </div>
            </div>
            <div className="performance-enseignant">
              <figure className="single-enseignant">
                <CImg
                  src={avatar}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
              </figure>
              <figure className="single-enseignant">
                <CImg
                  src={avatar}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
              </figure>
              <figure className="single-enseignant">
                <CImg
                  src={avatar}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
              </figure>
              <figure className="single-enseignant">
                <CImg
                  src={avatar}
                  className="c-avatar-img"
                  alt="admin@bootstrapmaster.com"
                />
              </figure>
            </div>
            <div className="performance-scores-bottom">
              <ul className="score_list completed">
                <li className="score-item">
                  <div></div>
                  <div className="score-caption">
                    <div className="score-title">Rdi</div>
                    <div className="score-score">
                      <strong>15</strong>
                    </div>
                  </div>
                </li>
                <li className="score-item">
                  <div></div>
                  <div className="score-caption">
                    <div className="score-title">Rdi</div>
                    <div className="score-score">
                      <strong>15</strong>
                    </div>
                  </div>
                </li>
                <li className="score-item">
                  <div></div>
                  <div className="score-caption">
                    <div className="score-title">Rdi</div>
                    <div className="score-score">
                      <strong>15</strong>
                    </div>
                  </div>
                </li>
                <li className="score-item">
                  <div></div>
                  <div className="score-caption">
                    <div className="score-title">Rdi</div>
                    <div className="score-score">
                      <strong>15</strong>
                    </div>
                  </div>
                </li>
                <li className="score-item">
                  <div></div>
                  <div className="score-caption">
                    <div className="score-title">Rdi</div>
                    <div className="score-score">
                      <strong>15</strong>
                    </div>
                  </div>
                </li>
                <li className="score-item">
                  <div></div>
                  <div className="score-caption">
                    <div className="score-title">Rdi</div>
                    <div className="score-score">
                      <strong>15</strong>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowRevue;
