import React, { useState, useEffect, useContext } from "react";
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
import useravatar from "../../../assets/img/avatars/user.png";
import CIcon from "@coreui/icons-react";
import NotificationDetails from "./notificationDetails";
import { UserContext } from "../../../utils/UserContext";
import { queryApi } from "../../../utils/queryApi";
import Moment from 'react-moment';
import moment from 'moment'

import { LoaderSmall } from "../../../views/components/custom/Loaders";
import { trackPromise} from 'react-promise-tracker';

import { fetchImageFromService } from "../../../utils/getImage";


const Notifications = (props) => {
  const { sort,clicked } = props;
  moment.locale("fr");
  const [user,] = useContext(UserContext)
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notification, setNotification] = useState({});
  const [loading, setLoading] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filtered, setFiltered] = useState(false);
  const [borderColor,setBorderColor] = useState(new Map());

  const handleBorderColor = (read) => {
      if(read) return "none";
      return "red";
  }


  const getClickedType = () => {
    if(clicked[1]) return "";
    if(clicked[2]) return "rdi";
    if(clicked[3]) return "encadrement";
  }
  const getClickedDeleted = () => {
    if(clicked[4]) return true;
    return false;
  }

  const fetchimg = async (im) => {
    const img = await fetchImageFromService(im);
    if (img) return img;
  };
  const fetchUser = async (id, index, notifs) => {
    const [res, error] = await queryApi("user/" + id);
    if (res) {
      const img = await fetchimg(res.image);
      notifs[index] = { ...notifs[index], "fullName": res.fullName, "image": img };
      return notifs;
    }
  }

  useEffect(() => { setPageNumber(1);setNotifications([]) }, [sort,clicked])

  useEffect(() => {
    const fetchNotifications = async () => {

      const body = {
        pageRequest: {
          number: pageNumber,
          limit: 6,
          sort: sort
        },
        query: {
          "user_id": user.id,
          "type": getClickedType(),
          "deleted" : getClickedDeleted(),
          //"id_ens_creator" : "60cca063b036b51e8d33013a"
        },
      };

      const [res, error] = await queryApi("notification/search", body, "POST");
      if (res) {
        if (pageNumber === 1) {
          let notifs = res.notifications;
          await Promise.all(notifs.map(async(notif, index) => {
            notifs = await fetchUser(notif.id_ens_modifier, index, notifs);
          }));
          setNotification({...notifs[0]});
          if(notifs.length > 0){
          notifs[0] = {...notifs[0],read:true};
          setNotifications(notifs);
          }
          setTotalPages(res.totalPages)
          setError(null);
          if(notifs.length == 0 ) setNotification({});
        }
        else {
          let notifs = res.notifications;
          await Promise.all(notifs.map(async(notif, index) => {
            notifs = await fetchUser(notif.id_ens_modifier, index, notifs);
          }));
          setNotifications([...notifications, ...notifs])
          setTotalPages(res.totalPages)
          setError(null);
        }
      }
      if (error) {
        setError(error);
        setNotifications([]);
        setTotalPages(1);
      }
    };
    trackPromise(fetchNotifications());
  }, [pageNumber,sort,clicked]);


  const handleInputChange = (e) => {
    if (e.target.value == "") {
      setFiltered(false)
    } else {
      setFiltered(true)
    }
    setSearchInput(e.target.value)
  }



  const handleScroll = (e) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      if (pageNumber < totalPages) {
        setPageNumber(pageNumber + 1);
      }

    }
  }

  const handleNotificationClick = (index) => {
    setNotification({...notifications[index]});
    let notifs = notifications;
    notifs[index] = {...notifs[index],read:true};
    setNotifications([...notifs]);
  }



  return (
    <CRow>
      <CCol lg="12" md="12" sm="12" xs="12" xl={notifications?.length>0 ? "4" : "12"} xxl={notifications?.length>0 ? "4" : "12"}>
        <CInputGroup className="input-group-notification">
          <CInputGroupPrepend>
            <CButton
              type="button"

              color="primary"
              className="shadow-lg search-button-notification"
              style={{ zIndex: 1, backgroundColor: "rgb(231, 76, 60)", borderColor: "rgb(231, 76, 60)" }}

            >
              <CIcon name="cil-magnifying-glass" />
            </CButton>
          </CInputGroupPrepend>
          <CInput
            id="input1-group2"
            name="input1-group2"
            placeholder="Rechercher par enseignant.."
            value={searchInput}
            onChange={e => handleInputChange(e)}
            className="shadow-sm bg-white rounded border-0 search-bar-notification"
            style={{ zIndex: 0 }}
            disabled= {notifications?.length > 0? false : true}
          />
        </CInputGroup>
        <div className="scroll-notifs" id="notif-scroll" onScroll={e => handleScroll(e)}>
          {notifications?.map((notificatio, index) => (
            <CCard
              key={index}
              style={{ borderColor: handleBorderColor(notificatio.read), backgroundColor: notificatio.id_event=== notification.id_event? "#ECECEC" : "transparent"}}
              onClick={(e) => { handleNotificationClick(index) }}
            >
              <CCardBody>
                <div className="message">
                  <div className="pt-3 mr-3 float-left">
                    <div className="c-avatar">
                      <CImg
                        src={notificatio?.image ? notificatio?.image : useravatar}
                        className="c-avatar-img"
                        alt="admin@bootstrapmaster.com"
                      />
                    </div>
                  </div>
                  <div>
                    <small className="text-muted">{notificatio?.fullName}</small>
                    <small className="text-muted float-right mt-1">

                      <Moment fromNow locale="fr">{notificatio?.createdAt}</Moment>
                    </small>
                  </div>
                  <div className="text-truncate font-weight-bold">
                    <span className="fa fa-exclamation text-danger"></span>
                    Notification {notificatio?.type}
                  </div>
                  <div className="small text-muted text-truncate">
                    {moment(notificatio?.due_date).format('L')}
                  </div>
                </div>
              </CCardBody>
            </CCard>
            
          ))}
          <LoaderSmall/>
        </div>
      </CCol>
      {notifications?.length > 0 ?
      <CCol xs="12" sm="12" md="12" lg="12" xl="8" xxl="8">
        <NotificationDetails notification={notification}/>
      </CCol>:
      <CCol sm="12" xl="12" xs="12" md="12" style={{ paddingTop: "4%" }}>
      <CAlert color="warning" className="h-100">
        Pas de notification trouvés.
      </CAlert>
    </CCol>
      }
    </CRow>
  );
};

export default Notifications;
