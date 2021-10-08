import React, { useEffect } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";

const SuccessErrorModal = (props) => {
  const { type, show, onClose, message } = props;

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
    <div
      className={`modal ${type === "success" ? "success" : "error"} ${
        show ? "show" : ""
      } `}
      onClick={onClose}
      style={{"zIndex":"2"}}
    >
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header" onClick={(e) => e.stopPropagation()}>
            <div className="icon-box">
              {type === "success" ? (
                <DoneIcon style={{ fontSize: 60 }} />
              ) : (
                <ClearIcon style={{ fontSize: 60 }} />
              )}
            </div>
            <h4 className="modal-title w-100">
              {type === "success" ? "Succès!" : "Pardon!"}
            </h4>
          </div>
          <div className="modal-body">
            <p className="text-center">
              {message && typeof message === "object"
                ? message.map((msg) => <div>{msg}</div>)
                : message}
              {type === "error" && "Veuillez revenir en arrière et réessayer"}
            </p>
          </div>
          <div className="modal-footer">
            <button
              className={
                type === "success"
                  ? "btn btn-success btn-block"
                  : "btn btn-danger btn-block"
              }
              onClick={onClose}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessErrorModal;
