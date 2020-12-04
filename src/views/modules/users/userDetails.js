import React from "react";
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CCardImg,
  CButton,
  CRow,
} from "@coreui/react";


import hoss from "../../../assets/img/hoss.jpg";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";

const UserDetails = () => {
  //const [collapsed, setCollapsed] = React.useState(true)
  //const [showCard, setShowCard] = React.useState(true)

  return (
    <>
      <div className="container detail-user ">
        <div className="detail-user-inner d-flex align-items-center">
          <CRow>
            <CCol xl="6">
              <div className="user-details-img">
              <img src={hoss} alt="" className="d-block w-100"></img>
              </div>
            </CCol>
            <CCol xl="6">
              <div className="mt-4 mt-xl-3">
                <Link className="text-danger pull-right" to="/user/update/1">
                  Modifier l'utilisateur
                </Link>
                <h5 className="text-info">Information Basique</h5>
                <h3 className="mt-4 mb-1 bigh3">Houssem Zoghlami</h3>
                <h5 className="mb-4 belowtitle">Software Engineer</h5>
                <div className="vl ml-4">
                 <div className="mt-5 ml-3">
                  <h5 className="mb-4">
                    <i className="fa fa-user-o mr-4 text-primary" aria-hidden="true"></i>
                    <em>HoussemZ</em>
                  </h5>
                  <h5 className="mb-4">
                    <i className="fa fa-envelope-o mr-4 text-primary" aria-hidden="true"></i>
                    <em>Houssem@esprit.tn</em>
                  </h5>
                  <h5 className="mb-4">
                    <i className="fa fa-calendar-plus-o mr-4 text-primary" aria-hidden="true"></i>
                    <em>vendredi, 7 aout 2020 à 12:00</em>
                  </h5>

                  <h5 className="mb-4">
                    <i className="fa fa-list mr-4 text-primary" aria-hidden="true"></i>
                    <em>admin</em>
                  </h5>
                 </div>
                 </div>
              </div>
            </CCol>
          </CRow>
        </div>
      </div>
    </>
  );
};

export default UserDetails;

/*  <CCard className="border-white detail-user-card mx-2">
      <CCardBody>
        <CRow>
          <CCol xl="6">
          <img src={hoss} alt="" className=""></img>
          </CCol>
          <CCol xl="6">
            <div className="mt-4 mt-xl-3">
                <Link className="text-primary pull-right" to="#">
                  Modifier l'utilisateur
                </Link>
                <p>Information</p>
                <h3 className="mt-1 mb-3 bigh3">
                  Houssem Zoghlami
                </h3>
                <CRow className="mb-3">
                  <CCol md="6">
                    <h5 className="mb-4">
                      Username : <em>HoussemZ</em>
                    </h5>
                    <h5 className="mb-4">
                      Email : <em>Houssem@esprit.tn</em>
                    </h5>
                  </CCol>
                  <CCol md="6">
                  <h5 className="mb-4">
                      Ajouté le : <em>vendredi, 7 aout 2020 à 12:00</em>
                    </h5>
                    <h5 className="mb-4">
                      Roles : <em>admin</em>
                    </h5>
                  </CCol>
                </CRow>

            </div>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>*/

/*    
    <div className="container detail-user ">
    <div className="detail-user-inner d-flex align-items-center">
    <CRow>
          <CCol xl="6">
          <img src={hoss} alt="" className=""></img>
          </CCol>
          <CCol xl="6">
            <div className="mt-4 mt-xl-3">
                <Link className="text-primary pull-right" to="#">
                  Modifier l'utilisateur
                </Link>
                <h4 className="mt-1 mb-3">
                  Houssem Zoghlami
                </h4>
                <h5 className="mb-4">
                  Software Engineer
                </h5>
                <CRow className="mb-3">
                  <CCol md="6">
                    <h5 className="mb-4">
                      Username : <em>HoussemZ</em>
                    </h5>
                    <h5 className="mb-4">
                      Email : <em>Houssem@esprit.tn</em>
                    </h5>
                  </CCol>
                  <CCol md="6">
                  <h5 className="mb-4">
                      Ajouté le : <em>vendredi, 7 aout 2020 à 12:00</em>
                    </h5>
                    <h5 className="mb-4">
                      Roles : <em>admin</em>
                    </h5>
                  </CCol>
                </CRow>

            </div>
          </CCol>
        </CRow>
     
   </div>
    </div>

    */
