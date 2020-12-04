import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CBreadcrumbRouter,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import logo from "../assets/img/brand/logo-esprit.svg"
// routes config
import routes from "../routes";

import { useLocation, matchPath } from "react-router-dom";

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks,
} from "./index";

const TheHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const currPath = useLocation().pathname;
  const [lastRouteName,setlastRouteName] =  useState("");

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type : 'ChangeState/setsidebar', sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type : 'ChangeState/setsidebar', sidebarShow: val });
  };
 
  const getPaths = pathname => {
    const paths = ['/']
    if (pathname === '/') return paths;
    pathname.split('/').reduce((prev, curr) => {
      const currPath = `${prev}/${curr}`
      paths.push(currPath)
      return currPath
    })
    return paths
  }
  
  useEffect(() => {
    if (routes) {
      const paths = getPaths(currPath)
      const currRoutes = paths.map(path => {
        return routes.find(route => matchPath(path, {
          path: route.path,
          exact: route.exact
        }))
      }).filter(route => route)
      let { [Object.keys(currRoutes).pop()]: lastRoute } = currRoutes;
      setlastRouteName(lastRoute.name);
    }
   
  }, [currPath])

  
  return (
    <>
      <CHeader withSubheader>
        <CToggler
          inHeader
          className="ml-md-3 d-lg-none"
          onClick={toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={toggleSidebar}
        />
        <CHeaderBrand className="mx-auto d-lg-none" to="/">
          <CIcon src={logo} name="logo" height="48" alt="Logo" />
        </CHeaderBrand>

        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to="/users">Users</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink>Settings</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>

        <CHeaderNav className="px-3">
          <TheHeaderDropdownNotif />
          <TheHeaderDropdownTasks />
          <TheHeaderDropdownMssg />
          <TheHeaderDropdown />
        </CHeaderNav>
      </CHeader>


        <CRow>
          <div className="ml-5 mt-4 capitalize">
            <h5>
              <b>{lastRouteName}</b>
            </h5>
          </div>

          <div className="ml-auto mr-5 mt-2">
            <CBreadcrumbRouter
              className=""
              routes={routes}
            />
          </div>
        </CRow>
    </>
  );
};

export default TheHeader;
