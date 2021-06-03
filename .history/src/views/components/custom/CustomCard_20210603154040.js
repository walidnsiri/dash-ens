import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import noimage from "../../assets/img/noimage.png";
import hoss from "../../../assets/img/hoss.jpg";
import noimg from "../../../assets/img/noimage.png";
import equipe from "../../../assets/img/partenaire.jpg";
import { CImg } from "@coreui/react";
import avatar from "../../../assets/img/avatars/6.jpg";
const CustomCard = (props) => {
  const { className, type } = props;

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
          <div className="product-image">
            <figure>
              <img src={equipe} alt="card img" className="product-image" />
            </figure>
          </div>
          { type === "production" &&
            <>
          <div className="product-description">
            <h1>Equipe RDI</h1>
            <div className="info"> 
              <p>
                <b>Description:</b> <br />
                Lancement Projet
              </p>
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
            <div className="dates">
              <p><b>Heure:</b>
              <br />
              <div className="heure">
                <span>10</span>
                <span>11</span>
              </div>
              </p>
              <p>
              <b>Date:</b>
              <div className="date">12-12-2021</div>
              </p>
            </div>

          </div>
            </>
          }
          { type === "reunion" &&
            <>
            <div className="product-description">
            <div className="info"> 
            <h1>Article scientifique</h1>
              <p>
                <b>Description:</b> <br />
                description production
              </p>
              <p>
              <p>
                <b>Ref Production:</b> <br />
                Classement 1
              </p>
                
              </p>
            </div>
            <div className="dates">
              <p>
              <b>Date:</b>
              <div className="date">12-12-2021</div>
              </p>
              <b>Crée par:</b> <br />
                <div className="c-avatar">
                  <CImg
                    src={avatar}
                    className="c-avatar-img"
                    alt="admin@bootstrapmaster.com"
                  />
                </div>
            </div>
          </div>
            </>
          }
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

/*<div className="col col-lg-4 col-md-6 col-sm-12 col-xs-12 mt-4">
        <div className={`card ${className}`}>
          <div className="card-img-block">
            <img className="card-img-top" src={hoss} alt="Card cap"></img>
          </div>
          <div className="card-body pt-0">
            <h5 className="card-title">Houssem Zoghlami</h5>
            <p className="card-text">
              Ajouté le vendredi, <b>7 août 2020 à 12:00</b>
            </p>
            <p className="card-text">
              Modifier le samedi, <b>5 septembre 2020 à 08:20</b>
            </p>
          </div>
          <div className="icon-block text-center">
            <Link to="/users/1">
              <i className="fa fa-info-circle"></i>
            </Link>
            <Link to="/user/update/1">
              {" "}
              <i className="fa fa-pencil"></i>
            </Link>
            <Link to="#">
              {" "}
              <i className="fa fa-trash"></i>
            </Link>
          </div>
        </div>
      </div>*/
