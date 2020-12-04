import React, { useState, useEffect } from "react";
import {
  CFormGroup,
  CInputCheckbox,
  CLabel
} from "@coreui/react";
import { TreeViewComponent } from "@syncfusion/ej2-react-navigations";
import { field, isChecked } from "./userroles";

const UserFilters = (props) => {
  const [types, setTypes] = useState([]);
  const [rols, setRoles] = useState([]);
  const { filterscallback } = props;

  const sendData = () => {
    filterscallback({types,rols});
  }

  useEffect(() => {
    sendData();
  }, [types,rols]);



  function nodeChecked(args) {
    const checkednodes = this.checkedNodes;
    let roles = [];
    if (checkednodes.length > 0) {
      checkednodes.forEach((elem) => {
        const role = field.dataSource.filter((e) => e.id == elem)[0].role;
        if (role !== undefined) roles.push(role);
      });
    }
    setRoles(roles);
  }

  function handleCheckbox(e) {
    if (types.includes(e.target.value)) {
      const nextValue = types.filter((value) => value !== e.target.value);
      setTypes(nextValue);
    } else {
      setTypes([...types, e.target.value]);
    }
  }

  return (
    <>
      <div className="mb-4 ml-4">
        <h5>
          <em>Roles</em>
        </h5>
        <TreeViewComponent
          fields={field}
          showCheckBox={isChecked}
          nodeChecked={nodeChecked}
        />
        <div className="mt-4 pt-3">
          <h5>
            <em>Types</em>
          </h5>
          <CFormGroup variant="checkbox" className="checkbox">
            <CInputCheckbox
              id="checkbox1"
              name="type"
              value="Normal"
              onChange={(e) => handleCheckbox(e)}
            />
            <CLabel
              variant="checkbox"
              className="form-check-label"
              htmlFor="checkbox1"
            >
              Normal
            </CLabel>
          </CFormGroup>
          <CFormGroup variant="checkbox" className="checkbox">
            <CInputCheckbox
              id="checkbox2"
              name="type"
              value="RDI"
              onChange={(e) => handleCheckbox(e)}
            />
            <CLabel
              variant="checkbox"
              className="form-check-label"
              htmlFor="checkbox2"
            >
              RDI
            </CLabel>
          </CFormGroup>
          <CFormGroup variant="checkbox" className="checkbox">
            <CInputCheckbox
              id="checkbox3"
              name="type"
              value="Club"
              onChange={(e) => handleCheckbox(e)}
            />
            <CLabel
              variant="checkbox"
              className="form-check-label"
              htmlFor="checkbox3"
            >
              Club
            </CLabel>
          </CFormGroup>
        </div>
      </div>
    </>
  );
};

export default UserFilters;
