import React from "react";
import PropTypes from "prop-types";
import { CImg } from "@coreui/react";
import avatar from "../../../assets/img/avatars/6.jpg";
import { GetImage } from "utils/getImage";
import { productionEnum } from "enums/production.enum";

// import images
import research_thesis from "../../../assets/img/research_thesis.jpg";
import projet_innovant from "../../../assets/img/projet_innovant2.jpg";
import scientific_paper from "../../../assets/img/scientific_paper.png";
import article from "../../../assets/img/article.jpg";



const CustomCard = (props) => {

  const { type, rdi } = props;

  const GetImage = function (production) {
  

    if(production === productionEnum.Article_de_recherche) {
      return article;
    }
    if(production === productionEnum.papier_scientifique) {
      return scientific_paper;
    }
    if (production === productionEnum.these_de_recherche) {
      return research_thesis;
    }
    if (production === productionEnum.developpement_projet_innovant){
      return projet_innovant;
    }

  }

  // render
  return (
    <>
      <main role="main">
        <div className="product">
          <div className="product-sidebar">
            <button className="detail">
              <span>Détails</span>
            </button>
            <button className="edit">
              <span>Modifier</span>
            </button>
            <button className="delete">
              <span>Supprimer</span>
            </button>
          </div>

          {type === "reunion" && (
            <>
              <div className="product-image">
                <figure>
                  <img src={research_thesis} alt="card img" className="product-image" />
                </figure>
              </div>
              <div className="product-description">
                <div className="info">
                  <h1>Equipe RDI</h1>
                  <p>
                    <b>Description:</b> <br />
                    Lancement Projet
                  </p>
                  <div>
                    <p>
                      <b>Crée par:</b> <br />
                      <div className="c-avatar">
                        <CImg
                          src={avatar}
                          className="c-avatar-img"
                          alt="admin@bootstrapmaster.com"
                        />
                      </div>
                    </p>
                  </div>
                </div>
                <div className="reunion-right-card">
                  <p>
                    <b>Date:</b>
                    <div className="date">12-12-2021</div>
                  </p>
                  <p>
                    <b>Heure:</b>
                    <br />
                    <div className="heure">
                      <span>10</span>
                      <span>11</span>
                    </div>
                  </p>
                </div>
              </div>
            </>
          )}
          {type === "production" && (
            <>
              <div className="product-image">
                <figure>
                  <img src={GetImage(rdi.production)} alt="card img" className="product-image" />
                </figure>
              </div>
              <div className="product-description">
                <div className="info">
                  <h1>{rdi?.production}</h1>
                  <p>
                    <b>Description:</b> <br />
                    {rdi?.description}
                  </p>
                  <div>
                    <p>
                      <b>Ref Production:</b> <br />
                      {rdi?.refproduction_id}
                    </p>
                  </div>
                </div>
                <div className="production-right-card" >
                  <div className="date_div">
                    <b>Date:</b>
                    <div className="date">{rdi?.date_production}</div>
                  </div>
                  <div>
                    <b>Charge horaire:</b>
                    <div className="date">{rdi?.charge_h}</div>
                  </div>
                  {
                  /*<p>
                    <b>Crée par:</b> <br />
                    <div className="c-avatar">
                      <CImg
                        src={avatar}
                        className="c-avatar-img"
                        alt="admin@bootstrapmaster.com"
                      />
                    </div>
                  </p>
                  */}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
};

CustomCard.propTypes = {
  className: PropTypes.string,
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string,
  ]),
  addHeaderClasses: PropTypes.oneOfType([String, Array, Object]),
};

export default CustomCard;