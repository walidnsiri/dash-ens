import React, { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import FilterListIcon from '@material-ui/icons/FilterList';
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
    CInputRadio,
    CBadge
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { queryApi } from "../../../utils/queryApi";

const ModalFilterProduction = (props) => {

    const { show, onClose, message, onConfirm, setref } = props;


    const [refs, setRefs] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [selectedBadge, setSelectedBadge] = useState(1);
    

    function handleInputChange(e) {
        setSearchInput(e.target.value);
        if (e.target.value.length == 0) { setFiltered(false); }
        else { setFiltered(true); }
      }

    const filteredresults = function (search) {
        if (filtered) {
            return refs.filter(element => element.refproduction.includes(search));
        } else return [];
    }


    //fetch ref productions!
    useEffect(() => {
        const fetchref = async () => {
            const [res, error] = await queryApi("rdi/refproduction");
            if (res) {
                setRefs(res);
            }
            if (error) console.error(error);
        }
        fetchref();
    }, [])

    useEffect(() => {
        setFilteredResults(filteredresults(searchInput));
    }, [searchInput])

    useEffect(() => {
        const closeOnEspaceKeyDown = (e) => {
            if (e.charCode || e.keyCode === 27) {
                onClose();
            }
        };
        document.body.addEventListener("keydown", closeOnEspaceKeyDown);
        return () => {
            document.body.removeEventListener("keydown", closeOnEspaceKeyDown);
        };
    }, [onClose]);

    function handleSelect(e) {
        const id = e.target.getAttribute("data-key");
        const value = e.target.getAttribute("value");
        if (id === null) return;
        setref({id:id,value:value});
        //formik.setFieldValue("refproduction", id);
        setSelectedBadge(id);
    }


    return (
    <>
    <div className={`modal delete ${show ? "show" : ""}`} onClick={onClose}>
        <div className="modal-dialog modal-confirm">
            <div className="modal-content">
                <div
                    className="modal-header flex-column"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="icon-box">
                        <FilterListIcon
                            style={{ fontSize: 60, color: "#f15e5e", marginTop: "8%" }}
                        />
                    </div>
                    <h4 className="modal-title w-100">Sélectionner la réference de production</h4>
                    <button
                        type="button"
                        className="close"
                        aria-hidden="true"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                </div>
                <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                    <div className="mb-4" >
                    <CInputGroup >
                        <CInput
                            id="input1-group2"
                            name="input1-group2"
                            placeholder="Rechercher la réference de production..."
                            value={searchInput}
                            onChange={handleInputChange}
                            className="shadow-sm bg-white rounded  search-bar"
                            style={{ zIndex: 0 }}
                        />
                    </CInputGroup>
                    </div>
                    <div className="scroll-refprod">

                        {filtered && filteredResults?.map((ref) => (
                            <div className="" style={{ display: "inline-block" }}>
                                <CBadge key={ref.id} value ={ref.refproduction} data-key={ref.id} color={selectedBadge == ref.id ? "success" : "danger"} style={{ padding: "20px", marginRight: "15px", marginBottom: "15px" }} onClick={(e) => { handleSelect(e) }}
                                >
                                    {ref.refproduction}
                                </CBadge>
                            </div>
                        ))}


                        {!filtered && refs?.map((ref) => (
                            <div key={ref.id} className="" style={{ display: "inline-block" }}>
                                <CBadge key={ref.id} value ={ref.refproduction} data-key={ref.id} color={selectedBadge == ref.id ? "success" : "danger"} style={{ padding: "20px", marginRight: "15px", marginBottom: "15px" }} onClick={(e) => { handleSelect(e) }}
                                >
                                    {ref.refproduction}
                                </CBadge>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="modal-footer justify-content-center">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onClose}
                    >
                        Anuller
                    </button>
                </div>
            </div>
        </div>
    </div>
    </>)
}

export default ModalFilterProduction;