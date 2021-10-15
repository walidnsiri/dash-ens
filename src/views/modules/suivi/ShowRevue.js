import React, { useState, useEffect, useContext,useRef } from "react";
import {
  CLink,
  CFormGroup,
  CLabel,
  CSelect,
  CCol,
  CAlert,
  CRow,
  CCallout
} from "@coreui/react";
import { CImg } from "@coreui/react";
import avatar from "../../../assets/img/avatars/6.jpg";
import particles from "../../../assets/img/particles.png"
import cup from "../../../assets/img/goldcup.png";
import { queryApi } from "../../../utils/queryApi";
import { fetchImageFromService } from "../../../utils/getImage";
import { UserContext } from "../../../utils/UserContext";
import { userRoles } from "../../../enums/roles.enum";
import { hasRole, getUserIds } from "../../../utils/user";
import { useSelector } from 'react-redux'
import { selectGroupUP } from '../../../features/groupSlice';
import { LoaderSmallArea } from "../../../views/components/custom/Loaders";
import { trackPromise } from 'react-promise-tracker';
import { areas } from "../../../constants/areas";
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import Deck from "../../components/custom/deck";
import Confetti from "react-confetti";
// Little helpers ...
const url = (name, wrap = false) =>
  `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`


const ShowRevue = () => {
  const parallax = useRef(null);
  const [user,] = useContext(UserContext)
  const [topPerformers, setTopPerformers] = useState([]);
  const [navigation, setNavigation] = useState("WEEK");
  const groupUp = useSelector(selectGroupUP);
  const [typeEns, SetTypeEns] = useState("");
  const [ids, setIds] = useState("");
  const [ups, setUps] = useState([]);
  const [up, setUp] = useState("");

  useEffect(() => {
    if (!hasRole(user, userRoles.DSI)) {
      SetTypeEns("ens");
      if (groupUp) {
        let users = groupUp.users;
        if (users) {
          let ids = getUserIds(groupUp.users);
          setIds(ids);
        }

      }
    } else {
      if (groupUp) {
        let ups = []
        groupUp.map((grp, index) => {
          ups.push(grp.up);
        })
        setUps(ups);
      }
    }
  }, [user, groupUp]);



  const fetchimg = async (im) => {
    const img = await fetchImageFromService(im);
    if (img) return img;
  };
  const fetchUser = async (id, index, perfs) => {
    const [res, error] = await queryApi("user/" + id);
    if (res) {
      const img = await fetchimg(res.image);
      perfs[index] = { ...perfs[index], "fullName": res.fullName, "image": img };
      return perfs;
    }
  }

  useEffect(() => {
    const fetchTopPerformers = async () => {
      let body = {
        periode: navigation,
      };
      if (ids.length > 0) {
        body = { ...body, ids: ids }
      }
      const [res, error] = await queryApi("performance/performers", body, "POST");
      if (res) {
        let perfs = res;
        await Promise.all(perfs.map(async (perf, index) => {
          perfs = await fetchUser(perf.userId, index, perfs);
        }));
        console.log(perfs)
        if (perfs) setTopPerformers(perfs);
      }
      if (error) {
        console.error(error);
        setTopPerformers([]);
      }
    }
    trackPromise(fetchTopPerformers(), areas.top_three_performers);

  }, [navigation, ids])

  const handleClick = (e) => {
    setTopPerformers([]);
    if (e.target.innerText == "PRÉC") {
      if (navigation == "WEEK") {
        setNavigation("MONTH");
      }
      if (navigation == "MONTH") {
        setNavigation("YEAR");
      }
    }
    if (e.target.innerText == "SUIV") {
      if (navigation == "MONTH") {
        setNavigation("WEEK");
      }
      if (navigation == "YEAR") {
        setNavigation("MONTH");
      }
    }
  }

  const handleUpChange = (e) => {
    let up = e.target.value;
    if (up == "all") {
      setIds([]);
    }
    else {
      if (groupUp) {
        let groupWithSelectedUp = groupUp.filter((g) => g.up == up);
        console.log(groupWithSelectedUp)
        let ids = getUserIds(groupWithSelectedUp[0].users);
        setIds(ids);
      }
    }
    setUp(e.target.value)
  }

  return (
    <>
     <div style={{ width: '100%', height: '100%' }}>
    
     <Parallax ref={parallax} pages={2} style={{height:"100%",width:'100%',position:'relative'}}>
        <ParallaxLayer offset={1} speed={1}  />

        <ParallaxLayer
          offset={0}
          speed={0}
          factor={2}
          style={{
            backgroundImage: url('stars', true),
            backgroundSize: 'cover',
          }}
        />
        <ParallaxLayer offset={0.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
          <img src={cup} style={{ width: '15%', marginLeft: '5%' }} />
        </ParallaxLayer>


        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={0.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} />
        </ParallaxLayer>

        <ParallaxLayer offset={0.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} />
        </ParallaxLayer>



        <ParallaxLayer
          offset={1}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: 'flow-root',
            alignItems: 'center',
            justifyContent: 'center',
            position : 'absolute',
            top: '0'
          }}>
                  <div className="performance-section">
        <div className="performance-container">
            <div className="performance-wrapper">
            <h1 className="title">Trophées</h1>
            <CRow>
                    <CCol sm="4">
                      <CCallout color="success">
                        <small className="text-muted">Meilleur Performance de l'année</small>
                        <br />
                        <strong className="h4">Walid Nsiri</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="4">
                      <CCallout color="danger">
                        <small className="text-muted">Meilleur Performance du mois</small>
                        <br />
                        <strong className="h4">Aziz Daboussi</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="4">
                      <CCallout color="info">
                        <small className="text-muted">Meilleur Performance de la semaine</small>
                        <br />
                        <strong className="h4">Mohamed hadj aissa</strong>
                      </CCallout>
                    </CCol>
                  </CRow>
            <Deck style={{position:'absolute',left:'50%',top:'5%'}}/>
            </div>
            </div>
            </div>
            
          {/*<img src={url('bash')} style={{ width: '40%' }} />*/}
        </ParallaxLayer>


      <ParallaxLayer offset={0}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(0)}
          style={{
            display: 'flow-root',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
      <nav className="thmbnail-nav">
        {navigation !== "YEAR" &&
          <CLink to="" className="thumbnail-nav__link prev cust-btn" value="prec" onClick={e => handleClick(e)}>
            <span className="thumbnail-nav__label prev">Préc</span>
          </CLink>
        }
        {navigation !== "WEEK" &&
          <CLink to="" className="thumbnail-nav__link next cust-btn" value="suiv" onClick={e => handleClick(e)}>
            <span className="thumbnail-nav__label next">Suiv</span>
          </CLink>
        }
      </nav>
      <div className="performance-section">
        <div className="performance-container">
          <div className="performance-wrapper">
            <h1 className="title">Meilleur Performance {navigation == "WEEK" && "de la semaine"}{navigation == "MONTH" && "du mois"}{navigation == "YEAR" && "de l'année"}</h1>
            {typeEns == "" &&
              <CCol xl="3" lg="3" xxl="3" md="12" sm="12" xs="12">
                <CFormGroup>
                  <CSelect
                    custom
                    name="up"
                    id="select"
                    value={up}
                    onChange={e => handleUpChange(e)}
                  >
                    <option value="all">Tout</option>
                    {ups.map((key, val) => {
                      return <option value={key} key={key}>{key}</option>
                    })}
                  </CSelect>
                </CFormGroup>
              </CCol>
            }
            <div className="performance-top">
              <figure className="performance-thumbnail">
                <div className="performance-card">
                  <div className="scoreboard">
                    <div className="scoreboard__podiums">
                      {topPerformers.length == 0 &&
                       <>
                        <CRow>
                        <CCol sm="12" xl="12" xs="12" md="12" style={{ paddingTop: "4%" }}>
                        <LoaderSmallArea area={areas.top_three_performers} height={200} width={200} color="#fcf0db" />
                        </CCol>
                        <CCol sm="12" xl="12" xs="12" md="12" style={{ paddingTop: "4%" }}>
                          <CAlert color="warning" className="">
                            Pas de données disponibles.
                          </CAlert>
                        </CCol>
                        </CRow>
                        </>}
                      {topPerformers[1] &&
                        <div className="scoreboard__podium js-podium is-visible bump" data-height="200px">
                          <div className="scoreboard__podium-base scoreboard__podium-base--second is-expanding heightscale-second">
                            <div className="scoreboard__podium-rank">2</div>
                          </div>
                          <div className="scoreboard__podium-number">
                            <h5>{topPerformers[1].fullName}</h5>
                            <small><span className="js-podium-data">{topPerformers[1].totalCount}</span></small>
                          </div>
                        </div>
                      }
                      {topPerformers[0] &&
                        <div className="scoreboard__podium js-podium is-visible bump" data-height="250px">
                          <div className="scoreboard__podium-base scoreboard__podium-base--first is-expanding ">
                            <div className="scoreboard__podium-rank">1</div>
                          </div>
                          <div className="scoreboard__podium-number">
                            <h5>{topPerformers[0].fullName}</h5>
                            <small><span className="js-podium-data">{topPerformers[0].totalCount}</span></small>
                          </div>
                        </div>
                      }
                      {topPerformers[2] &&
                        <div className="scoreboard__podium js-podium is-visible bump" data-height="150px">
                          <div className="scoreboard__podium-base scoreboard__podium-base--third is-expanding ">
                            <div className="scoreboard__podium-rank">3</div>
                          </div>
                          <div className="scoreboard__podium-number">
                            <h5>{topPerformers[2].fullName}</h5>
                            <small><span className="js-podium-data">{topPerformers[2].totalCount}</span></small>
                          </div>
                        </div>
                      }
                    </div>


                  </div>
                </div>
              </figure>
              {topPerformers[0] &&
                <div className="performance-side">
                  <div className="performance-avatar">
                    <div className="medal-container">
                      <div className="medal icon--star"></div>

                      <div className="star-cluster">
                        <div className="icon--twinkle star-a"></div>
                        <div className="icon--twinkle delay-twinkle star-b"></div>
                        <div className="icon--twinkle star-c"></div>

                        <div className="icon--twinkle  star-d"></div>
                        <div className="icon--twinkle delay-twinkle star-e"></div>
                      </div>
                    </div>
                  </div>
                  <h3 className="performance-title">{topPerformers[0].fullName}</h3>
                  <h4 className="performance-subtitle">Assistant Technologue</h4>
                </div>
              }

              <div className="performance-desc mobile">
                <p>
                  <em>Mension Honorable</em><br />
                  {topPerformers.length < 2 &&
                    "Pas de mention honorable"
                  }
                </p>
              </div>
            </div>
            <div className="performance-scores">
              <div className="performance-scores-top">

                <div className="performance-desc">
                  <p>
                    <em>Mension Honorable</em><br></br>
                    {topPerformers.length < 2 &&
                      "Pas de mention honorable"
                    }
                  </p>
                </div>
              </div>
              <div className="performance-enseignant">
                {topPerformers?.map((performer, index) => {
                  return (<>
                    {index > 2 && 
                       <figure className="single-enseignant">
                        <CImg
                          width="40"
                          height="40"
                          src={performer?.image? performer?.image : avatar}
                          className=""
                          alt="admin@bootstrapmaster.com"
                        />
                        <figcaption className="single-enseignant-info">
                          <h4 className="info-name">{performer?.fullName}</h4>
                          <h5 className="info-grade">Assistant Technologue</h5>
                          <div className="info-scores">
                            <span className="info-single-score">F: {performer?.formation}</span>
                            <span className="info-single-score">S: {performer?.service}</span>
                            <span className="info-single-score">I: {performer?.interventions}</span>
                            <span className="info-single-score">R: {performer?.rdi + performer?.reunion_rdi}</span>
                            <span className="info-single-score">E: {performer?.encadrement}</span>
                            <span className="info-single-score info-single-score-total">
                              Score: {Number.parseFloat(performer?.score).toPrecision(4)}
                            </span>
                          </div>
                        </figcaption>
                      </figure>}
                  </>)
                })}
              </div>
              {topPerformers[0] &&
                <div className="performance-scores-bottom">
                  <ul className="score_list completed">
                    <li className="score-item">
                      <div></div>
                      <div className="score-caption">
                        <div className="score-title">Encadrements</div>
                        <div className="score-score">
                          <strong>{topPerformers[0].encadrement}</strong>
                        </div>
                      </div>
                    </li>
                    <li className="score-item">
                      <div></div>
                      <div className="score-caption">
                        <div className="score-title">Interventions</div>
                        <div className="score-score">
                          <strong>{topPerformers[0].interventions}</strong>
                        </div>
                      </div>
                    </li>
                    <li className="score-item">
                      <div></div>
                      <div className="score-caption">
                        <div className="score-title">Rdi</div>
                        <div className="score-score">
                          <strong>{topPerformers[0].rdi + topPerformers[0].reunion_rdi}</strong>
                        </div>
                      </div>
                    </li>
                    <li className="score-item">
                      <div></div>
                      <div className="score-caption">
                        <div className="score-title">Formations</div>
                        <div className="score-score">
                          <strong>{topPerformers[0].formation}</strong>
                        </div>
                      </div>
                    </li>
                    <li className="score-item">
                      <div></div>
                      <div className="score-caption">
                        <div className="score-title">Services</div>
                        <div className="score-score">
                          <strong>{topPerformers[0].service}</strong>
                        </div>
                      </div>
                    </li>



                    <li className="score-item score-item-total">
                      <div className="score-summary">
                        <span>{Number.parseFloat(topPerformers[0].score).toPrecision(4)}</span>
                      </div>
                      <div className="total-caption">
                        <div className="total-cat">
                          SCORE
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      </ParallaxLayer>
      </Parallax>
      </div>
    </>
  );
};

export default ShowRevue;