import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import logo from "../assets/img/brand/logo-esprit.svg"
import sygnet from "../assets/img/brand/sygnet.svg"
import {setsidebar,selectSidebar} from '../features/sidebarShow';
// sidebar nav config
import {getItems} from './_nav'
import { UserContext } from "../utils/UserContext";

const TheSidebar = () => {
  const [user,] = useContext(UserContext);
  const dispatch = useDispatch()
  const show = useSelector(selectSidebar)
  

  return (
    <CSidebar
      show={show}
      onShowChange={(val) => {dispatch(setsidebar(val))}}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          src={logo}
          name="logo-negative"
          height={35}
        />
        <CIcon
          src={sygnet}
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={getItems(user)}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
