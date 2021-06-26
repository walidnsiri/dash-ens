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
  CLink,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CImg } from "@coreui/react";
import { Link } from "react-router-dom";
import noimage from "../../../assets/img/noimage.png";
import {userRoles} from '../../../enums/roles.enum';
import {queryApi} from '../../../utils/queryApi';
import DeleteModal from "../../components/custom/DeleteModal";

const UserCard = (props) => {
  const [modal, setModal] = useState({show: false, message: "", type:"success"});

  const {user} = props;

  async function handleDelete() {
    const onConfirm = async () => {
      const [res, error] = await queryApi("club/" + user.id, null, "DELETE")
      if(res) setModal({show: true, message: "L'utilisateur a été supprimé avec succès", type:'success'});
      if(error) setModal({show: true, message: error.details, type:'error'});
    }
    const OnClose = () => {setModal({...modal,show: false})}
    
    setModal({
      show: true,
      message: "Voulez-vous vraiment supprimer cet utilisateur? Ce processus est irréversible!",
      OnClose,
      onConfirm
    })
  }


  return (
    <>
      <DeleteModal />
      <div class="post-module">
        <div class="thumbnail">
        {user?.authorities.includes(userRoles.USER_ADMIN) && 
          <div class="role">
            <div class="title">admin</div>
          </div>
        }
        {user?.image?  <CImg src={noimage} alt="userimg"/> :  <CImg src={noimage} alt="userimg"/>}
         
        </div>
        <div class="post-content">
          <div class="category">Info</div>
          <h1 class="title">{user.fullName}</h1>
          <h2 class="sub_title">{user.authorities[0]}</h2>
          <p
            class="description"
            style={{height:"100px",display:"none",opacity:"1"}}
          >
        
        <div className="crud-buttoms">          
          <div className="item">
            <Link onClick={handleDelete}>
              <span className="fa fa-trash fa-2x"></span>
            </Link>
          </div>
          <div className="item">
            <Link to="/users/1">
              <span className="fa fa-pencil fa-2x"></span>
            </Link>
          </div>
          </div>
          </p>
          <div class="post-meta">
            <span class="timestamp">
              <i class="fa fa-clock-o"> Crée le </i> {user?.createdAt}
            </span>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
