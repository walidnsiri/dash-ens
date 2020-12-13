import React, { useState, useEffect } from "react";
import {
  CCol,
  CRow,
  CInputGroup,
  CInputGroupPrepend,
  CInput,
  CButton,
  CPagination,
  CListGroup,
  CListGroupItem,
  CBadge,
  CDataTable,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import CustomUserCard from "../../../../components/custom/customUserCard";
import Filters from "../../../../components/custom/FIlters";
//import CIcon from '@coreui/icons-react'
import AbsenceSearch from "./AbsenceSearch";
import AbsenceFilters from "./AbsenceFilters";
import AbsenceData from "./AbsenceData";

const getBadge = (justification) => {
  switch (justification) {
    case "Absence injustifiée":
      return "danger";
    case "Absence justifiée":
      return "success";
    default:
      return "danger";
  }
};
const fields = ["Module", "Date", "NSéance", "Justification"];

const ShowAbsence = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState({Module : "", NSéance : ""})

  function handlefiltercallback(data) {
    
      setFilterData(data);
    
  }

  useEffect(() => {
    console.log(filterData);
  }, [filterData]);

  return (
    <>
      <Filters
        Filters={AbsenceFilters}
        Search={AbsenceSearch}
        filtercallback={handlefiltercallback}
      >
        <CRow>
          <CCol lg="12" md="12" sm="12" xs="12" className="mt-4">
            <CDataTable
            columnFilterValue={filterData}
            pagination={{"align": "center", "addListClass": "mt-4"}}
            activePage={currentPage}
            border
              tableFilterValue={filterData.searchInput}
              striped
              sorter={true}
              items={AbsenceData}
              fields={fields}
              itemsPerPage={13}
              scopedSlots={{
                Justification: (item) => (
                  <td>
                    <CBadge color={getBadge(item.Justification)} className='p-2'>{item.Justification}</CBadge>
                  </td>
                ),
              }}
            />
          </CCol>
        </CRow>
      </Filters>
    </>
  );
};

export default ShowAbsence;

/*          <CListGroup className="d-flex flex-column align-items-start" style={{background: "#fff" }}>
            <CListGroupItem className="p-3 w-100"> 
            <div className="d-flex justify-content-between">
      <h5 className="mb-1">List group item heading</h5>
      <small>3 days ago</small>
    </div>
    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small>Donec id elit non mi porta.</small>
            </CListGroupItem>
            <CListGroupItem className="p-3 w-100">
            <div className="d-flex justify-content-between">
      <h5 className="mb-1">List group item heading</h5>
      <small>3 days ago</small>
    </div>
    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small>Donec id elit non mi porta.</small>
            </CListGroupItem>
            
            <CListGroupItem className="p-3 w-100">
            <div className="d-flex justify-content-between">
      <h5 className="mb-1">List group item heading</h5>
      <small>3 days ago</small>
    </div>
    <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
    <small>Donec id elit non mi porta.</small>
            </CListGroupItem>

          </CListGroup>*/
