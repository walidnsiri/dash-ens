import React, { useState, useEffect } from "react";
import {
  CCol,
  CRow,
  CBadge,
  CDataTable,
} from "@coreui/react";
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
  const [filterData, setFilterData] = useState({Module : "", NSéance : "",Justification: ""})

  function handlefiltercallback(data) {
    
      setFilterData(data);
    
  }


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