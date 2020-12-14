import React, {useState, useEffect} from "react";
import {
  CCol,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInput,
  CButton,
  CPagination
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import CustomUserCard from "../../components/custom/customUserCard";
import Filters from "../../components/custom/FIlters";
//import CIcon from '@coreui/icons-react'
import UserSearch from "./UserSearch";
import UserFilters from "./Userfilters";


const ShowUsers = () => {
  const [currentPage, setCurrentPage] = useState(5);
  const [filterData, setFilterData] = useState({ types: [], rols: [], searchInput : "" });

  function handlefiltercallback  (data) {
    if (data.searchInput) setFilterData({...filterData, searchInput : data.searchInput});
    else setFilterData({...filterData, types : data.types, rols : data.rols});
  }
  useEffect(() => {
    console.log(filterData);
  }, [filterData])

  return (
    <>
      <Filters Filters={UserFilters} Search={UserSearch} filtercallback={handlefiltercallback}>
          <CRow className="d-flex justify-content-center">
            <div className="card-deck">
              
              <CustomUserCard className="profile-card"></CustomUserCard>
              <CustomUserCard className="profile-card"></CustomUserCard>
              <CustomUserCard className="profile-card"></CustomUserCard>
              <CustomUserCard className="profile-card"></CustomUserCard>
              <CustomUserCard className="profile-card"></CustomUserCard>
              <CustomUserCard className="profile-card"></CustomUserCard>

            </div>
          </CRow>
          <CRow className="justify-content-center mt-4">
          <CPagination
            align="center"
            addListClass="some-class"
            activePage={currentPage}
            pages={10}
            onActivePageChange={setCurrentPage}
          />
          <br></br>
          </CRow>
          </Filters>
          
    </>
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
