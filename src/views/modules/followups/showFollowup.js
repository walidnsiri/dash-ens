import React, { useState, useEffect } from "react";
import SortIcon from '@material-ui/icons/Sort';
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
  CAlert,
  CSwitch,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownItem
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Followups from "./followups";


import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import UpdateIcon from '@material-ui/icons/Update';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

function ShowFollowup() {

  const [clicked, setclicked] = useState({});
  const [sort,setSort] = useState("descending")
  
  useEffect(() => {
    setclicked({1:true,2:false,3:false,4:false});
  }, [])
  

  const handleClick = (number) => {
    let newclicked = JSON.parse(JSON.stringify({...clicked}));
    if(newclicked[number]){return;}
    else{
    newclicked[1]=false;
    newclicked[2]=false;
    newclicked[3]=false;
    newclicked[4]=false;
    
    newclicked[number]= !clicked[number];
    setclicked(newclicked);
    }
  }

  const handleSort = (sort) => {
    setSort(sort);
  }

  return (
    <CRow className="h-100">
      <CCol lg="12" xl="4" xxl="4">
        <CCard className="border-0 shadow-sm d-flex">
          <CCardBody className="p-0 align-items-center justify-content-center">
            
            <div className="notification-card-botton" onClick={() => handleClick(1)}  style={{backgroundColor:clicked[1]?"#e74c3c":""}}>
              <div className="message align-items-center justify-content-center">
                <div className="pt-3 mr-3 float-left"><NotificationsActiveIcon  style={{color:clicked[1]?"white":""}} /></div>
                <div className="text-truncate font-weight-bold" style={{color:clicked[1]?"white":""}}>
                  Toutes les notifications de suivi
                </div>
                <div className="small  text-truncate mt-2" style={{color:clicked[1]?"white":""}}>
                  Consulter toutes les notifiations de suivi actives
                </div>
              </div>
            </div>
            <hr
              style={{
                height: "1px",
                border: "none",
                color: "#333",
                backgroundColor: "#333",
                marginTop: "0%",
                marginBottom: "0%",
              }}
            />
            <div className="notification-card-botton" onClick={()=>handleClick(2)} style={{backgroundColor:clicked[2]?"#e74c3c":""}}>
              <div className="message">
                <div className="pt-3 mr-3 float-left"><MeetingRoomIcon style={{color:clicked[2]?"white":""}}/></div>
                <div className="text-truncate font-weight-bold" style={{color:clicked[2]?"white":""}}>
                  Réunions Rdi
                </div>
                <div className="small text-truncate mt-2" style={{color:clicked[2]?"white":""}}>
                  Consulter toutes les notifiations de suivi RDI 
                </div>
              </div>
            </div>
            <hr
              style={{
                height: "1px",
                border: "none",
                color: "#333",
                backgroundColor: "#333",
                marginTop: "0%",
                marginBottom: "0%",
              }}
            />
            <div className="notification-card-botton" onClick={() =>handleClick(3)} style={{backgroundColor:clicked[3]?"#e74c3c":""}}>
              <div className="message">
                <div className="pt-3 mr-3 float-left"><SupervisorAccountIcon style={{color:clicked[3]?"white":""}}/></div>
                <div className="text-truncate font-weight-bold" style={{color:clicked[3]?"white":""}}>
                  Encadrement
                </div>
                <div className="small text-truncate mt-2" style={{color:clicked[3]?"white":""}}>
                  Consulter toutes les notifiations de suivi d'encadrement
                </div>
              </div>
            </div>
            <hr
              style={{
                height: "1px",
                border: "none",
                color: "#333",
                backgroundColor: "#333",
                marginTop: "0%",
                marginBottom: "0%",
              }}
            />
            <div className="notification-card-botton" onClick={()=>handleClick(4)} style={{backgroundColor:clicked[4]?"#e74c3c":""}}>
              <div className="message">
                <div className="pt-3 mr-3 float-left"><UpdateIcon style={{color:clicked[4]?"white":""}}/></div>
                <div className="text-truncate font-weight-bold" style={{color:clicked[4]?"white":""}}>A venir</div>
                <div className="small text-truncate mt-2" style={{color:clicked[4]?"white":""}}>
                    Consulter toutes les notifiations de suivi à venir
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" sm="12" md="12" lg="12" xl="8" xxl="8" className="mt-2 mb-4">
        <CRow>
          <CCol className="mt-2">
            <div>
              <h5 className="d-inline mr-2">Notification de Suivi</h5>
            </div>
          </CCol>
          <CCol lg="6" sm="6" md="6" xs="6" className="mr-4 mt-2">
          <CDropdown style={{float:"right"}}>
  <CDropdownToggle href="#" style={{color:"white",backgroundColor:"#e74c3c"}}>
    < SortIcon/>
    Trier:  ↓↑
  </CDropdownToggle>
  <CDropdownMenu>
    <CDropdownItem href="#" onClick={e => handleSort("ascending")} >↑ Ascendant</CDropdownItem>
    <CDropdownItem href="#" onClick={e => handleSort("descending")} >↓ Descendant</CDropdownItem>
  </CDropdownMenu>
</CDropdown>
          </CCol>
        </CRow>

        <CRow className="d-flex mt-3">
          <CCol lg="12" xs="12" md="12" sm="12" xl="12" xxl="12">
            <CCard>
                <CCardBody>
                <Followups sort={sort} clicked={clicked}/>
                </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  );
}

export default ShowFollowup;
