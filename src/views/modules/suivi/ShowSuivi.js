import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CButton,
  CCallout,

} from "@coreui/react";
import {
  CChartDoughnut,
  CChartPolarArea,
  CChartLine,
  CChartBar,
} from "@coreui/react-chartjs";
import { CImg } from "@coreui/react";

import avatar from "../../../assets/img/avatars/user.png";
import { useSelector } from 'react-redux'
import { selectGroupUP } from '../../../features/groupSlice';
import ModalSelectEnseignant from "../../../views/components/custom/ModalSelectEnseignant";
import ModalSuiviFilters from "../../../views/components/custom/ModalSuiviFilters";
import { queryApi } from "../../../utils/queryApi";

const options = {
  // tooltips: {
  //   enabled: false,
  //   custom: customTooltips
  // },
  maintainAspectRatio: false,
};

const Line = (labels,event) => {
  const line = {
    labels: labels,
    datasets: [
      {
        label: event[0]?.label,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "red",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "red",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "red",
        pointHoverBorderColor: "red",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: event[0]?.data_points,
      },
      {
        label: event[1]?.label,
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: event[1]?.data_points,
      },
    ],
  };
  return line;
}

const Bar = (labels,events) => {
  let event = {};
  if(labels.includes("Lundi")){
    event = events[1];
  }else {
    event = events[0];
  }
  const bar = {
    labels: labels,
    datasets: [
      {
        label: event?.label,
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: event?.data_points,
      },
    ],
  };
  return bar;
}

