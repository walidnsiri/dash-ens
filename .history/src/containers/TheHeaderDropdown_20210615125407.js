import React, { useContext, useEffect, useState} from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import {UserContext} from "utils/UserContext";
import { useHistory } from "react-router-dom";
import { queryApi } from "../utils/queryApi";
import useravatar from "../assets/img/avatars/user.png";
import { GetImage } from 'utils/getImage';

const TheHeaderDropdown = () => {
  const [user, setUser] = useContext(UserContext)
  const [image,setImage] = useState(null);
  const history = useHistory()
  
  const handleLogout = async function() {
    const [,error]= await queryApi("public/logout",null, 'POST');
    if (error) console.error(error);
    else {setUser(null);history.replace("/login");}
  }

  const handleImage = async function() {
    const img = await GetImage(user.image);
    setImage(img);
  }

  useEffect(() => {
    handleImage();
  }, )

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={image ? image  : useravatar }
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" /> 
          Notifications
          <CBadge color="info" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={ (e) => {handleLogout(e)} }>
          <CIcon name="cil-lock-locked" className="mfe-2" /> 
          Lock Account
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
