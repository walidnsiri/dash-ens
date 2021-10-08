import React, { useState, useEffect,useContext } from "react";
import {
  CCard,
  CCardBody,
  CCardTitle,
  CCol,
  CRow,
  CSelect,
  CFormGroup,
  CInputCheckbox,
  CLabel,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CButton,
  CPagination,
  CInputRadio,
  CAlert
} from "@coreui/react";
import { Range, getTrackBackground } from "react-range";
import { queryApi } from "../../../../utils/queryApi";
import CIcon from "@coreui/icons-react";
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { descriptionEnum } from "../../../../enums/description.enum";
import { reunionEnum } from "../../../../enums/reunion.enum";
import { useHistory } from "react-router-dom";
import CustomCard from "../../../components/custom/CustomCard";
import { LoaderSmall } from "../../../../views/components/custom/Loaders";
import { trackPromise} from 'react-promise-tracker';
import { UserContext } from "../../../../utils/UserContext";
import { userRoles } from "../../../../enums/roles.enum";
import { hasRole, getUserIds } from "../../../../utils/user";
import { useSelector } from 'react-redux';
import { selectGroupRdi } from '../../../../features/groupSlice';
import SuccessErrorModal from "../../../components/custom/SuccessErrorModal";

const ShowReunion = () => {
  const history = useHistory();
  const [user,] = useContext(UserContext);
  const groupRDI = useSelector(selectGroupRdi);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalpages, setTotalPages] = useState(1);
  const [reunions, setReunions] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [deleteRerender, setdeleteRerender] = useState(false);
  const [radiocheckedTitle, setRadiocheckedTitle] = useState(true);
  const [radiocheckedDescription, setRadiocheckedDescription] = useState(true);
  const [radiocheckedStatus, setRadiocheckedStatus] = useState(true);
  const [radiocheckedCree, setRadiocheckedCree] = useState(true);
  const [deb,setDeb] = useState({values: [8]});
  const [fin,setFin] = useState({values: [9]});
  const [isActiveDeb,setIsActiveDeb] = useState(false);
  const [isActiveFin,setIsActiveFin] = useState(false);
  const [modal, setModal] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [userIdsFilter,setUserIdsFilter] = useState([]);
  const [userIds,setUserIds] = useState(getUserIds(groupRDI?.users))
  const [creatorId,setCreatorId] = useState("");

  useEffect ( () => {
    const fetchUsers = async () => {
      const [res, error] = await queryApi("user/users", null, "GET");
      if(res) {
        setUserIds(res);
      }
    }
    if(hasRole(user,userRoles.DSI)){
      fetchUsers();
    }
  },[])

  function handleInputChange(e) {
    setCurrentPage(1);
    setSearchInput(e.target.value);
  }
  const [date, setdate] = useState(null);

  function handleCheckboxStatus(e){
    if (e.target.value === "all") {
      setStatus(null);
      setRadiocheckedStatus(true);
      setCurrentPage(1);
      return;
    }
    setRadiocheckedStatus(false);
    setStatus(e.target.value);
    setCurrentPage(1);
  }

  function handleCheckbox(e) {
    if (e.target.value === "all") {
      setTitre(null);
      setRadiocheckedTitle(true);
      setCurrentPage(1);
      return;
    }
    setRadiocheckedTitle(false);
    setTitre(e.target.value);
    setCurrentPage(1);
  }
  function handleCheckboxDescription(e) {
    if (e.target.value === "all") {
      setDescription(null);
      setRadiocheckedDescription(true);
      setCurrentPage(1);
      return;
    }
    setRadiocheckedDescription(false);
    setDescription(e.target.value);
    setCurrentPage(1);

  }
  
  function handleCreeCheckbox(e) {
    let users = e.target.value;
    setCurrentPage(1);
    if(users == ""){
      setUserIdsFilter([])
      setRadiocheckedCree(true);
    }
    else {
      setUserIdsFilter(users.split(","));
      setRadiocheckedCree(false);
    }
  }


  const routeChange = () => {
    let path = '/reunionRdi/add';
    history.push(path);
  }
  useEffect(() => {
    const fetchReunions = async () => {
      const body = {
        pageRequest: {
          number: currentPage,
          limit: 6,
        },
        query: {
          id_ens_creator : hasRole(user,userRoles.DSI)? creatorId : user?.id? user.id : "",
          userIds : userIdsFilter
        },
      };
      if (date !== null) {
        body["query"] = {
          ...body["query"],
          date_reunion: [date[0].getTime(), date[1].getTime()],
        };
      }
      if (searchInput.length !== 0) {
        body["query"] = { ...body["query"], titre: searchInput };
      }
      if (titre) {
        body["query"] = { ...body["query"], titre: titre };
      }
      if (description) {
        body["query"] = { ...body["query"], description: description };
      }
      if (status) {
        body["query"] = { ...body["query"], status: status };
      }
      if (isActiveDeb){
        let heure = deb.values[0];
        if( heure < 10) {heure = "0" + heure;}
        body["query"] = { ...body["query"], heure_deb: heure };
      }
      if (isActiveFin){
        let heure = fin.values[0];
        if( heure < 10) {heure = "0" + heure;}
        body["query"] = { ...body["query"], heure_fin: heure };
      }
      const [res, error] = await queryApi("rdi/reunion/search", body, "POST");
      if (res) {
        setReunions(res.reunion);
        setTotalPages(res.totalPages);

      }
      if (error) {
        console.error(error);
        setReunions([]);
        setTotalPages(0)
      }
    };
    if (currentPage > 0) {
      trackPromise(fetchReunions());
    }
    

  }, [currentPage, searchInput, date, titre, description, deleteRerender,isActiveDeb,isActiveFin,deb,fin,status,userIdsFilter,creatorId])

  const handleEnseignantSelectChange = (e) => {
    setCreatorId(e.target.value);
    setCurrentPage(1);
  }

  return (
      <>
      <SuccessErrorModal
        onClose={() => setModal({ ...modal, show: false })}
        show={modal.show}
        type={modal.type}
        message={modal.message}
      />
    <CRow style={{"position" : "relative","zIndex": "1"}}>
      <CCol lg="3">
        <CCard className="border-0 shadow-sm">
          <CCardBody>
            <CCardTitle
              className="mb-4"
              style={{ "fontWeight": "550", "fontSize": "0.9rem" }}
            >
              Filtre
            </CCardTitle>

            <div className="mt-4 pt-4">
              <h5 className="font-size-14 mb-3">Crée par:</h5>
              {hasRole(user,userRoles.DSI) ? <>
                <CFormGroup>
                    <CSelect
                      custom
                      name="creator"
                      id="select"
                      value={creatorId}
                      onChange={e => handleEnseignantSelectChange(e)}
                    >
                      <option value="">Tout</option>
                      {userIds?.map((user,index) => {
                        return <option key = {index} value ={user.id}>{user.fullName}</option>
                      })}
                    </CSelect>
                  </CFormGroup>
                  </> 
              :
              <>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputRadio
                  id="checkbox100"
                  name="userIdsFilter"
                  value={[]}
                  onChange={(e) => handleCreeCheckbox(e)}
                  checked={radiocheckedCree}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox100"
                >
                  Moi
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputRadio
                  id="checkbox200"
                  name="userIdsFilter"
                  value={userIds}
                  onChange={(e) => handleCreeCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox200"
                >
                  Groupe RDI
                </CLabel>
              </CFormGroup>
              </>}
            </div>
            <div className="mt-4 pt-4">
              <h5 className="font-size-14 mb-3">Title</h5>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputRadio
                  id="checkbox1"
                  name="title"
                  value="all"
                  onChange={(e) => handleCheckbox(e)}
                  checked={radiocheckedTitle}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox1"
                >
                  Tout
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputRadio
                  id="checkbox2"
                  name="title"
                  value={reunionEnum.Equipe_rdi}
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox2"
                >
                  Equipe RDI
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputRadio
                  id="checkbox3"
                  name="title"
                  value={reunionEnum.Partenaire}
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox3"
                >
                  Partenaire
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputRadio
                  id="checkbox4"
                  name="title"
                  value={reunionEnum.DRDI}
                  onChange={(e) => handleCheckbox(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox4"
                >
                  DRDI
                </CLabel>
              </CFormGroup>
            </div>

            <div className="mt-4 pt-4">
              <h5 className="font-size-14 mb-3">Description</h5>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputRadio
                  id="checkbox5"
                  name="description"
                  value="all"
                  onChange={(e) => handleCheckboxDescription(e)}
                  checked={radiocheckedDescription}
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
                  id="checkbox6"
                  name="description"
                  value={descriptionEnum.Lancement_project}
                  onChange={(e) => handleCheckboxDescription(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox6"
                >
                  Lancement Projet
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputRadio
                  id="checkbox7"
                  name="description"
                  value={descriptionEnum.Signature}
                  onChange={(e) => handleCheckboxDescription(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox7"
                >
                  Signature
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputRadio
                  id="checkbox8"
                  name="description"
                  value={descriptionEnum.Suivie}
                  onChange={(e) => handleCheckboxDescription(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox8"
                >
                  Suivie
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputRadio
                  id="checkbox9"
                  name="description"
                  value={descriptionEnum.Autre}
                  onChange={(e) => handleCheckboxDescription(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox9"
                >
                  Autre
                </CLabel>
              </CFormGroup>
            </div>

            <div className="mt-4 pt-4">
              <h5 className="font-size-14 mb-3">Status</h5>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputRadio
                  id="checkbox30"
                  name="status"
                  value="all"
                  onChange={(e) => handleCheckboxStatus(e)}
                  checked={radiocheckedStatus}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox30"
                >
                  Tout
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputRadio
                  id="checkbox31"
                  name="status"
                  value="Confirme"
                  onChange={(e) => handleCheckboxStatus(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox31"
                >
                  Confirmé
                </CLabel>
              </CFormGroup>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputRadio
                  id="checkbox32"
                  name="status"
                  value="En_attente"
                  onChange={(e) => handleCheckboxStatus(e)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1"
                  htmlFor="checkbox32"
                >
                  En attente
                </CLabel>
              </CFormGroup>
            </div>


            <div className="mt-4 pt-4">
              <h5 className="font-size-14 mb-3">Date</h5>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox15"
                  name="deb"
                  value={isActiveDeb}
                  onClick={(e) => setIsActiveDeb(!isActiveDeb)}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1 mb-2"
                  htmlFor="checkbox15"
                >
                  Heure début
                </CLabel>
              </CFormGroup>
              <div className="mb-2">
              <Range
                disabled={!isActiveDeb}
                step={1}
                min={8}
                max={17}
                values={deb.values}
                onChange={(values) => {setDeb({ values });setCurrentPage(1)}}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
                      width: "100%"
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "5px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values: deb.values,
                          colors: ["#548BF4", "#ccc"],
                          min: 8,
                          max: 17
                        }),
                        alignSelf: "center"
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: isActiveDeb? "48px" :"42px",
                      width: isActiveDeb? "48px" :"42px",
                      borderRadius: "4px",
                      backgroundColor: "#FFF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: isActiveDeb? "0px 2px 6px #f46a6a" : "0px 2px 6px #AAA"
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                        color: isDragged ? "#548BF4" : "#000",
                        textAlign: "center"
                      }}
                    >
                      {deb.values}
                    </div>
                  </div>
                )}
              />
              </div>
              <CFormGroup variant="checkbox" className="checkbox">
                <CInputCheckbox
                  id="checkbox16"
                  name="fin"
                  value={isActiveFin}
                  onClick={(e) => {setIsActiveFin(!isActiveFin);}}
                />
                <CLabel
                  variant="checkbox"
                  className="form-check-label mt-1 mb-2"
                  htmlFor="checkbox16"
                >
                  Heure Fin
                </CLabel>
              </CFormGroup>
              <div className="mb-2">
              <Range
              disabled={!isActiveFin}
                step={1}
                min={9}
                max={18}
                values={fin.values}
                onChange={(values) => {setFin({ values });setCurrentPage(1)}}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: "36px",
                      display: "flex",
                      width: "100%"
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: "5px",
                        width: "100%",
                        borderRadius: "4px",
                        background: getTrackBackground({
                          values: fin.values,
                          colors: ["#548BF4", "#ccc"],
                          min: 9,
                          max: 18
                        }),
                        alignSelf: "center"
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: isActiveFin? "48px" :"42px",
                      width: isActiveFin? "48px" :"42px",
                      borderRadius: "4px",
                      backgroundColor: "#FFF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: isActiveFin? "0px 2px 6px #f46a6a" : "0px 2px 6px #AAA"
                    }}
                  >
                    <div
                      style={{
                        color: isDragged ? "#548BF4" : "#000",
                        textAlign: "center",
                      }}
                    >
                      {fin.values}
                    </div>
                  </div>
                )}
              />
              </div>
              <CLabel variant="checkbox" className="mt-1" htmlFor="range2">
                Date réunion
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
            <h5 className="d-inline mr-2">Réunions</h5>
            {!hasRole(user, userRoles.DSI) &&
              <CButton className="addbutton" onClick={routeChange}>
                <i className="fa fa-plus"></i>
              </CButton>
              }
          </CCol>
          <CCol lg="6" sm="6" md="6" xs="6" className="mr-4">
            <CInputGroup >
              <CInputGroupPrepend>
                <CButton type="button" color="primary" className="shadow-lg search-button" style={{ zIndex: 1 }}>
                  <CIcon name="cil-magnifying-glass" />
                </CButton>
              </CInputGroupPrepend>
              <CInput
                id="input1-group2"
                name="input1-group2"
                placeholder="Rechercher..."
                value={searchInput}
                onChange={handleInputChange}
                className="shadow-sm bg-white rounded border-0 search-bar"
                style={{ zIndex: 0 }}
              />
            </CInputGroup>
          </CCol>
        </CRow>
          <CRow className="d-flex justify-content-center">
          {reunions?.map((reunion) => (
            <CCol key={reunion.id} sm="12" xl="4" xs="12" md="6" >
              <CustomCard key={reunion.id} className="profile-card" type="reunion" reunion={reunion} page={{ "totalpages": totalpages, "currentPage": currentPage, "count": reunion.length }}
                setdeleteRerender={setdeleteRerender}
                setCurrentPage={setCurrentPage}
                setModal={setModal}>
              </CustomCard>
            </CCol>
          ))}
          <LoaderSmall/>
        </CRow>
        {(reunions?.length === 0 || !reunions) ? (
          <CCol sm="12" xl="12" xs="12" md="12" style={{ paddingTop: "4%" }}>
            <CAlert color="warning" className="h-100">
              Pas de réunions rdi trouvés.
            </CAlert>
          </CCol>
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

export default ShowReunion;
