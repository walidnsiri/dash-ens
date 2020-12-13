import React, { useState, useEffect } from "react";
import { CFormGroup, CInputCheckbox, CLabel, CInputRadio } from "@coreui/react";
import { getDesignation, getCoef, getNomEnseignant } from "./NoteSPData";

const NoteSPFilters = (props) => {
  const { filterscallback } = props;
  const designation = getDesignation();
  const coef = getCoef();
  const nomEnseignant = getNomEnseignant();
  
  const [filtres, setfiltres] = useState({
    Designation: "",
    Coef: "",
    NomEnseignant: "",
  });

  function handleCheckbox(e) {
    const nomcol = e.target.name;
    if (e.target.value === "") {
      setfiltres({ ...filtres, [nomcol]: "" });
    } else {
      setfiltres({ ...filtres, [nomcol]: e.target.value });
    }
  }

  useEffect(() => {
    filterscallback(filtres);
  }, [filtres]);

  return (
    <>
      <div className="mb-4 ml-4">
        <h5>
          <em>Designation</em>
        </h5>
        {designation && (
          <>
            <CFormGroup key="all" variant="checkbox" className="mt-2 ml-4">
              <CInputRadio
                className="form-check-input"
                id="All"
                name="Designation"
                value=""
                onChange={(e) => handleCheckbox(e)}
                selected
              />
              <CLabel variant="checkbox" htmlFor="All">
                Tous les designations
              </CLabel>
            </CFormGroup>
            {designation.map((m) => (
              <CFormGroup key={m} variant="checkbox" className="mt-2 ml-4">
                <CInputRadio
                  className="form-check-input"
                  id={m}
                  name="Designation"
                  value={m}
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel variant="checkbox" htmlFor={m}>
                  {m}
                </CLabel>
              </CFormGroup>
            ))}
          </>
        )}

        <h5 className="mt-2">
          <em>Coef</em>
        </h5>
        {coef && (
          <>
            <CFormGroup key="all" variant="checkbox" className="mt-2 ml-4">
              <CInputRadio
                className="form-check-input"
                id="All"
                name="Coef"
                value=""
                onChange={(e) => handleCheckbox(e)}
                selected
              />
              <CLabel variant="checkbox" htmlFor="All">
                Tous les coefficients
              </CLabel>
            </CFormGroup>
            {coef.map((m) => (
              <CFormGroup key={m} variant="checkbox" className="mt-2 ml-4">
                <CInputRadio
                  className="form-check-input"
                  id={m}
                  name="Coef"
                  value={m}
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel variant="checkbox" htmlFor={m}>
                  {m}
                </CLabel>
              </CFormGroup>
            ))}
          </>
        )}

        <h5 className="mt-2">
          <em>Nom Enseignant</em>
        </h5>
        {nomEnseignant && (
          <>
            <CFormGroup key="all" variant="checkbox" className="mt-2 ml-4">
              <CInputRadio
                className="form-check-input"
                id="All"
                name="NomEnseignant"
                value=""
                onChange={(e) => handleCheckbox(e)}
                selected
              />
              <CLabel variant="checkbox" htmlFor="All">
                Tous les enseignants
              </CLabel>
            </CFormGroup>
            {nomEnseignant.map((m) => (
              <CFormGroup key={m} variant="checkbox" className="mt-2 ml-4">
                <CInputRadio
                  className="form-check-input"
                  id={m}
                  name="NomEnseignant"
                  value={m}
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel variant="checkbox" htmlFor={m}>
                  {m}
                </CLabel>
              </CFormGroup>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default NoteSPFilters;
