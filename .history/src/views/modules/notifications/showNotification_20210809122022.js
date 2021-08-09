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
import Notifications from "./notifications";


function ShowNotification() {

  const [clicked, setclicked] = useState({});
  
  useEffect(() => {
    let oldclicked = clicked;
    oldclicked[1]=true;
    setclicked({...clicked,oldclicked})
      console.log(clicked)
      return () => {
          
      }
  }, [])

  return (
    <CRow className="h-100">
      <CCol lg="12" xl="4" xxl="4">
        <CCard className="border-0 shadow-sm d-flex">
          <CCardBody className="p-0 align-items-center justify-content-center">
            
            <div className="notification-card-botton" >
              <div className="message align-items-center justify-content-center">
                <div className="pt-3 mr-3 float-left">icon</div>
                <div className="text-truncate font-weight-bold">
                  Toutes les notifications
                </div>
                <div className="small text-muted text-truncate mt-2">
                  consulter toutes les notifiations reçues
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
            <div className="notification-card-botton">
              <div className="message">
                <div className="pt-3 mr-3 float-left">icon</div>
                <div className="text-truncate font-weight-bold">
                  Réunions Rdi
                </div>
                <div className="small text-muted text-truncate mt-2">
                  consulter toutes les notifiations RDI
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
            <div className="notification-card-botton" style={{backgroundColor:"#e74c3c"}}>
              <div className="message">
                <div className="pt-3 mr-3 float-left">icon</div>
                <div className="text-truncate font-weight-bold" style={{color:"white"}}>
                  Encadrement
                </div>
                <div className="small text-truncate mt-2" style={{color:"#ffff"}}>
                  consulter toutes les notifiations d'encadrement
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
            <div className="notification-card-botton">
              <div className="message">
                <div className="pt-3 mr-3 float-left">icon</div>
                <div className="text-truncate font-weight-bold">Supprimées</div>
                <div className="small text-muted text-truncate mt-2">
                  consulter toutes les notifiations supprimées
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
              <h5 className="d-inline mr-2">Notifications </h5>
            </div>
          </CCol>
          <CCol lg="6" sm="6" md="6" xs="6" className="mr-4 mt-2">
          <CDropdown style={{float:"right"}}>
  <CDropdownToggle href="#" style={{color:"white",backgroundColor:"#e74c3c"}}>
    < SortIcon/>
    Trier:  ↓↑
  </CDropdownToggle>
  <CDropdownMenu>
    <CDropdownItem href="#">↑ Ascendant</CDropdownItem>
    <CDropdownItem href="#">↓ Descendant</CDropdownItem>
  </CDropdownMenu>
</CDropdown>
          </CCol>
        </CRow>

        <CRow className="d-flex mt-3">
          <CCol lg="12" xs="12" md="12" sm="12" xl="12" xxl="12">
            <CCard>
                <CCardBody>
                <Notifications notifications=""/>
                </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  );
}

export default ShowNotification;
