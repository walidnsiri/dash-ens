import React, { useState, useEffect } from "react";
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
  CSwitch,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { userRoles } from "../../../enums/roles.enum";
import CustomUserCard from "../../components/custom/UserCard";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import { queryApi } from "../../../utils/queryApi";
import SuccessErrorModal from "../../components/custom/SuccessErrorModal";
import { useHistory } from "react-router-dom";

function removeItem(arr, value) {
  const index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

const ShowUsers = () => {
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalPages] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [enabledSwitch, setenabledSwitch] = useState(true);
  const [modal, setModal] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [deleteRerender, setdeleteRerender] = useState(false);

  function handleInputChange(e) {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  }
  const [date, setdate] = useState(null);
  const routeChange = () => {
    let path = '/user/add';
    history.push(path);
  }
  function handleCheckbox(e) {
    if (!roles.includes(e.target.value)) {
      let n_roles = [...roles];
      n_roles.push(e.target.value);
      setRoles(n_roles);
    } else {
      let n_roles = [...roles];
      removeItem(n_roles, e.target.value);
      setRoles(n_roles);
    }
    setCurrentPage(1);
  }



  useEffect(() => {
    const fetchUsers = async () => {
      const body = {
        pageRequest: {
          number: currentPage,
          limit: 6,
        },
        query: {
          enabled: enabledSwitch,
        },
      };

      if (date !== null) {
        body["query"] = {
          ...body["query"],
          dates: [date[0].getTime(), date[1].getTime()],
        };
      }
      if (searchInput.length !== 0) {
        body["query"] = { ...body["query"], username: searchInput };
      }
      if (roles.length !== 0) {
        body["query"] = { ...body["query"], authorities: roles };
      }

      const [res, error] = await queryApi("user/search", body, "POST");
      if (res) {
        setUsers(res.users);
        setTotalPages(res.totalPages);
      }
      if (error) console.error(error);
    };
    if(currentPage > 0) {
      fetchUsers();
    }
  }, [currentPage, searchInput, roles, date, enabledSwitch,deleteRerender]);

  return (
    <>
      <SuccessErrorModal
        onClose={() => setModal({ ...modal, show: false })}
        show={modal.show}
        type={modal.type}
        message={modal.message}
      />
      <CRow className="h-100">
        <CCol lg="3">
          <CCard className="border-0 shadow-sm">
            <CCardBody>
              <CCardTitle
                className="mb-4"
                style={{ fontWeight: "550", fontSize: "0.9rem" }}
              >
                Filter
              </CCardTitle>
              <div className="mt-4 pt-4">
                <h5 className="font-size-14 mb-3">Roles</h5>
                <CFormGroup variant="checkbox" className="checkbox">
                  <CInputCheckbox
                    id="checkbox1"
                    name="role"
                    value={userRoles.ENS_CHEF}
                    onChange={(e) => handleCheckbox(e)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label mt-1"
                    htmlFor="checkbox1"
                  >
                    Chef de département
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="checkbox" className="checkbox">
                  <CInputCheckbox
                    id="checkbox2"
                    name="role"
                    value={userRoles.ENS_UP}
                    onChange={(e) => handleCheckbox(e)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label mt-1"
                    htmlFor="checkbox2"
                  >
                    Enseignant CUP
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="checkbox" className="checkbox">
                  <CInputCheckbox
                    id="checkbox3"
                    name="role<"
                    value={userRoles.ENS}
                    onChange={(e) => handleCheckbox(e)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label mt-1"
                    htmlFor="checkbox3"
                  >
                    Enseignant
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="checkbox" className="checkbox">
                  <CInputCheckbox
                    id="checkbox4"
                    name="role<"
                    value={userRoles.USER_ADMIN}
                    onChange={(e) => handleCheckbox(e)}
                  />
                  <CLabel
                    variant="checkbox"
                    className="form-check-label mt-1"
                    htmlFor="checkbox4"
                  >
                    Admin
                  </CLabel>
                </CFormGroup>
              </div>

              <div className="mt-4 pt-4">
                <h5 className="font-size-14 mb-3">Etat</h5>
                <CSwitch
                  variant="3d"
                  size="sm"
                  color="danger"
                  checked={enabledSwitch}
                  value={enabledSwitch}
                  onChange={() =>{setenabledSwitch(!enabledSwitch);setCurrentPage(1);}}
                />
              </div>
              <div className="mt-4 pt-4">
                <CLabel variant="checkbox" className="mt-1" htmlFor="range2">
                  Date de Création
                </CLabel>
                <div>
                  <DateRangePicker
                    className="datepicker border-0"
                    onChange={(d) => {setdate(d);setCurrentPage(1)}}
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
              <div>
                <h5 className="d-inline mr-2">Users </h5>

                <CButton className="addbutton" onClick={routeChange}>
                  <i className="fa fa-plus"></i>
                </CButton>
              </div>
            </CCol>
            <CCol lg="6" sm="6" md="6" xs="6" className="mr-4 mt-2">
              <CInputGroup>
                <CInputGroupPrepend>
                  <CButton
                    type="button"
                    color="primary"
                    className="shadow-lg search-button"
                    style={{ zIndex: 1 }}
                  >
                    <CIcon name="cil-magnifying-glass" />
                  </CButton>
                </CInputGroupPrepend>
                <CInput
                  id="input1-group2"
                  name="input1-group2"
                  placeholder="Rechercher par nom d'utilisateur"
                  value={searchInput}
                  onChange={handleInputChange}
                  className="shadow-sm bg-white rounded border-0 search-bar"
                  style={{ zIndex: 0 }}
                />
              </CInputGroup>
            </CCol>
          </CRow>

          <CRow className="d-flex mt-3">
            {users?.map((c) => (
              <CCol key={c.id} sm="12" xl="4" xs="12" md="6">
                <CustomUserCard
                  key={c.id}
                  className="profile-card"
                  user={c}
                  setModal={setModal}
                  page= {{"totalpages": totalpages,"currentPage": currentPage, "count": users.length}}
                  setdeleteRerender={setdeleteRerender}
                  setCurrentPage={setCurrentPage}
                />
              </CCol>
            ))}
          </CRow>
          {(users?.length === 0 || !users) ? (
            <CCol sm="12" xl="12" xs="12" md="12" style={{ paddingTop: "4%" }}>
              <CAlert color="warning" className="h-100">
                Pas d'utilisateurs trouvés.
              </CAlert>
            </CCol>
          ):  
            <CRow>
              <CCol className="mr-4">
                <CPagination
                  className="mt-4"
                  align="end"
                  activePage={currentPage}
                  pages={totalpages}
                  limit={6}
                  onActivePageChange={setCurrentPage}
                />
              </CCol>
            </CRow>
          }
        </CCol>
      </CRow>
    </>
  );
};

export default ShowUsers;
