import React, { useEffect, useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
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
import CheckboxCard from "../../../views/components/custom/CheckboxCards";
import setDate from "date-fns/setDate";

const ModalSuiviFilters = (props) => {

    const { show, onClose, setPeriod, setDat } = props;
    const [date, setdate] = useState(null);
    const [radiochecked, setRadiochecked] = useState(true);
    const [periode, setPeriode] = useState("YEAR");

    const setper = (periode) => {
        setPeriod(periode);
    }
    const setda = (date) => {
        setDat(date);
    }
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

    function handleCheckbox(e) {
        if (e.target.value === "YEAR") {
            setRadiochecked(true);
        } else {
            setRadiochecked(false);
        }
        setPeriode(e.target.value);
        setDate(null,null);
        setper(e.target.value);
    }

    function handleDateChange(e) {
        setdate(e); 
        if(e == null){
            setper("YEAR");
            setPeriode("YEAR");
        }
        setda(e);
    }


    return (
        <>
            <div className={`modal checkcard ${show ? "show" : ""}`} onClick={onClose}>
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
                            <h4 className="modal-title w-100">Veuillez sélectionner les filtres</h4>
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
                            <div className="">
                                <h5 variant="checkbox" className="mb-1" htmlFor="range2">
                                    Date:
                                </h5>
                                <div>
                                    <DateRangePicker
                                        className="datepicker border-0"
                                        onChange={(e) => { handleDateChange(e); }}
                                        value={date}
                                    />
                                </div>
                            </div>
                            {date == null && <>
                                <h5 className="font-size-14 mt-3">Periode:</h5>
                                <div className="mt-2 d-inline-flex">

                                    <CFormGroup variant="checkbox" className="checkbox">
                                        <CInputRadio
                                            id="checkbox1"
                                            name="periode"
                                            value="YEAR"
                                            onChange={(e) => handleCheckbox(e)}
                                            checked={radiochecked}
                                            className=""
                                        />
                                        <CLabel
                                            variant="checkbox"
                                            className="form-check-label mt-1"
                                            htmlFor="checkbox1"
                                        >
                                            Année
                                        </CLabel>
                                    </CFormGroup>
                                    <CFormGroup variant="checkbox" className="checkbox ml-4">
                                        <CInputRadio
                                            id="checkbox2"
                                            name="periode"
                                            value="MONTH"
                                            onChange={(e) => handleCheckbox(e)}
                                            className=""
                                        />
                                        <CLabel
                                            variant="checkbox"
                                            className="form-check-label mt-1"
                                            htmlFor="checkbox2"
                                        >
                                            Mois
                                        </CLabel>
                                    </CFormGroup>
                                    <CFormGroup variant="checkbox" className="checkbox ml-4">
                                        <CInputRadio
                                            id="checkbox3"
                                            name="periode"
                                            value="WEEK"
                                            onChange={(e) => handleCheckbox(e)}
                                            className=""
                                        />
                                        <CLabel
                                            variant="checkbox"
                                            className="form-check-label mt-1"
                                            htmlFor="checkbox3"
                                        >
                                            Semaine
                                        </CLabel>
                                    </CFormGroup>
                                </div>
                            </>}

                        </div>

                        <div className="modal-footer justify-content-center">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={onClose}
                            >
                                Retour
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default ModalSuiviFilters;