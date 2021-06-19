import React, { cloneElement } from "react";

const SuccessErrorModal = (props) => {
    const {type,message} = props;
  return (
    <div id="myModal" class="modal fade">
      <div class="modal-dialog modal-confirm">
        <div class="modal-content">
          <div class="modal-header">
            <div class="icon-box">
              <i class="material-icons">{type === "success" ? '&#xE876;': '&#xE5CD;' }</i>
            </div>
            <h4 class="modal-title w-100">{type === "success" ? 'Succès!': 'Pardon!' }</h4>
          </div>
          <div class="modal-body">
            <p class="text-center">
                {type === 'success'? 
                message ? message : "L'opération est terminée avec succès" :
                message ? message : "L'opération a échoué. Veuillez revenir en arrière et réessayer."
            }
              
            </p>
          </div>
          <div class="modal-footer">
            <button class={type === "success" ? 'btn btn-success btn-block': 'btn btn-danger btn-block' } data-dismiss="modal">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessErrorModal;



<div id="myModal" class="modal fade">
	<div class="modal-dialog modal-confirm">
		<div class="modal-content">
			<div class="modal-header">
				<div class="icon-box">
					<i class="material-icons">&#xE5CD;</i>
				</div>				
				<h4 class="modal-title w-100">Pardon!</h4>	
			</div>
			<div class="modal-body">
				<p class="text-center">Your transaction has failed. Please go back and try again.</p>
			</div>
			<div class="modal-footer">
				<button class="btn btn-danger btn-block" data-dismiss="modal">OK</button>
			</div>
		</div>
	</div>
</div> 