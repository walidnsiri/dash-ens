import React, { useState, useEffect,useContext } from "react";
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
  CImg,
  CBadge,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import NotificationDetails from "./notificationDetails";
import { UserContext } from "../../../utils/UserContext";
import { queryApi } from "../../../utils/queryApi";

const Notifications = () => {

  const [user,] = useContext(UserContext)
  const [notifications,setNotifications] = useState(null);
  const [error,setError] = useState(null);
  const [pageNumber,setPageNumber] = useState(1);
  const [totalPages,setTotalPages] = useState(1);

  useEffect(()=> {
    const fetchNotifications = async () => {
      
      const body = {
        pageRequest: {
          number: pageNumber,
          limit: 6,
        },
        query: {
          "user_id" : user.id
        },
      };
      const [res, error] = await queryApi("notification/search", body, "POST");
      if (res) {
        let notifs = notifications;
        if(notifs == null) {setNotifications(res.notifications)}
        else {
          notifs.push(res.notifications);
          setNotifications(notifs);
        }
        setTotalPages(res.totalPages)
        setError(null);
      }
      if (error) {
        setError(error);
        setNotifications([]);
        setTotalPages(1);
      }
    };
    fetchNotifications();
  },[pageNumber]);

  const handleScroll = (e) => {
    const target = e.target;
    if(target.scrollHeight - target.scrollTop === target.clientHeight){
      if(pageNumber < totalPages){
        setPageNumber(pageNumber +1);
        console.log("bottom")
      }
      
    }
  }
  useEffect(()=>{console.log(notifications);console.log(totalPages);console.log(pageNumber)},[notifications,totalPages])
  return (
    <CRow>
      <CCol lg="12" md="12" sm="12" xs="12" xl="4" xxl="4">
        <CInputGroup className="input-group-notification">
          <CInputGroupPrepend>
            <CButton
              type="button"
              
              color="primary"
              className="shadow-lg search-button-notification"
              style={{ zIndex: 1,backgroundColor:"rgb(231, 76, 60)",borderColor:"rgb(231, 76, 60)" }}
              
            >
              <CIcon name="cil-magnifying-glass" />
            </CButton>
          </CInputGroupPrepend>
          <CInput
            id="input1-group2"
            name="input1-group2"
            placeholder="Rechercher par enseignant.."
            //value={searchInput}
            //onChange={handleInputChange}
            className="shadow-sm bg-white rounded border-0 search-bar-notification"
            style={{ zIndex: 0 }}
          />
        </CInputGroup>
        <div className="scroll-notifs" id="notif-scroll" onScroll={e => handleScroll(e)}>
        {notifications?.length >0 && notifications.map((notification) => (
          <CCard key={notification.id_event * Math.random(10)} style={{borderColor:"none"}}>
            <CCardBody>
              <div className="message">
                <div className="pt-3 mr-3 float-left">
                  <div className="c-avatar">
                    <CImg
                      src={"avatars/6.jpg"}
                      className="c-avatar-img"
                      alt="admin@bootstrapmaster.com"
                    />
                    <span className="c-avatar-status bg-success"></span>
                  </div>
                </div>
                <div>
                  <small className="text-muted">John Doe</small>
                  <small className="text-muted float-right mt-1">
                    Just now
                  </small>
                </div>
                <div className="text-truncate font-weight-bold">
                  <span className="fa fa-exclamation text-danger"></span>{" "}
                  Notification {notification.type}
                </div>
                <div className="small text-muted text-truncate">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt...
                </div>
              </div>
            </CCardBody>
          </CCard>
        ))}
        </div>
      </CCol>
      <CCol xs="12" sm="12" md="12" lg="12" xl="8" xxl="8">
        <NotificationDetails />
      </CCol>
    </CRow>
  );
};

export default Notifications;
