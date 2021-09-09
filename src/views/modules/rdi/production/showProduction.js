import React, { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CRow,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CButton,
  CPagination,
  CAlert,
  CInputRadio
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { queryApi } from "../../../../utils/queryApi";
import { useHistory } from "react-router-dom";
import CustomCard from "../../../components/custom/CustomCard";
import { productionEnum } from "enums/production.enum"
import ModalFilterProduction from "../../../components/custom/modalFilterProductions";
import { Formik } from "formik";
import SuccessErrorModal from "../../../components/custom/SuccessErrorModal";

import { LoaderSmall } from "../../../../views/components/custom/Loaders";
import { trackPromise} from 'react-promise-tracker';

const ShowProduction = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [totalpages, setTotalPages] = useState(1);
  const [production, setProduction] = useState(null);
  const [rdis, setRdis] = useState([]);
  const [radiochecked, setRadiochecked] = useState(true);
  const [filterModal, setFilterModal] = useState({ show: false });
  const [refId, setRefId] = useState(null);
  const [deleteRerender, setdeleteRerender] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    message: "",
    type: "success",
  });

  

  function HandlerefSelection() {
    const onClose = () => {
      setFilterModal({ ...filterModal, show: false });
    };
    const setref = (ref) => {
      setRefId(ref);
    }

    setFilterModal({
      show: true,
      onClose,
      setref,
    })
  }


  function handleInputChange(e) {
    setCurrentPage(1);
    setSearchInput(e.target.value);

  }
  const [date, setdate] = useState(null);

  function handleCheckbox(e) {
    if (e.target.value === "all") {
      setProduction(null);
      setRadiochecked(true);
      setCurrentPage(1);
      return;
    }
    setRadiochecked(false)
    setProduction(e.target.value);
    setCurrentPage(1);
  }

  /*function handleSelect(changes) {
    console.log(changes);
    
  }*/
  useEffect(() => {
    setCurrentPage(1);
  }, [])

  const routeChange = () => {
    let path = '/productionRdi/add';
    history.push(path);
  }

  useEffect(() => {
    const fetchRdis = async () => {
      const body = {
        pageRequest: {
          number: currentPage,
          limit: 6,
        },
        query: {
        },
      };
      if (date !== null) {
        body["query"] = {
          ...body["query"],
          dates_production: [date[0].getTime(), date[1].getTime()],
        };
      }
      if (searchInput.length !== 0) {
        body["query"] = { ...body["query"], charge_h: searchInput };
      }
      if (production !== null) {
        body["query"] = { ...body["query"], production: production };
      }
      if (refId !== null) {
        body["query"] = { ...body["query"], refproduction_id: refId?.id };
      }

      const [res, error] = await queryApi("rdi/search", body, "POST");
      if (res) {
        setRdis(res.rdis);
        setTotalPages(res.totalPages);

      }
      if (error) console.error(error);
    };
    if (currentPage > 0) {
      trackPromise(fetchRdis());
    }

  }, [currentPage, searchInput, date, production, refId,deleteRerender])




  return (
    <>
      <SuccessErrorModal
        onClose={() => setModal({ ...modal, show: false })}
        show={modal.show}
        type={modal.type}
        message={modal.message}
      />
      <ModalFilterProduction {...filterModal} />
      <CRow>
        <CCol lg="3">
          <CCard className="border-0 shadow-sm">
            <CCardBody>
              <CCardTitle
                className="mb-4"
                style={{ "fontWeight": "550", "fontSize": "0.9rem" }}
              >
                Filter
              </CCardTitle>
              <div className="mt-4 pt-4">
                <h5 className="font-size-14 mb-3">Production</h5>
                <CFormGroup variant="checkbox" className="checkbox">
                  <CInputRadio
                    id="checkbox5"
                    name="production"
                    value="all"
                    onChange={(e) => handleCheckbox(e)}
                    checked={radiochecked}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label mt-1"
                    htmlFor="checkbox5"
                  >
                    Tout
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="checkbox" className="checkbox">
                  <CInputRadio
                    id="checkbox1"
                    name="production"
                    value={productionEnum.Article_de_recherche}
                    onChange={(e) => handleCheckbox(e)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label mt-1"
                    htmlFor="checkbox1"
                  >
                    Article de recherche
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="checkbox" className="checkbox">
                  <CInputRadio
                    id="checkbox2"
                    name="production"
                    value={productionEnum.papier_scientifique}
                    onChange={(e) => handleCheckbox(e)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label mt-1"
                    htmlFor="checkbox2"
                  >
                    Papier scientifique
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="checkbox" className="checkbox">
                  <CInputRadio
                    id="checkbox3"
                    name="production"
                    value={productionEnum.these_de_recherche}
                    onChange={(e) => handleCheckbox(e)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label mt-1"
                    htmlFor="checkbox3"
                  >
                    These de recherche
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="checkbox" className="checkbox">
                  <CInputRadio
                    id="checkbox4"
                    name="production"
                    value={productionEnum.developpement_projet_innovant}
                    onChange={(e) => handleCheckbox(e)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label mt-1"
                    htmlFor="checkbox4"
                  >
                    Developpement projet innovant
                  </CLabel>
                </CFormGroup>
              </div>

              <div className="mt-4 pt-4">
                <h5 className="font-size-14 mb-3">Réf Production</h5>
                <div style={{display:"inline-block"}}>
                {refId ? <CButton className="addbutton" onClick={() => setRefId(null)}>
                {refId.value}
                  <CloseIcon/>
                </CButton> :
                <CButton className="addbutton" onClick={HandlerefSelection}>
                Sélectionner
              </CButton>}
                </div>
                <br/>
                
                
              </div>
              <div className="mt-4 pt-4">
                <CLabel variant="checkbox" className="mt-1" htmlFor="range2">
                  Date Production
                </CLabel>
                <div>
                  <DateRangePicker
                    className="datepicker border-0"
                    onChange={(e) => { setdate(e); setCurrentPage(1) }}
                    value={date}
                  />
                </div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs="12" sm="12" md="12" lg="9" className="mt-2 mb-4">
          <CRow>
            <CCol className="mt-2">
              <h5 className="d-inline mr-2">Productions </h5>
              <CButton className="addbutton" onClick={routeChange}>
                <i className="fa fa-plus"></i>
              </CButton>
            </CCol>
            <CCol lg="6" sm="6" md="6" xs="6" className="mr-4 mt-2">
              <CInputGroup >
                <CInputGroupPrepend>
                  <CButton type="button" color="primary" className="shadow-lg search-button" style={{ zIndex: 1 }}>
                    <CIcon name="cil-magnifying-glass" />
                  </CButton>
                </CInputGroupPrepend>
                <CInput
                  id="input1-group2"
                  name="input1-group2"
                  placeholder="Rechercher par charge horaire..."
                  value={searchInput}
                  onChange={handleInputChange}
                  className="shadow-sm bg-white rounded border-0 search-bar"
                  style={{ zIndex: 0 }}
                />
              </CInputGroup>
            </CCol>
          </CRow>

          <CRow className="d-flex justify-content-center">
            {rdis?.map((rdi) => (
              <CCol key={rdi.id} sm="12" xl="4" xs="12" md="6" >
                <CustomCard key={rdi.id} className="profile-card" type="production" rdi={rdi}  page= {{"totalpages": totalpages,"currentPage": currentPage, "count": rdis.length}}
                setdeleteRerender={setdeleteRerender}
                setCurrentPage={setCurrentPage}
                setModal={setModal}>
                </CustomCard>
              </CCol>
            ))}
          </CRow>
          {(rdis?.length === 0 || !rdis) ? (
            <><CCol sm="12" xl="12" xs="12" md="12" style={{ paddingTop: "4%" }}>
              <CAlert color="warning" className="h-100">
                Pas d'rdi trouvés.
              </CAlert>
            </CCol>
            <LoaderSmall/>
            </>
          ) :
            <CRow>
              <CCol className="mr-4">
                <CPagination
                  className="mt-4"
                  align="end"
                  activePage={currentPage}
                  pages={totalpages}
                  onActivePageChange={setCurrentPage}
                  limit={6}
                />
              </CCol>
            </CRow>}
        </CCol>
      </CRow>
    </>
  );
};

export default ShowProduction;
