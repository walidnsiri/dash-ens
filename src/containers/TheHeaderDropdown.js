import React, { useContext, useEffect, useState } from 'react'
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import { UserContext } from "utils/UserContext";
import { useHistory } from "react-router-dom";
import { queryApi } from "../utils/queryApi";
import useravatar from "../assets/img/avatars/user.png";
import { GetImage } from 'utils/getImage';
import {hasRole} from "../utils/user";
import {userRoles} from "../enums/roles.enum";
import { useDispatch } from 'react-redux'
import {resetState} from '../features/groupSlice';

const TheHeaderDropdown = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useContext(UserContext)
  const [image, setImage] = useState(null);
  const history = useHistory();
  const [enabledSwitch, setenabledSwitch] = useState(true);

  const handleLogout = async function () {
    const [, error] = await queryApi("public/logout", null, 'POST');
    if (error) console.error(error);
    else { setUser(null);dispatch(resetState()); history.replace("/"); }
  }

  const HandleProfil = () => {
    history.replace("/profil");
  }

  const handleImage = async function () {
    const img = await GetImage(user.image);
    setImage(img);
  }

  useEffect(() => {
    handleImage();
  })

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={image ? image : useravatar}
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
          <strong>Compte</strong>
        </CDropdownItem>
        <CDropdownItem onClick={e => HandleProfil(e)}>
          <CIcon name="cil-user" className="mfe-2" />Profil
        </CDropdownItem>
        { (!hasRole(user,userRoles.USER_ADMIN) &&  !hasRole(user,userRoles.DSI)) && 
        <>
        <CDropdownItem >
          Activer la notification par e-mail
          <CSwitch
            className="mfs-auto"
            variant="3d"
            size="sm"
            color="primary"
            checked={enabledSwitch}
            value={enabledSwitch}
            onChange={() => { setenabledSwitch(!enabledSwitch); }}
          />
          </CDropdownItem>
          <CDropdownItem>
          Activer la notification d'application
          <CSwitch
            className="mfs-auto"
            variant="3d"
            size="sm"
            color="primary"
            checked={enabledSwitch}
            value={enabledSwitch}
            onChange={() => { setenabledSwitch(!enabledSwitch);  }}
          />
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Notifications
          <CBadge color="info" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        </>}
        <CDropdownItem divider />
        <CDropdownItem onClick={(e) => { handleLogout(e) }}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Se déconnecter
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
