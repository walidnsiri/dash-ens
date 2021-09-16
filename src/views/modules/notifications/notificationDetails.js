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
  CAlert,
  CSwitch,
  CImg,
  CBadge
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import Moment from 'react-moment';
import moment from 'moment'
import { queryApi } from "../../../utils/queryApi";
import { useSelector, useDispatch } from 'react-redux';
import {removeReadNotification} from '../../../features/notificationsSlice';

function NotificationDetails(props) {
    moment.locale("fr");
    const [reunion,setReunion] = useState({})
    const {notification} = props;
    const dispatch = useDispatch();
  

    
    useEffect(()=> {
      const setRead = async () => {
        if(notification?.read == false){
          const body = {
            "type" : notification.type,
            "read" : true,
            "id_event": notification.id_event,
            "userId": notification.userId
        }
          const [res, error] = await queryApi("notification/", body, "PUT");
          dispatch(removeReadNotification(notification));
        }
      }

        const fetchRdi = async() => {
        if(notification?.type == "rdi"){
            const [res, error] = await queryApi("rdi/reunion/" + notification?.id_event);
            if(res){setReunion(res)}
        }
        }

        if(!notification?.deleted)
          { 
            setRead();
            fetchRdi();
          }
      },[notification])

    if(!notification?.deleted)
    { 
    return (
        <>
        <CBadge color="success" style={{marginBottom:"2%",marginTop:"2%"}}>{notification?.type === "rdi"? "Réunion RDI" : "Encadrement"}</CBadge>
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
            
        <div className="time text-muted">{moment(notification?.due_date).format('dddd')} de {reunion?.heure_deb}h à {reunion?.heure_fin}h</div>
        <div className="title text-truncate font-weight-bold">Titre: {reunion?.titre}</div>
        <CCard>
            <CCardBody>
            <div className="description"><h4>Description:</h4> {reunion?.description}</div>
        <div className="createdby"><h4>Crée par:</h4><span>{notification?.fullName}</span></div>
        <div className="Participants">
        <div className="pt-3 mr-3 float-right">
                  <div className="c-avatar">
                    <CImg
                      src={notification?.image? notification?.image: ""}
                      style={{borderRadius: "50%",width:"200px",marginTop:"-250px",marginRight:"80px"}}
                      alt="admin@bootstrapmaster.com"
                    />
                    
                  </div>
                </div>
        </div>
        <div className="createdAt text-muted">Crée {moment(notification?.createdAt).calendar()}</div>
        <div className="modifiedAt text-muted">Modifiée {moment(notification?.modifiedAt).calendar()}</div>
            </CCardBody>
        </CCard>
        
        </>
    )
    }
    else {
      return (
      <>
        <CBadge color="success" style={{marginBottom:"2%",marginTop:"2%"}}>{notification?.type === "rdi"? "Réunion RDI" : "Encadrement"}</CBadge>
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
            
        <div className="time text-muted">{moment(notification?.due_date).format('dddd')}</div>
       
        <CCard>
            <CCardBody>
         
        <div className="createdby"><h4>Crée par:</h4><span>{notification?.fullName}</span></div>
        <div className="Participants">
        <div className="pt-3 mr-3 float-right">
                  <div className="c-avatar">
                    <CImg
                      src={notification?.image? notification?.image: ""}
                      style={{borderRadius: "50%",width:"200px",marginTop:"-100px",marginRight:"80px"}}
                      alt="admin@bootstrapmaster.com"
                    />
                    
                  </div>
                </div>
        </div>
        <div className="createdAt text-muted">Crée {moment(notification?.createdAt).calendar()}</div>
        <div className="modifiedAt text-muted">Modifiée {moment(notification?.modifiedAt).calendar()}</div>
            </CCardBody>
        </CCard>
        
        </>
    )
    }
}

export default NotificationDetails
