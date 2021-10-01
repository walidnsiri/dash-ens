import React, { useState, useEffect, useContext } from "react";
import {
  CLink,
  CFormGroup,
  CLabel,
  CSelect,
  CCol
} from "@coreui/react";
import { CImg } from "@coreui/react";
import avatar from "../../../assets/img/avatars/6.jpg";
//import cup from "../../../assets/img/GoldTrophy.png"
import { queryApi } from "../../../utils/queryApi";
import { fetchImageFromService } from "../../../utils/getImage";
import { UserContext } from "../../../utils/UserContext";
import { userRoles } from "../../../enums/roles.enum";
import { hasRole, getUserIds } from "../../../utils/user";
import { useSelector } from 'react-redux'
import { selectGroupUP } from '../../../features/groupSlice';

const ShowRevue = () => {
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
        if(users){
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
  }, [user,groupUp]);



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
        if (perfs) setTopPerformers(perfs);
      }
      if (error) {
        console.error(error);
        setTopPerformers([]);
      }
    }
    fetchTopPerformers();

  }, [navigation, ids])

  const handleClick = (e) => {
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
              <CCol xl ="3" lg="3" xxl="3" md="12" sm="12" xs="12">
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
                      {topPerformers[1] &&
                        <div className="scoreboard__podium js-podium is-visible bump" data-height="200px">
                          <div className="scoreboard__podium-base scoreboard__podium-base--second is-expanding heightscale-second">
                            <div className="scoreboard__podium-rank">2</div>
                          </div>
                          <div className="scoreboard__podium-number">
                            {topPerformers[1].fullName}
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
                            {topPerformers[0].fullName}
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
                            {topPerformers[2].fullName}
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
                  {
                    index > 2 &&
                    <figure className="single-enseignant">
                      <CImg
                        width="40"
                        height="40"
                        src={performer[index].image}
                        className=""
                        alt="admin@bootstrapmaster.com"
                      />
                      <figcaption className="single-enseignant-info">
                        <h4 className="info-name">{performer[index].fullName}</h4>
                        <h5 className="info-grade">Assistant Technologue</h5>
                        <div className="info-scores">
                          <span className="info-single-score">F {performer[index].formation}</span>
                          <span className="info-single-score">S {performer[index].service}</span>
                          <span className="info-single-score">I {performer[index].interventions}</span>
                          <span className="info-single-score">R {performer[index].rdi + performer[index].reunion_rdi}</span>
                          <span className="info-single-score">E {performer[index].encadrement}</span>
                          <span className="info-single-score info-single-score-total">
                            T {performer[index].totalCount} S {performer[index].score}
                          </span>
                        </div>
                      </figcaption>
                    </figure>
                  }
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
    </>
  );
};

export default ShowRevue;