const Doughnut = (event) => {
  const doughnut = {
  labels: ["Rdi", "Reunion", "Encadrement", "Formation", "Service"],
  datasets: [
    {
      data: [event?.rdi, event?.reunion, event?.encadrement, event?.formation, event?.service],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
  }
  return doughnut;
};

const Polar = (event) => {
  const polar = {
    datasets: [
    {
      data: [event?.rdi, event?.reunion, event?.encadrement, event?.formation, event?.service],
      backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"],
      label: "My dataset", // for legend
    },
    ],
    labels: ["Rdi", "Reunion", "Encadrement", "Formation", "Service"],
  }
  return polar;
};


const ShowSuivi = () => {
  const [chart, setChart] = useState("rdi");
  const groupUp = useSelector(selectGroupUP);
  const [selectEnseignantModal, setSelectEnseignantModal] = useState({ show: false });
  const [modalSuiviFilters, setModalSuiviFilters] = useState({ show: false });
  const [periode, setPeriode] = useState("YEAR");
  const [date, setDate] = useState(null);
  const [labels,setLabels] = useState(["January", "February", "March", "April", "May", "June", "July", "bnlabla"]);
  const [event, setEvent] = useState({});
  const [keys,setKeys] = useState({});
  const [ensRecordsCounted,setEnsRecordsCounted] = useState({});
  const [line,setLine] = useState({});
  const [bar,setBar] = useState({});
  const [polar,setPolar] = useState({});
  const [doughnut,setDoughnut] = useState({});

  const [enseignant, SetEnseignant] = useState({});
  const [enseignants, SetEnseignants] = useState([]);


  useEffect ( () => {
    if(Array.isArray(groupUp)){
    if(groupUp.length > 0) {
        let users = [];
        groupUp.map((grp,index) => {
          users.push(...grp.users);
        });
        SetEnseignants(users);
        if(users.length > 0) SetEnseignant(users[0]);
    }}
    else if(groupUp){
      SetEnseignants(groupUp.users);
      if(groupUp.users.length > 0) SetEnseignant(groupUp.users[0]);
    }
  },[groupUp])

  const handleEnseignantSelection = () => {
    const onClose = () => {
      setSelectEnseignantModal({ ...selectEnseignantModal, show: false });
    };
    
    const setEnseignant = (ens) => {
      SetEnseignant(ens);
    }

    setSelectEnseignantModal({
      show: true,
      users: enseignants,
      onClose,
      setEnseignant,
      enseignant
    })
  }
  const handleFilterSelection = () => {
    const onClose = () => {
      setModalSuiviFilters({ ...modalSuiviFilters, show: false });
    };
    const setPeriod = (periode) => {
      setPeriode(periode);
      setDate(null);
    }
    const setDat = (date) => {
      setDate(date);
      if (date = null) {
        setPeriode("YEAR")
      }

    }

    setModalSuiviFilters({
      show: true,
      onClose,
      setDat,
      setPeriod,
    })
  }

  const LabelUpdate = () => {
      if(periode == "YEAR"){
        const labels= ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]; 
        setLabels(labels);
      }
      if(periode == "MONTH"){
        const labels= ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4", "Semaine 5", "Semaine 6"];
        setLabels(labels);
      }
      if(periode == "WEEK"){
        const labels= ["Lundi", "Mardi", "Mercredi", "Jeudi", "Venredi", "Samedi", "Dimanche"];
        setLabels(labels);
      }
  }

  useEffect(() => {
    //fetch performances
    const fetchPerformances = async () => {
      const body = {
        "periode": periode,
        //"id_ens" : "60cca063b036b51e8d33013a"
        "id_ens": enseignant.id
      }
      const [res, error] = await queryApi("performance/summary", body, "POST");
      if (res) {
        console.log(res)
          setKeys(res.keys);
          setEnsRecordsCounted(res.ensRecordsCounted);
          setEvent(res.keys.rdi);
      }
    }
    if (enseignant && periode != "") {
      LabelUpdate();
      fetchPerformances();
    }
 
  }, [enseignant, periode, date])

  useEffect(()=>{
    if(event){
    const line = Line(labels,event);
    const bar = Bar(labels,event);
    const polar = Polar(event);
    const doughnut = Doughnut(event);
    setLine(line);
    setBar(bar);
    setPolar(polar);
    setDoughnut(doughnut);
    }
  },[event]);
  
  return (
    <>
      <ModalSelectEnseignant {...selectEnseignantModal} />
      <ModalSuiviFilters {...modalSuiviFilters} />
      <CRow>
        <CCol xs="12" sm="12" md="12" lg="12" xl="12">
          <CCard className="border-0 shadow-sm pb-1 card-backg">
            <CCardBody>
              <CRow>
                <CCol xs="12" sm="12" md="12" lg="12" xl="12">
                  <div className="suivi-card-info">
                    <div className="mr-4">
                      <div className="avatar-lg mr-4 mt-1">
                        <CImg
                          src={enseignant?.image ? enseignant?.image : avatar}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                      </div>
                    </div>
                    <div className="left-button">
                      <CButton className="bottons" onClick={handleEnseignantSelection}>
                        E
                      </CButton>
                      <CButton className="buttonstyle" onClick={handleEnseignantSelection}>
                        Changer enseignant
                      </CButton>
                    </div>
                    <div className="left-bot-button">
                      <CButton className="bottons" onClick={handleFilterSelection}>
                        F
                      </CButton>
                      <CButton className="buttonstyle" onClick={handleFilterSelection}>
                        Changer les filtres
                      </CButton>
                    </div>



                    <div className="suivi-card-body-info">
                      <div className="mb-2">
                        <h2 className="mt-1">{enseignant?.fullName}</h2>
                        <div className="d-inline-block">
                          <p>
                            <b>Grade:</b> Assistant Technologue
                          </p>
                        </div>
                      </div>
                      <div>
                        <b>Tel: </b>
                        <b>+216 52566912</b>
                      </div>
                      <div>
                        <b>E-mail: </b>
                        <b>{enseignant?.username}</b>
                      </div>
                    </div>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
            <ul className="list-group flex-md-row flex-md-wrap ul-suivi">
              <li className="li-suivi list-group-item col-lg-2 col-md-6 col-12 rounded-0  border-top li-backg" onClick={e => {setChart("rdi");setEvent(keys.rdi)}}>
                <CCallout color="danger d-inline-block mt-0">
                  <h6 className="mb-1">Production RDI</h6>
                  <strong className="h4 mb-0">{ensRecordsCounted?.rdi? ensRecordsCounted?.rdi : "0"}</strong>
                </CCallout>

              </li>
              <li className="li-suivi list-group-item col-lg-2 col-md-6 col-12 rounded-0 border-top" onClick={e => {setChart("reunion");setEvent(keys.reunion)}}>
                <CCallout color="danger d-inline-block mt-0">
                  <h6 className="mb-1">Réunions RDI</h6>
                  <strong className="h4 mb-0">{ensRecordsCounted?.reunion_rdi? ensRecordsCounted?.reunion_rdi : "0"}</strong>
                </CCallout>
              </li>
              <li className="li-suivi list-group-item col-lg-2 col-md-6 col-12 rounded-0 border-top" onClick={e => {setChart("encadrement");setEvent(keys.encadrement)}}>
                <CCallout color="danger d-inline-block mt-0">
                  <h6 className="mb-1">Encadrements</h6>
                  <strong className="h4 mb-0">{ensRecordsCounted?.encadrement? ensRecordsCounted?.encadrement : "0"}</strong>
                </CCallout>
              </li>

              <li className="li-suivi list-group-item col-lg-2 col-md-6 col-12 rounded-0 border-top" onClick={e => {setChart("formation");setEvent(keys.formation)}}>
                <CCallout color="danger d-inline-block mt-0">
                  <h6 className="mb-1">Formations</h6>
                  <strong className="h4 mb-0">{ensRecordsCounted?.formation? ensRecordsCounted?.formation: "0"}</strong>
                </CCallout>
              </li>

              <li className="li-suivi list-group-item col-lg-2 col-md-6 col-12 rounded-0 border-top" onClick={e => {setChart("service");setEvent(keys.service)}}>
                <CCallout color="danger d-inline-block mt-0">
                  <h6 className="mb-1">Services</h6>
                  <strong className="h4 mb-0">{ensRecordsCounted?.service? ensRecordsCounted?.service : "0"}</strong>
                </CCallout>
              </li>

              <li className="li-suivi list-group-item col-lg-2 col-md-6 col-12 rounded-0 border-top" onClick={e => {setChart("interventions");setEvent(ensRecordsCounted.intervention)}}>
                <CCallout color="danger d-inline-block mt-0">
                  <h6 className="mb-1">Interventions</h6>
                  <strong className="h4 mb-0">{ensRecordsCounted?.interventions? ensRecordsCounted?.interventions : "0"}</strong>
                </CCallout>
              </li>
            </ul>
          </CCard>
        </CCol>
      </CRow>

      <CRow>
        <CCol xs="12" sm="12" md="12" lg="12" xl="12">
          <CCard className="mb-5 shadow-sm border-0 p-1">
            <CCardBody>
              <CRow>
                {chart === "interventions" ? (
                  <>
                    <CCol md="12" xs="12" lg="6" xl="6">
                      <h4 className="mb-5">{chart.toUpperCase()}</h4>
                      <div className="chart-wrapper chart-card">
                        <CChartDoughnut
                          datasets={doughnut.datasets}
                          labels={doughnut.labels}
                          className="chart-card"
                        />
                      </div>
                      <hr />
                    </CCol>
                    <CCol md="12" xs="12" lg="6" xl="6">
                      <h4 className="mb-5"><br /></h4>
                      <div className="chart-wrapper chart-card">
                        <CChartPolarArea
                          datasets={polar.datasets}
                          options={{
                            maintainAspectRatio: true,
                            tooltips: {
                              enabled: true,
                            },
                          }}
                          labels={polar.labels}
                          className=""
                        />
                      </div>
                      <hr />
                    </CCol>
                  </>
                ) : (
                  <>
                    <CCol md="12" xs="12" lg="6" xl="6">
                      <h4 className="mb-5">{chart.toUpperCase()}</h4>
                      <div className="chart-wrapper">
                        <CChartLine
                          datasets={line.datasets}
                          options={options}
                          className="chart-card"
                        />
                      </div>
                      <hr />
                    </CCol>
                    <CCol md="12" xs="12" lg="6" xl="6">
                      <h4 className="mb-5"><br /></h4>
                      <div className="chart-wrapper">
                        <CChartBar
                          datasets={bar.datasets}
                          options={options}
                          labels={labels}
                          className="chart-card"
                        />
                      </div>
                      <hr />
                    </CCol>
                  </>
                )}
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default ShowSuivi;
