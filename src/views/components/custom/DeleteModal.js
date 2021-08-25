import React, { useEffect } from "react";
import CloseIcon from "@material-ui/icons/Close";

const DeleteModal = (props) => {
  const { show, onClose, message, onConfirm } = props;

  useEffect(() => {
    const closeOnEspaceKeyDown = (e) => {
      if (e.charCode || e.keyCode === 27) {
        onClose();
      }
    };
    document.body.addEventListener("keydown", closeOnEspaceKeyDown);
    return () => {
      document.body.removeEventListener("keydown", closeOnEspaceKeyDown);
    };
  }, [onClose]);

  return (
    <div className={`modal delete ${show ? "show" : ""}`} onClick={onClose}>
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div
            className="modal-header flex-column"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="icon-box">
              <CloseIcon
                style={{ fontSize: 60, color: "#f15e5e", marginTop: "8%" }}
              />
            </div>
            <h4 className="modal-title w-100">êtes-vous sure?</h4>
            <button
              type="button"
              className="close"
              aria-hidden="true"
              onClick={onClose}
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p className="text-center">{message}</p>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onConfirm}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
