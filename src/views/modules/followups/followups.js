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
  CInputRadio,
  CImg,
  CBadge,
} from "@coreui/react";
import useravatar from "../../../assets/img/avatars/user.png";
import CIcon from "@coreui/icons-react";
import FollowupDetails from "./followupDetails";
import { UserContext } from "../../../utils/UserContext";
import { queryApi } from "../../../utils/queryApi";
import Moment from 'react-moment';
import moment from 'moment'

import { LoaderSmall } from "../../../views/components/custom/Loaders";
import { trackPromise } from 'react-promise-tracker';

import { fetchImageFromService } from "../../../utils/getImage";
import { useSelector } from 'react-redux'
import {selectGroupRdi} from '../../../features/groupSlice';


const Followups = (props) => {
  const { sort, clicked } = props;
  moment.locale("fr");
  const [user,] = useContext(UserContext)
  const [followups, setFollowups] = useState([]);
  const [error, setError] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [followup, setFollowup] = useState({});
  const [loading, setLoading] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filtered, setFiltered] = useState(false);
  const [radiocheckedAnswered, setRadiocheckedAnswered] = useState(true);
  const [radiocheckedActif, setRadiocheckedActif] = useState(true);
  const [isAnswered, setIsAnswered] = useState("");
  const [isActive, setIsActive] = useState("");
  const [type, setType] = useState("");
  const groupRDI = useSelector(selectGroupRdi);
  const [createdUserId, setCreatedUserId] = useState("");

  const convertUserfullNameToId = (groupRDI,searchInput) => {
    let userids=[];
    if(groupRDI){
      let users = groupRDI.users;
      users.map((user,index)=>{
        if(user.fullName.toLowerCase().includes(searchInput)){
          userids.push(user.id);
        }
      })
    }
    setCreatedUserId(userids[0]? userids[0]: "empty");
  }

  /*const getClickedType = () => {
    if (clicked[1]) return "";
    if (clicked[2]) return "rdi";
    if (clicked[3]) return "encadrement";
  }
  const getClickedUpcoming = () => {
    if (clicked[4]){
      setIsActive(false);
      return false;
    } 
    if (clicked[1]){
      setIsActive(true);
      return true;
    }
    setIsActive("");
    return "";
    
  }*/

  useEffect(() => {
    if (clicked[1]) {
      setType("");
      setIsActive(true);
      
    }
    if (clicked[2]) {
      setType("rdi");
      setIsActive("");
      
    };
    if (clicked[3]) {
      setType("encadrement");
      setIsActive("");
    }
    if (clicked[4]) {
      setType("");
      setIsActive(false);
    }
    setIsAnswered("");
    setRadiocheckedAnswered(true);
    setRadiocheckedActif(true);
    setCreatedUserId("");
    setSearchInput("");

  }, [clicked])

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
  const handleCheckboxActif = (e) => {
    if (e.target.value === "all") {
      setRadiocheckedActif(true);
      setIsActive("")
      return;
    }
    setIsActive(e.target.value)
    setRadiocheckedActif(false)
  }
  const handleCheckbox = (e) => {
    if (e.target.value === "all") {
      setRadiocheckedAnswered(true);
      setIsAnswered("")
      return;
    }
    setRadiocheckedAnswered(false)
    setIsAnswered(e.target.value)
  }

  useEffect(() => { setPageNumber(1); setFollowups([]) }, [sort, isAnswered, isActive, type,createdUserId])

  useEffect(() => {
    const fetchNotifications = async () => {

      const body = {
        pageRequest: {
          number: pageNumber,
          limit: 6,
          sort: sort
        },
        query: {
          "id_ens_creator": createdUserId,
          "user_id": user.id,
          "type": type,
          "deleted": false,
          "isActive": isActive,
          "isAnswered": isAnswered

        },
      };
      if(createdUserId == "empty") return;
      const [res, error] = await queryApi("notification/followup/search", body, "POST");
      if (res) {
        if (pageNumber === 1) {
          let notifs = res.followups;
          await Promise.all(notifs.map(async (notif, index) => {
            notifs = await fetchUser(notif.notification.id_ens_modifier, index, notifs);
          }));
          setFollowup({ ...notifs[0] });
          if (notifs.length > 0) {
            notifs[0] = { ...notifs[0], read: true };
            setFollowups(notifs);
          }
          setTotalPages(res.totalPages)
          setError(null);
          if (notifs.length == 0) setFollowup({});
        }
        else {
          let notifs = res.followups;
          await Promise.all(notifs.map(async (notif, index) => {
            notifs = await fetchUser(notif.notification.id_ens_modifier, index, notifs);
          }));
          setFollowups([...followups, ...notifs])
          setTotalPages(res.totalPages)
          setError(null);
        }
      }
      if (error) {
        setError(error);
        setFollowups([]);
        setTotalPages(1);
      }
    };
    trackPromise(fetchNotifications());
  }, [pageNumber, sort, isAnswered, isActive, type,createdUserId]);



  const handleInputChange = (e) => {
    if (e.target.value == "") {
      setFiltered(false)
      setCreatedUserId("");
    } else {
      setFiltered(true)
    }
    setSearchInput(e.target.value);
    convertUserfullNameToId(groupRDI,e.target.value);
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
    setFollowup({ ...followups[index] });
    let notifs = followups;
    if (notifs.length > 0) {
      notifs[index] = { ...notifs[index], read: true };
      setFollowups([...notifs]);
    }
  }


  return (
    <CRow>
      <CCol lg="12" md="12" sm="12" xs="12" xl={followups?.length > 0 ? "4" : "12"} xxl={followups?.length > 0 ? "4" : "12"}>
      {!clicked[3] &&  <CInputGroup className="input-group-notification">
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
            className="shadow-sm bg-white rounded border-0 search-bar-followup"
            style={{ zIndex: 0 }}
          />
        </CInputGroup>}
        {(type == '' && clicked[1]) &&
          <div className="c-inline-block p-3 mt-2">
            <h5 className="font-size-14 mb-3 d-inline mr-2">Répondue: </h5>
            <CFormGroup variant="checkbox" className="checkbox d-inline mr-3">
              <CInputRadio
                id="checkbox15"
                name="answered"
                value="all"
                onChange={(e) => handleCheckbox(e)}
                checked={radiocheckedAnswered}
              />
              <CLabel
                variant="checkbox"
                className="form-check-label mt-1 "
                htmlFor="checkbox15"
              >
                Tout
              </CLabel>
            </CFormGroup>
            <CFormGroup variant="checkbox" className="checkbox d-inline mr-3">
              <CInputRadio
                id="checkbox16"
                name="answered"
                value="true"
                onChange={(e) => handleCheckbox(e)}
              />
              <CLabel
                variant="checkbox"
                className="form-check-label mt-1"
                htmlFor="checkbox16"
              >
                Oui
              </CLabel>
            </CFormGroup>
            <CFormGroup variant="checkbox" className="checkbox d-inline mr-3">
              <CInputRadio
                id="checkbox17"
                name="answered"
                value="false"
                onChange={(e) => handleCheckbox(e)}
              />
              <CLabel
                variant="checkbox"
                className="form-check-label mt-1"
                htmlFor="checkbox17"
              >
                Non
              </CLabel>
            </CFormGroup>
          </div>}

        {(type == 'rdi' || type == 'encadrement' ) &&
          <div className="c-inline-block p-3 mt-2">
            <h5 className="font-size-14 mb-3 d-inline mr-5">Actif: </h5>
            <CFormGroup variant="checkbox" className="checkbox d-inline mr-3">
              <CInputRadio
                id="checkbox20"
                name="active"
                value="all"
                onChange={(e) => handleCheckboxActif(e)}
                checked={radiocheckedActif}
              />
              <CLabel
                variant="checkbox"
                className="form-check-label "
                htmlFor="checkbox20"
              >
                Tout
              </CLabel>
            </CFormGroup>
            <CFormGroup variant="checkbox" className="checkbox d-inline mr-3">
              <CInputRadio
                id="checkbox21"
                name="active"
                value="true"
                onChange={(e) => handleCheckboxActif(e)}
              />
              <CLabel
                variant="checkbox"
                className="form-check-label mt-1"
                htmlFor="checkbox21"
              >
                Oui
              </CLabel>
            </CFormGroup>
            <CFormGroup variant="checkbox" className="checkbox d-inline mr-3">
              <CInputRadio
                id="checkbox22"
                name="active"
                value="false"
                onChange={(e) => handleCheckboxActif(e)}
              />
              <CLabel
                variant="checkbox"
                className="form-check-label mt-1"
                htmlFor="checkbox22"
              >
                Non
              </CLabel>
            </CFormGroup>
          </div>}
        <div className="scroll-notifs" id="notif-scroll" onScroll={e => handleScroll(e)}>
          {followups?.map((notificatio, index) => (
            <CCard
              key={index}
              style={{ borderColor: notificatio.read ? "none" : "red", backgroundColor: notificatio.notification.id_event === followup.notification.id_event ? "#ECECEC" : "transparent" }}
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
                    followup {notificatio?.notification.type}
                  </div>
                  <div className="small text-muted text-truncate">
                    {moment(notificatio?.notification.due_date).format('L')}
                  </div>
                </div>
              </CCardBody>
            </CCard>

          ))}
          <LoaderSmall />
        </div>
      </CCol>
      {followups?.length > 0 ?
        <CCol xs="12" sm="12" md="12" lg="12" xl="8" xxl="8">
          <FollowupDetails followup={followup} />
        </CCol> :
        <CCol sm="12" xl="12" xs="12" md="12" style={{ paddingTop: "4%" }}>
          <CAlert color="warning" className="h-100">
            Pas de notifications de suivi trouvés.
          </CAlert>
        </CCol>
      }
    </CRow>
  );
};

export default Followups;
