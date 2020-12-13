import React, {useState, useEffect} from "react";
import {
  CCol,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInput,
  CButton,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
const AbsenceSearch = (props) => {

  const [searchInput, setSearchInput] = useState("");
  const { filterscallback } = props;

  const sendData = () => {
    filterscallback({searchInput});
  }

  useEffect(() => {
      console.log(searchInput)
    sendData();
  }, [searchInput]);

  function handleInputChange(e) {
    setSearchInput(e.target.value);
  }

  return (
    <>
      <CRow>
        <CCol className="mt-3">
          <h5>Absence</h5>
        </CCol>
        <CCol lg="6" sm="6" md="6" xs="6">
          <CInputGroup>
            <CInputGroupPrepend>
              <CButton type="button" color="primary">
                <CIcon name="cil-magnifying-glass" /> Search
              </CButton>
            </CInputGroupPrepend>
            <CInput
              id="input1-group2"
              name="input1-group2"
              placeholder="Search anything"
              value={searchInput}
              onChange={handleInputChange}
            />
          </CInputGroup>
        </CCol>
      </CRow>
    </>
  );
};

export default AbsenceSearch;
