import React, { useState, useEffect } from "react";
import {
  CCol,
  CRow,
  CBadge,
  CDataTable,
} from "@coreui/react";
import Filters from "../../../../components/custom/FIlters"
import NoteSRSearch from "./NoteSRSearch";
import NoteSRFilters from "./NoteSRFilters";
import NoteSRData from "./NoteSRData";

const getBadge = (Note_Exam) => {
  if (Note_Exam < 8) return "danger";
  if ( Note_Exam < 10  && Note_Exam >= 8 ) return "warning";
  if (Note_Exam >= 10 ) return "success";
};
const fields = ["Designation", "Coef", "NomEnseignant",{ key: 'Note_Exam', _style: { width: '30%'} }];


const ShowNoteSR = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterData, setFilterData] = useState({Designation : "", Coef : "", NomEnseignant: ""})

  function handlefiltercallback(data) {
    
      setFilterData(data);
    
  }


  return (
    <>
      <Filters
        Filters={NoteSRFilters}
        Search={NoteSRSearch}
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
              items={NoteSRData}
              fields={fields}
              itemsPerPage={13}
              scopedSlots={{
                Note_Exam: (item) => (
                  <td>
                    <CBadge color={getBadge(item.Note_Exam)} className='p-2'>{item.Note_Exam}</CBadge>
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

export default ShowNoteSR;