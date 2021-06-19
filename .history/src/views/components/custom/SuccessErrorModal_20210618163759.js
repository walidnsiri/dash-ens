import React, { useEffect } from "react";

const SuccessErrorModal = (props) => {
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
    const {type,show,onClose,children} = props;
    if(!show) return null;
    return (
    <div class={type === "success" ? 'modal fade success': 'modal fade error' } onClick={onClose}>
      <div class="modal-dialog modal-confirm">
        <div class="modal-content">
          <div class="modal-header" onClick={e => e.stopPropagation()}>
            <div class="icon-box">
              <i class="material-icons">{type === "success" ? '&#xE876;': '&#xE5CD;' }</i>
            </div>
            <h4 class="modal-title w-100">{type === "success" ? 'Succès!': 'Pardon!' }</h4>
          </div>
          <div class="modal-body">
            <p class="text-center">
                {children}
            </p>
          </div>
          <div class="modal-footer">
            <button class={type === "success" ? 'btn btn-success btn-block': 'btn btn-danger btn-block' } onClick={onClose}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessErrorModal;