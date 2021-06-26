import React, { useEffect } from "react";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const DeleteModal = (props) => {

    const {show,onClose,message,onConfirm} = props;

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
    <div className={`modal delete ${show? 'show':''}`} onClick={onClose}>
      <div className="modal-dialog modal-confirm">
        <div className="modal-content">
          <div className="modal-header flex-column" onClick={e => e.stopPropagation()}>
            <div className="icon-box">
            <CancelOutlinedIcon style={{ fontSize: 60 }}/>
            </div>
            <h4 className="modal-title w-100">êtes-vous sure?</h4>
            <button type="button" class="close" aria-hidden="true" onClick={onClose}>&times;</button>
          </div>
          <div className="modal-body">
            <p className="text-center">
                {message}
            </p>
          </div>
          <div className="modal-footer justify-content-center"> 
            <button type="button" class="btn btn-secondary"  onClick={onClose}>Cancel</button>
			<button type="button" class="btn btn-danger"  onClick={onConfirm} >Supprimer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;