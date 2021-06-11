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
              <h5 className="font-size-14 mb-3">Réf Production</h5>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox1"
                  name="refproduction"
                  value="Classement 1"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox1"
                >
                  Classement 1
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox2"
                  name="refproduction"
                  value="Classement 2"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox2"
                >
                  Classement 2
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox3"
                  name="refproduction"
                  value="Classement 3"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox3"
                >
                  Classement 3
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox4"
                  name="refproduction"
                  value="PI-DEV"
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox4"
                >
                 PI-DEV
                </CLabel>
              </CFormGroup>
            </div>
            <div className="mt-4 pt-4">
              <CLabel variant="checkbox" className="mt-1" htmlFor="range2">
                Date Production
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
          <h5 className="d-inline mr-2">Users </h5>
          <CButton className="addbutton"><CIcon name="cil-plus" color="white"/></CButton>
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

/*<CCard> 
            <CCardHeader>
              <CRow>
                <CCol>
                  <CButtonToolbar className="mt-3 mb-3">
                    <CInputGroup className="mr-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>Search</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput placeholder="par nom d'utilisateur" />
                    </CInputGroup>
                    <div className="c-vr mr-3"></div>
                    <CInputGroup>
                      <CInputGroupPrepend>
                        <CInputGroupText>Search</CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput placeholder="par email" />
                    </CInputGroup>
                  </CButtonToolbar>
                </CCol>
                </CRow>
                <CRow>
                  <CCol md="2" sm="2" className="mb-3 mt-3">
                  <CButton color="info" size="md" block>
                    Ajouter un utilisateur
                  </CButton>
                  </CCol>
                </CRow>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <div className="card-deck">
                  <CustomUserCard className="profile-card"></CustomUserCard>
                  <CustomUserCard className="profile-card"></CustomUserCard>
                  <CustomUserCard className="profile-card"></CustomUserCard>
                  <CustomUserCard className="profile-card"></CustomUserCard>
                </div>
              </CRow>
              <div className="d-md-down-none mt-5">
                <CPagination
                  align="center"
                  size="lg"
                  activePage={currentPage}
                  pages={10}
                  onActivePageChange={setCurrentPage}
                />
                <br></br>
              </div>
            </CCardBody>
          </CCard>*/
