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
          <h1 className="title">Meilleur Performance de la semaine</h1>
          <div className="performance-top">
            <figure className="performance-thumbnail">
              <div className="performance-card"></div>
            </figure>
            <div className="performance-side">
              <div className="performance-avatar">
                <div class="medal-container">
                  <div class="medal icon--star"></div>

                  <div class="star-cluster">
                    <div class="icon--twinkle star-a"></div>
                    <div class="icon--twinkle delay-twinkle star-b"></div>
                    <div class="icon--twinkle star-c"></div>

                    <div class="icon--twinkle  star-d"></div>
                    <div class="icon--twinkle delay-twinkle star-e"></div>
                  </div>
                </div>
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
                  width="40"
                  height="40"
                  src={avatar}
                  className=""
                  alt="admin@bootstrapmaster.com"
                />
                <figcaption className="single-enseignant-info">
                  <h4 className="info-name">Firas Matoussi</h4>
                  <h5 className="info-grade">Assistant Technologue</h5>
                  <div className="info-scores">
                    <span className="info-single-score">F 50</span>
                    <span className="info-single-score">S 12</span>
                    <span className="info-single-score">I 6</span>
                    <span className="info-single-score">R 18</span>
                    <span className="info-single-score">E 21</span>
                    <span className="info-single-score info-single-score-total">
                      T 115
                    </span>
                  </div>
                </figcaption>
              </figure>
              <figure className="single-enseignant">
                <CImg
                  width="40"
                  height="40"
                  src={avatar}
                  className=""
                  alt="admin@bootstrapmaster.com"
                />
                <figcaption className="single-enseignant-info">
                  <h4 className="info-name">Firas Matoussi</h4>
                  <h5 className="info-grade">Assistant Technologue</h5>
                  <div className="info-scores">
                    <span className="info-single-score">F 50</span>
                    <span className="info-single-score">S 12</span>
                    <span className="info-single-score">I 6</span>
                    <span className="info-single-score">R 18</span>
                    <span className="info-single-score">E 21</span>
                    <span className="info-single-score info-single-score-total">
                      T 115
                    </span>
                  </div>
                </figcaption>
              </figure>
              <figure className="single-enseignant">
                <CImg
                  width="40"
                  height="40"
                  src={avatar}
                  className=""
                  alt="admin@bootstrapmaster.com"
                />
                <figcaption className="single-enseignant-info">
                  <h4 className="info-name">Firas Matoussi</h4>
                  <h5 className="info-grade">Assistant Technologue</h5>
                  <div className="info-scores">
                    <span className="info-single-score">F 50</span>
                    <span className="info-single-score">S 12</span>
                    <span className="info-single-score">I 6</span>
                    <span className="info-single-score">R 18</span>
                    <span className="info-single-score">E 21</span>
                    <span className="info-single-score info-single-score-total">
                      T 115
                    </span>
                  </div>
                </figcaption>
              </figure>
              <figure className="single-enseignant">
                <CImg
                  width="40"
                  height="40"
                  src={avatar}
                  className=""
                  alt="admin@bootstrapmaster.com"
                />
                <figcaption className="single-enseignant-info">
                  <h4 className="info-name">Firas Matoussi</h4>
                  <h5 className="info-grade">Assistant Technologue</h5>
                  <div className="info-scores">
                    <span className="info-single-score">F 50</span>
                    <span className="info-single-score">S 12</span>
                    <span className="info-single-score">I 6</span>
                    <span className="info-single-score">R 18</span>
                    <span className="info-single-score">E 21</span>
                    <span className="info-single-score info-single-score-total">
                      T 115
                    </span>
                  </div>
                </figcaption>
              </figure>
            </div>
            <div className="performance-scores-bottom">
              <ul className="score_list completed">
              <li className="score-item">
                  <div></div>
                  <div className="score-caption">
                    <div className="score-title">Encadrements</div>
                    <div className="score-score">
                      <strong>15</strong>
                    </div>
                  </div>
                </li>
                <li className="score-item">
                  <div></div>
                  <div className="score-caption">
                    <div className="score-title">Interventions</div>
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
                    <div className="score-title">Formations</div>
                    <div className="score-score">
                      <strong>15</strong>
                    </div>
                  </div>
                </li>
                <li className="score-item">
                  <div></div>
                  <div className="score-caption">
                    <div className="score-title">Services</div>
                    <div className="score-score">
                      <strong>15</strong>
                    </div>
                  </div>
                </li>
               
                
               
                <li className="score-item score-item-total">
                  <div className="score-summary">
                    <span>150</span>
                  </div>
                  <div className="total-caption">
                    <div className="total-cat">
                        Total
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
