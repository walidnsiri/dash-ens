import React, {useState} from "react";
import PropTypes from "prop-types";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInput,
  CButton,
  CLink,
  CCollapse,
  CFormGroup,
  CInputCheckbox,
  CLabel,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { Link } from "react-router-dom";
import  Child  from "./child";


const Filters = (props) => {
  const { children, Filters, Search, filtercallback } = props;
  

  function filterscallback  (data) {
    filtercallback(data);
  }

  // render
  return (
    <>
      <CRow>
        <CCol xs="12" sm="12" md="12" lg="3">
          <CCard className="border-white detail-user-card ml-2">
            <CCardBody>
              <div className="ml-2 mb-4 mt-2">
                <h5>Filtre</h5>
              </div>
              <Child componentToPassDown={<Filters/>} filterscallback={filterscallback}/>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="12" md="12" lg="9" className="mt-2 mb-4">
        <Child componentToPassDown={<Search/>} filterscallback={filterscallback}/>
          {children}
        </CCol>
      </CRow>
    </>
  );
};

Filters.propTypes = {
  propcollapsed: PropTypes.bool,
};

export default Filters;


/*          <Formik
            initialValues={{
              roles: [],
            }}
            onChange={(values) => alert(JSON.stringify(values, null, 2))}
          >
            {(formik) => (
              <>
                <CFormGroup variant="checkbox" className="checkbox">
                  <Checkbox name="roles" value="Normal" />
                </CFormGroup>
                <CFormGroup variant="checkbox" className="checkbox">
                  <Checkbox name="roles" value="RDI" />
                </CFormGroup>
                <CFormGroup variant="checkbox" className="checkbox">
                  <Checkbox name="roles" value="Club" />
                </CFormGroup>
              </>
            )}
          </Formik>
          
          <input
            type="checkbox"
            {...props}
            checked={field.value.includes(props.value)}
            onChange={() => {
              if (field.value.includes(props.value)) {
                const nextValue = field.value.filter(
                  (value) => value !== props.value
                );
                form.setFieldValue(props.name, nextValue);
              } else {
                const nextValue = field.value.concat(props.value);
                form.setFieldValue(props.name, nextValue);
              }
            }}
          />
          
          */