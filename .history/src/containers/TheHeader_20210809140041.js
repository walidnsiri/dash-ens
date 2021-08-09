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
  CCol,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import logo from "../assets/img/brand/logo-esprit.svg"
// routes config
import routes from "../routes";
import {setsidebar} from '../features/sidebarShow';

import { useLocation, matchPath } from "react-router-dom";

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg
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
      console.log(val)
    dispatch(setsidebar(val));
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch(setsidebar(val));
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
      <CHeader withSubheader className="header-drop-shadow border-0">
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
          
        </CHeaderNav>

        <CHeaderNav className="px-3">
          <TheHeaderDropdownMssg />
          <TheHeaderDropdown />
        </CHeaderNav>
      </CHeader>


        <CRow>
          <CCol className="ml-5 mt-4 capitalize">
            <h5>
              <b>{lastRouteName}</b>
            </h5>
          </CCol>

          <CCol lg="3" xs="3" md="3" sm="3" className="ml-auto mr-5 mt-2">
            <CBreadcrumbRouter
              className="float-right"
              routes={routes}
            />
          </CCol>
        </CRow>
    </>
  );
};

export default TheHeader;
