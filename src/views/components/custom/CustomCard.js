import React, { useState } from "react";
import PropTypes from "prop-types";
import { CImg } from "@coreui/react";
import avatar from "../../../assets/img/avatars/6.jpg";
import { GetImage } from "utils/getImage";
import { productionEnum } from "enums/production.enum";
import { reunionEnum } from "enums/reunion.enum";
import { descriptionEnum } from "enums/description.enum";
import { queryApi } from "../../../utils/queryApi";
import DeleteModal from "../../components/custom/DeleteModal";
// import images
import research_thesis from "../../../assets/img/research_thesis.jpg";
import projet_innovant from "../../../assets/img/projet_innovant2.jpg";
import scientific_paper from "../../../assets/img/scientific_paper.png";
import article from "../../../assets/img/article.jpg";
import team from "../../../assets/img/equipe.jpg";
import partenaire from "../../../assets/img/partenaire.jpg";
import drdi from "../../../assets/img/drdi.JPG";
import { useHistory } from "react-router-dom";



const CustomCard = (props) => {
  const history = useHistory();
  const { type, rdi, setdeleteRerender, page, setCurrentPage, setModal, reunion } = props;
  const [deleteModal, setdeleteModal] = useState({ show: false, message: "" });

  const GetImage = function (production) {


    if (production === productionEnum.Article_de_recherche) {
      return article;
    }
    if (production === productionEnum.papier_scientifique) {
      return scientific_paper;
    }
    if (production === productionEnum.these_de_recherche) {
      return research_thesis;
    }
    if (production === productionEnum.developpement_projet_innovant) {
      return projet_innovant;
    }

  }

  const GetImageReunion = function (titre) {
    if (titre === reunionEnum.DRDI) {
      return drdi;
    }
    if (titre === reunionEnum.Partenaire) {
      return partenaire;
    }
    if (titre === reunionEnum.Equipe_rdi) {
      return team;
    }
  }
  function handleEdit() {
    if (type === "production") {
      history.push({
        pathname: '/productionRdi/edit',
        state: {  // location state
          rdi: rdi,
        },
      });
    }
    else {
      history.push({
        pathname: '/reunionRdi/edit',
        state: {  // location state
          reunion: reunion,
        },
      });
    }
  }

  async function handleDelete() {
    if(type === "production") {
    const onClose = () => {
      setdeleteModal({ ...deleteModal, show: false });
    };
    const onConfirm = async () => {
      const [res, error] = await queryApi("rdi/" + rdi.id, null, "DELETE");
      if (res) {
        onClose();
        setModal({
          show: true,
          message: "La production rdi a été supprimé avec succès",
          type: "success",
        });
        if (page) {
          if (page.count === 1) {
            setCurrentPage(page.totalpages - 1)
          }
          else {
            setdeleteRerender(true);
          }
        }
      }
      if (error) {
        onClose();
        setModal({ show: true, message: error.details, type: "error" });
      }
    };


    setdeleteModal({
      show: true,
      message:
        `Voulez-vous vraiment supprimer cette production rdi?`,
      onClose,
      onConfirm,
    });
  }else {
    const onClose = () => {
      setdeleteModal({ ...deleteModal, show: false });
    };
    const onConfirm = async () => {
      const [res, error] = await queryApi("rdi/reunion/" + reunion.id, null, "DELETE");
      if (res) {
        onClose();
        setModal({
          show: true,
          message: "La réunion rdi a été supprimé avec succès",
          type: "success",
        });
        if (page) {
          if (page.count === 1) {
            setCurrentPage(page.totalpages - 1)
          }
          else {
            setdeleteRerender(true);
          }
        }
      }
      if (error) {
        onClose();
        setModal({ show: true, message: error.details, type: "error" });
      }
    };


    setdeleteModal({
      show: true,
      message:
        `Voulez-vous vraiment supprimer cette réunion rdi?`,
      onClose,
      onConfirm,
    });

  }
  }

  // render
  return (
    <>
      <DeleteModal {...deleteModal} />
      <main role="main">
        <div className="product" style={{boxShadow: reunion?.status == "Confirme" ? "10px 10px 10px 10px rgba(231, 76, 60, 0.2)":"0 3px 5px rgba(105, 41, 41, 0.2)"}}>
          <div className="product-sidebar">
            <button className="edit" onClick={() => handleEdit()}>
              <span>Modifier</span>
            </button>
            <button className="delete" onClick={() => handleDelete()}>
              <span>Supprimer</span>
            </button>
          </div>

          {type === "reunion" && (
            <>
              <div className="product-image">
                <figure>
                  <img src={GetImageReunion(reunion?.titre)} alt="card img" className="product-image" />
                </figure>
              </div>
              <div className="product-description">
                <div className="info">
                  <h1>{reunion?.titre}</h1>
                  <p>
                    <b>Description:</b> <br />
                    {reunion?.description}
                  </p>
                  <div>
                    <div>
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
                </div>
                <div className="reunion-right-card">
                  <div className="date_div">
                    <b>Date:</b>
                    <div className="date">{reunion?.date_reunion}</div>
                  </div>
                  <div>
                    <b>Heure:</b>
                    <br />
                    <div className="heure">
                      <span>{reunion?.heure_deb}</span>
                      <span>{reunion?.heure_fin}</span>
                    </div>
                  </div>
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