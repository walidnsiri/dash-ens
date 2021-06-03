import React, {useState, useEffect} from "react";
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
  CPagination
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import CustomCard from "../../../components/custom/CustomCard";

const ShowProduction = () => {
  const [currentPage, setCurrentPage] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  function handleInputChange(e) {
    setSearchInput(e.target.value);
  }
  const [date, setdate] = useState([new Date(), new Date()]);

  function handleCheckbox(e) {}
  function handleSelect(changes) {
    console.log(changes);
    
  }

  return (
    <CRow>
      <CCol lg="3">
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            <CCardTitle
              className="mb-4"
              style={{ "font-weight": "550", "font-size": "0.9rem" }}
            >
              Filter
            </CCardTitle>
            <div className="mt-4 pt-4">
              <h5 className="font-size-14 mb-3">Title</h5>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox1"
                  name="title"
                  value="Equipe RDI"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox1"
                >
                  Equipe RDI
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox2"
                  name="title"
                  value="Partenaire"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox2"
                >
                  Partenaire
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox3"
                  name="title"
                  value="DRDI"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox3"
                >
                  DRDI
                </CLabel>
              </CFormGroup>
            </div>

            <div className="mt-4 pt-4">
              <h5 className="font-size-14 mb-3">Description</h5>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox1"
                  name="description"
                  value="Lancement Projet"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox1"
                >
                  Lancement Projet
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox2"
                  name="title"
                  value="Signature"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox2"
                >
                  Signature
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox3"
                  name="title"
                  value="Suivie"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox3"
                >
                  Suivie
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox4"
                  name="title"
                  value="Autre"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox4"
                >
                  Autre
                </CLabel>
              </CFormGroup>
            </div>
            <div className="mt-4 pt-4">
              <h5 className="font-size-14 mb-3">Date</h5>
              <CLabel variant="checkbox" className="mt-1" htmlFor="range1">
                Heure début
              </CLabel>
              <input type="range" className="form-range" id="range1" />
              <CLabel variant="checkbox" className="mt-1" htmlFor="range2">
                Heure fin
              </CLabel>
              <input type="range" className="form-range" id="range2" />
              <CLabel variant="checkbox" className="mt-1" htmlFor="range2">
                Date réunion
              </CLabel>
              <div>
             <DateRangePicker
             className="datepicker border-0"
             onChange={setdate}
             value={date}
             />
             </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      
      <CCol xs="12" sm="12" md="12" lg="9" className="mt-2 mb-4">
      <CRow>
        <CCol className="mt-3">
          <h5>Réunions</h5>
        </CCol>
        <CCol lg="6" sm="6" md="6" xs="6" className="mr-4">
          <CInputGroup >
            <CInputGroupPrepend>
              <CButton type="button" color="primary" className="shadow-lg search-button" style={{zIndex:1}}>
                <CIcon name="cil-magnifying-glass" />
              </CButton>
            </CInputGroupPrepend>
            <CInput
              id="input1-group2"
              name="input1-group2"
              placeholder="Rechercher..."
              value={searchInput}
              onChange={handleInputChange}
              className="shadow-sm bg-white rounded border-0 search-bar"
              style={{zIndex:0}}
            />
          </CInputGroup>
        </CCol>
      </CRow>
      
      <CRow className="d-flex justify-content-center">
              <CCol sm="12" xl="4" xs="12" md="6" >
              <CustomCard className="profile-card"></CustomCard>
              </CCol>
              <CCol sm="12" xl="4" xs="12" md="6" >
              <CustomCard className="profile-card"></CustomCard>
              </CCol> 
              <CCol sm="12" xl="4" xs="12" md="6" >
              <CustomCard className="profile-card"></CustomCard>
              </CCol>
              <CCol sm="12" xl="4" xs="12" md="6" >
              <CustomCard className="profile-card"></CustomCard>
              </CCol>
              <CCol sm="12" xl="4" xs="12" md="6">
              <CustomCard className="profile-card"></CustomCard>
              </CCol>
              <CCol sm="12" xl="4" xs="12" md="6">
              <CustomCard className="profile-card"></CustomCard>
              </CCol>
       </CRow>
       <CRow>
         <CCol className="mr-4">
          <CPagination
            className="mt-4"
            align="end"
            activePage={currentPage}
            pages={10}
            onActivePageChange={setCurrentPage}
          />
         </CCol>
       </CRow>
       </CCol>
    </CRow>
    
  );
};

export default ShowProduction;
