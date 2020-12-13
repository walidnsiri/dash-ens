import React, { useState, useEffect } from "react";
import { CFormGroup, CInputCheckbox, CLabel, CInputRadio } from "@coreui/react";
import { getModules, getNSeance, getJustification } from "./AbsenceData";

const UserFilters = (props) => {
  const { filterscallback } = props;
  const modules = getModules();
  const NSeance = getNSeance();
  const justifications = getJustification();
  const [filtres, setfiltres] = useState({
    Module: "",
    NSéance: "",
    Justification: "",
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
          <em>Modules</em>
        </h5>
        {modules && (
          <>
            <CFormGroup key="all" variant="checkbox" className="mt-2 ml-4">
              <CInputRadio
                className="form-check-input"
                id="All"
                name="Module"
                value=""
                onChange={(e) => handleCheckbox(e)}
                selected
              />
              <CLabel variant="checkbox" htmlFor="All">
                Tous les modules
              </CLabel>
            </CFormGroup>
            {modules.map((m) => (
              <CFormGroup key={m} variant="checkbox" className="mt-2 ml-4">
                <CInputRadio
                  className="form-check-input"
                  id={m}
                  name="Module"
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
          <em>NSéance</em>
        </h5>
        {NSeance && (
          <>
            <CFormGroup key="all" variant="checkbox" className="mt-2 ml-4">
              <CInputRadio
                className="form-check-input"
                id="All"
                name="NSéance"
                value=""
                onChange={(e) => handleCheckbox(e)}
                selected
              />
              <CLabel variant="checkbox" htmlFor="All">
                Tous les Séances
              </CLabel>
            </CFormGroup>
            {NSeance.map((m) => (
              <CFormGroup key={m} variant="checkbox" className="mt-2 ml-4">
                <CInputRadio
                  className="form-check-input"
                  id={m}
                  name="NSéance"
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
          <em>Justification</em>
        </h5>
        {justifications && (
          <>
            <CFormGroup key="all" variant="checkbox" className="mt-2 ml-4">
              <CInputRadio
                className="form-check-input"
                id="All"
                name="Justification"
                value=""
                onChange={(e) => handleCheckbox(e)}
                selected
              />
              <CLabel variant="checkbox" htmlFor="All">
                Tous les justifications
              </CLabel>
            </CFormGroup>
            {justifications.map((m) => (
              <CFormGroup key={m} variant="checkbox" className="mt-2 ml-4">
                <CInputRadio
                  className="form-check-input"
                  id={m}
                  name="Justification"
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

export default UserFilters;
