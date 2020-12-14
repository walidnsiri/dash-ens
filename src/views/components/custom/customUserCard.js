import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import noimage from "../../assets/img/noimage.png";
import hoss from "../../../assets/img/hoss.jpg";

const CUserCard = (props) => {
  const { className } = props;

  // render
  return (
    <>
      <div className="col col-lg-4 col-md-6 col-sm-12 col-xs-12 mt-4">
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
      </div>
    </>
  );
};

CUserCard.propTypes = {
  className: PropTypes.string,
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string,
  ]),
  addHeaderClasses: PropTypes.oneOfType([String, Array, Object]),
};

export default CUserCard;
