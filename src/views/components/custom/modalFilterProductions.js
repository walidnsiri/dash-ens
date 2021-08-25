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



const ModalFilterProduction = (props) => {

    const [refs, setRefs] = useState([]);
    const [filtered, setFiltered] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);

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
    }, [modal, modalproduction])

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

    const { show, onClose, message, onConfirm } = props;

    return (<div className={`modal delete ${show ? "show" : ""}`} onClick={onClose}>
        <div className="modal-dialog modal-confirm">
            <div className="modal-content">
                <div
                    className="modal-header flex-column"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="icon-box">
                        <CloseIcon
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
                <div className="modal-body">
                    <CInputGroup >
                        <CInputGroupPrepend>
                            <CButton type="button" color="primary" className="shadow-lg " style={{ zIndex: 1 }}>
                                <CIcon name="cil-magnifying-glass" />
                            </CButton>
                        </CInputGroupPrepend>
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
                    <div className="scroll-refprod">

                        {filtered && filteredResults?.map((ref) => (
                            <div className="" style={{ display: "inline-block" }} onMouseEnter={() => setHoveredRef(ref.id)}
                                onMouseLeave={() => setHoveredRef("")}>
                                <CBadge key={ref.id} data-key={ref.id} color={selectedBadge == ref.id ? "success" : "danger"} style={{ padding: "20px", marginRight: "15px", marginBottom: "15px" }} onClick={(e) => { handleSelect(e) }}
                                >
                                    {ref.refproduction}
                                </CBadge>
                                {hoveredRef == ref.id && <div style={{ display: "inline-block" }}>
                                    <CButton onClick={e => { deleteRefProd(ref) }}><DeleteIcon /></CButton>
                                    <CButton onClick={e => { setModalAddProduction({ ...modalproduction, show: true, type: 'edit', refprod: ref }); }}><EditIcon /></CButton>
                                </div>}
                            </div>
                        ))}


                        {!filtered && refs?.map((ref) => (
                            <div className="" style={{ display: "inline-block" }} onMouseEnter={() => setHoveredRef(ref.id)}
                                onMouseLeave={() => setHoveredRef("")}>
                                <CBadge key={ref.id} data-key={ref.id} color={selectedBadge == ref.id ? "success" : "danger"} style={{ padding: "20px", marginRight: "15px", marginBottom: "15px" }} onClick={(e) => { handleSelect(e) }}
                                >
                                    {ref.refproduction}
                                </CBadge>
                                {hoveredRef == ref.id && <div style={{ display: "inline-block" }}>
                                    <CButton onClick={e => { deleteRefProd(ref) }}><DeleteIcon /></CButton>
                                    <CButton onClick={e => { setModalAddProduction({ ...modalproduction, show: true, type: 'edit', refprod: ref }); }}><EditIcon /></CButton>
                                </div>}
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
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={onConfirm}
                    >
                        Selectionner
                    </button>
                </div>
            </div>
        </div>
    </div>)
}

export default ModalFilterProduction;