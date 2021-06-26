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
import {fetchImageFromService} from '../../../utils/getImage';
import { LoaderLarge } from "../../components/custom/Loaders";
import DeleteModal from "../../components/custom/DeleteModal";
import SuccessErrorModal from "../../components/custom/SuccessErrorModal";

const UserCard = (props) => {
  const {user} = props;
  const [modal, setModal] = useState({show: false, message: "", type:"success"});
  const [deleteModal, setdeleteModal] = useState({show: false, message: ""});
  const [img,setImg] = useState(noimage);

  useEffect(() => {
    async function loadimg() {
      if(user.image) {
      const img = await fetchImageFromService(user.image);
      if (img){
        console.log( typeof image)
        setImg(img);
      }
      }
    }
    loadimg();
  }, [user.image]);

  async function handleDelete() {
    const onConfirm = async () => {
      const [res, error] = await queryApi("user/" + user.id, null, "DELETE")
      if(res) setModal({show: true, message: "L'utilisateur a été supprimé avec succès", type:'success'});
      if(error) setModal({show: true, message: error.details, type:'error'});
    }
    const OnClose = () => {setModal({...modal,show: false})}
    
    setdeleteModal({
      show: true,
      message: "Voulez-vous vraiment supprimer cet utilisateur? Ce processus est irréversible!",
      OnClose,
      onConfirm
    })
  }


  return (
    <>
      
      <SuccessErrorModal  onClose={() => setModal({...modal,show: false})} show={modal.show} type={modal.type} message={modal.message}/>
      <DeleteModal {...deleteModal} />
      <div className="post-module">
        <div className="thumbnail">
        {user?.authorities.includes(userRoles.USER_ADMIN) && 
          <div className="role">
            <div className="title">admin</div>
          </div>
        }
      <LoaderLarge/>
      <CImg src={img}/> 
        </div>
        <div className="post-content">
          <div className="category">Info</div>
          <h1 className="title">{user.fullName}</h1>
          {/*<h2 className="sub_title">{user.authorities[0]}</h2>*/}
          <div
            className="description"
            style={{height:"100px",display:"none",opacity:"1"}}
          >
        
        <div className="crud-buttoms">          
          <div className="item">
            <Link onClick={handleDelete} to="#">
              <span className="fa fa-trash fa-2x"></span>
            </Link>
          </div>
          <div className="item">
            <Link to="/users/1">
              <span className="fa fa-pencil fa-2x"></span>
            </Link>
          </div>
          </div>
          </div>
          <div className="post-meta">
            <span className="timestamp">
              <i className="fa fa-clock-o"> Crée le </i> {user?.createdAt}
            </span>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
