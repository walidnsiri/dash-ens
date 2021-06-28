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
import { userRolesObject } from "../../../enums/rolesObjects.enum";
import { userRoles } from "../../../enums/roles.enum";
import { queryApi } from "../../../utils/queryApi";
import { fetchImageFromService } from "../../../utils/getImage";
import { LoaderLarge } from "../../components/custom/Loaders";
import DeleteModal from "../../components/custom/DeleteModal";


const UserCard = (props) => {
  const { user,setModal } = props;
  
  const [deleteModal, setdeleteModal] = useState({ show: false, message: "" });
  const [img, setImg] = useState(noimage);
  const[roles,setRoles] = useState([]);

  const assignRoles = () => {
    let roles = [];
    user.authorities.forEach((role) => {
      userRolesObject.forEach((roleobj) => {
      if (role.authority === roleobj.role) {
        roles.push(roleobj.name)
      }
    })
  })
  setRoles(roles);
  }
  


  useEffect(() => {
    const fetchimg = async () => {
      const img = await fetchImageFromService(user.image);
      setImg(img);
    };
    fetchimg();
    assignRoles();

    return () => setImg(noimage);
  }, [user.image]);

  async function handleDelete() {
    const onConfirm = async () => {
      const [res, error] = await queryApi("user/" + user.id, null, "DELETE");
      if (res)
        setModal({
          show: true,
          message: "L'utilisateur a été supprimé avec succès",
          type: "success",
        });
      if (error)
        setModal({ show: true, message: error.details, type: "error" });
    };
    const onClose = () => {
      setModal({ show: false,
        message: "",
        type: "success" });
    };

    setdeleteModal({
      show: true,
      message:
        "Voulez-vous vraiment supprimer cet utilisateur? Ce processus est irréversible!",
        onClose,
      onConfirm,
    });
  }

  return (
    <>
      <DeleteModal {...deleteModal} />
      <div className="post-module">
        <div className="thumbnail">
          { user.authorities.map((role) => {
            if (role.authority ===  userRoles.USER_ADMIN) {
              return (
                <div key={role.authority} className="role">
                  <div className="title">admin</div>
                </div>
              );
            }
          })}
          <LoaderLarge />
          <CImg src={img} />
        </div>
        <div className="post-content">
          <div className="category">Info</div>
          <h1 className="title">{user.fullName}</h1>
          <div className="sub_title">
           {roles.map( role => {
             return <h5 key={role}>{role}</h5>
           })}
          </div>
          <div
            className="description"
            style={{ height: "100px", display: "none", opacity: "1" }}
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
