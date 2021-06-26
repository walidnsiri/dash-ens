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
import {userRoles} from '../../../enums/roles.enum';
import CustomUserCard from "../../components/custom/UserCard";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import {queryApi} from '../../../utils/queryApi';

function removeItem( arr, value){ 
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

const ShowUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  
  function handleInputChange(e) {
    setSearchInput(e.target.value);
  }
  const [date, setdate] = useState(null);

  function handleCheckbox(e) {
    if (!roles.includes(e.target.value)) {
      let new_roles = [...roles];
      new_roles.push(e.target.value);
      setRoles(new_roles);
    }else {
      let new_roles = [...roles];
      removeItem(new_roles,e.target.value);
      setRoles(new_roles);
    }
    
  }
  function handleSelect(changes) {
    //setRoles()
    console.log(changes);
  }


  useEffect(() => {
   /* const body = {
      "page" : {
          "number": ""+currentPage,
          "limit" : "6"
      },
      "query" : {
        "username": searchInput
      }
    }
    if (date !== null) {
      body["query"] = {...body["query"], "dates" : [date[0].getTime(), date[1].getTime()]}
    }
    if(searchInput.length !== 0) {
      body["query"] = {...body["query"], "username": searchInput}
    }
    if(roles.length !==0 ) {
      body["query"] = {...body["query"], "authorities": [roles]}
    }
    console.log(body);
    const fetchUsers = async(body) => {
     
      const [res, error] = await queryApi("user/search", body, "POST");
      if(res) {
        console.log(res.items);
        setUsers(res.items);
      }
      if(error) console.error(error);
    }
    fetchUsers();*/
    console.log(roles);
  }, [currentPage,searchInput,roles,date])

  return (
    <CRow>
      <CCol lg="3">
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            <CCardTitle
              className="mb-4"
              style={{ "fontWeight": "550", "fontSize": "0.9rem" }}
            >
              Filter
            </CCardTitle>
            <div className="mt-4 pt-4">
              <h5 className="font-size-14 mb-3">Roles</h5>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox1"
                  name="role"
                  value={userRoles.ENS_CHEF}
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
                  value={userRoles.ENS_UP}
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
                  value={userRoles.ENS}
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
                  value={userRoles.USER_ADMIN}
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
          
          <CButton className="addbutton"><i className="fa fa-plus"></i></CButton>
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
     {users?.map(c => 
              <CCol key = {c.id} sm="12" xl="4" xs="12" md="6" >
              <CustomUserCard key ={c.id} className="profile-card" user={c} />
              </CCol>
    )}
  
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
