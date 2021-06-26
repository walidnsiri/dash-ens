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
import CustomUserCard from "../../components/custom/UserCard";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

const ShowUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
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
              <h5 className="font-size-14 mb-3">Roles</h5>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox1"
                  name="role"
                  value="Enseignant"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox1"
                >
                   Chef de département
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox2"
                  name="role"
                  value="Papier scientifique"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox2"
                >
                  Enseignant CUP
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox3"
                  name="role<"
                  value="These de recherche"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox3"
                >
                 Enseignant
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox4"
                  name="role<"
                  value="Developpement projet innovant"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox4"
                >
                  Admin
                </CLabel>
              </CFormGroup>
            </div>

            <div className="mt-4 pt-4">
              <CLabel variant="checkbox" className="mt-1" htmlFor="range2">
                Date de Création
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
        <CCol className="mt-2">
        <div>
          <h5 className="d-inline mr-2">Users </h5>
          
          <CButton className="addbutton"><i class="fa fa-plus"></i></CButton>
          </div>
        </CCol>
        <CCol lg="6" sm="6" md="6" xs="6" className="mr-4 mt-2">
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
              <CustomUserCard className="profile-card"></CustomUserCard>
              </CCol>
              <CCol sm="12" xl="4" xs="12" md="6" >
                <CustomUserCard className="profile-card"></CustomUserCard>
                </CCol>
                <CCol sm="12" xl="4" xs="12" md="6" >
                <CustomUserCard className="profile-card"></CustomUserCard>
                </CCol>
                <CCol sm="12" xl="4" xs="12" md="6" >
                <CustomUserCard className="profile-card"></CustomUserCard>
                </CCol>
                <CCol sm="12" xl="4" xs="12" md="6" >
                <CustomUserCard className="profile-card"></CustomUserCard>
                </CCol>
                <CCol sm="12" xl="4" xs="12" md="6" >
                <CustomUserCard className="profile-card"></CustomUserCard>
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

export default ShowUsers;
