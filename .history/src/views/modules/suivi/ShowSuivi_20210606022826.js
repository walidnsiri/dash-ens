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
  CCallout,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  CChart,
  CChartDoughnut,
  CChartPolarArea,
  CChartLine,
  CChartBar,
} from "@coreui/react-chartjs";
import { CImg } from "@coreui/react";
import avatar from "../../../assets/img/avatars/6.jpg";
const options = {
  // tooltips: {
  //   enabled: false,
  //   custom: customTooltips
  // },
  maintainAspectRatio: false,
};
const line = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "2020",
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
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: "2021",
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
      data: [12, 50, 86, 91, 21, 75, 30],
    },
  ],
};

const bar = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "2021",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const doughnut = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};
const polar = {
  datasets: [
    {
      data: [11, 16, 7, 3, 14],
      backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56", "#E7E9ED", "#36A2EB"],
      label: "My dataset", // for legend
    },
  ],
  labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
};
const ShowSuivi = () => {
  const [chart, setchar] = useState("rdi");

  return (
    <>
      <CRow>
        <CCol xs="12" sm="12" md="12" lg="12" xl="12">
          <CCard className="border-0 shadow-sm pb-1">
            <CCardBody>
              <CRow>
                <CCol xs="12" sm="12" md="12" lg="12" xl="12">
                  <div className="suivi-card-info">
                    <div className="mr-4">
                      <div className="avatar-lg mr-4 mt-1">
                        <CImg
                          src={avatar}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                      </div>
                    </div>
                    <div className="left-button">
                      <CButton className="bottons">
                        <span>+</span>
                      </CButton>
                      <CButton className="buttonstyle">
                          changer enseignant
                      </CButton>
                    </div>
                    <div className="suivi-card-body-info">
                      <div className="mb-2">
                        <h2 className="mt-1">Firas matoussi</h2>
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
                        <b>user@esprit.tn</b>
                      </div>
                    </div>
                  </div>
                </CCol>
              </CRow>
            </CCardBody>
            <ul className="list-group flex-md-row flex-md-wrap ul-suivi">
              <li className="li-suivi list-group-item col-lg-2 col-md-6 col-12 rounded-0  border-top">
                <CCallout color="danger d-inline-block mt-0">
                  <h6 className="mb-1">Rdis</h6>
                  <strong className="h4 mb-0">12</strong>
                </CCallout>
                
              </li>
              <li className="li-suivi list-group-item col-lg-2 col-md-6 col-12 rounded-0 border-top">
                <CCallout color="danger d-inline-block mt-0">
                  <h6 className="mb-1">Cong??s</h6>
                  <strong className="h4 mb-0">7</strong>
                </CCallout>
              </li>
              <li className="li-suivi list-group-item col-lg-2 col-md-6 col-12 rounded-0 border-top">
                <CCallout color="danger d-inline-block mt-0">
                  <h6 className="mb-1">Encadrements</h6>
                  <strong className="h4 mb-0">2</strong>
                </CCallout>
              </li>

              <li className="li-suivi list-group-item col-lg-2 col-md-6 col-12 rounded-0 border-top">
                <CCallout color="danger d-inline-block mt-0">
                  <h6 className="mb-1">Formations</h6>
                  <strong className="h4 mb-0">8</strong>
                </CCallout>
              </li>

              <li className="li-suivi list-group-item col-lg-2 col-md-6 col-12 rounded-0 border-top">
                <CCallout color="danger d-inline-block mt-0">
                  <h6 className="mb-1">Services</h6>
                  <strong className="h4 mb-0">8</strong>
                </CCallout>
              </li>

              <li className="li-suivi list-group-item col-lg-2 col-md-6 col-12 rounded-0 border-top">
                <CCallout color="danger d-inline-block mt-0">
                  <h6 className="mb-1">Interventions</h6>
                  <strong className="h4 mb-0">50</strong>
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
                      <h4 className="mb-5">Doughnut</h4>
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
                      <h4 className="mb-5">Polar</h4>
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
                      <h4 className="mb-5">Line</h4>
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
                      <h4 className="mb-5">Bar</h4>
                      <div className="chart-wrapper">
                        <CChartBar
                          datasets={bar.datasets}
                          options={options}
                          labels="months"
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
