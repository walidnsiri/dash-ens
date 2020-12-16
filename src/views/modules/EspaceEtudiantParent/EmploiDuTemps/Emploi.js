import React from "react";
import { CCol, CRow, CBadge, CDataTable } from "@coreui/react";
import { Link } from "react-router-dom";

const emploiData = [
  {
    id: 0,
    Name: "Emploi du temps Semaine 02-11-2020.pdf",
    Link: "https://google.com",
  },
  {
    id: 1,
    Name: "Emploi du temps Semaine 05-10-2020.pdf",
    Link: "https://google.com",
  },
  {
    id: 2,
    Name: "Emploi du temps Semaine 07-12-2020.pdf",
    Link: "https://google.com",
  },
];

const fields = [
    {
        key: "Name",
        label: "Emplois",
      },
  {
    key: "telecharger",
    label: "",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
  {
    key: "apercu",
    label: "",
    _style: { width: "10%" },
    sorter: false,
    filter: false,
  },
];
const emploi = () => {

    const downloadFileCall = (item) => {
        // api call logic
    }
  return (
    <>
    <CRow className="justify-content-center w-100">
        <CCol md="8" lg="8">
      <CDataTable
        pagination={{ align: "center", addListClass: "mt-4" }}
        activePage={1}
        striped
        sorter={true}
        items={emploiData}
        fields={fields}
        itemsPerPage={13}
        scopedSlots={{
            telecharger: (item) => (
            <td className="py-2">
              <Link to="" onClick={downloadFileCall(item)}>Télécharger</Link>
            </td>
            ),
            apercu: (item) => (
                <td className="py-2">
                  <Link to="">Aperçu</Link>
                </td>
            ),
        }}
      />
      </CCol>
      </CRow>
    </>
  );
};

export default emploi;
