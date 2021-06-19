import React, { useEffect } from "react";
import Icon from '@material-ui/core/Icon';

const SuccessErrorModal = (props) => {

    const {type,show,onClose,message} = props;

    const closeOnEspaceKeyDown = (e) => {
        if ((e.charCode || e.keyCode === 27)) {
            onClose();
        }
    }
    useEffect(() => {
        document.body.addEventListener('keydown', closeOnEspaceKeyDown);
        return () => {
            document.body.removeEventListener('keydown',closeOnEspaceKeyDown);
        }
    }, [])

    return (
    <div className={`modal ${type === 'success' ? 'success': 'error'} ${show? 'show':''} `} onClick={onClose}>
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header" onClick={e => e.stopPropagation()}>
            <div className="icon-box">
            <Icon color="primary">add_circle</Icon>
            </div>
            <h4 className="modal-title w-100">{type === "success" ? 'Succès!': 'Pardon!' }</h4>
          </div>
          <div className="modal-body">
            <p className="text-center">
                {message}
            </p>
          </div>
          <div className="modal-footer">
            <button className={type === 'success' ? 'btn btn-success btn-block': 'btn btn-danger btn-block' } onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessErrorModal;