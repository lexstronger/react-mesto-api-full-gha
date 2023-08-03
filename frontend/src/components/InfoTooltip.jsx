import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip({ isOpen, onClose, onOverlayClose, isRegister, alt}) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={onOverlayClose}
    >
      <div className="popup__container popup__response">
        <button
          className="popup__cross"
          type="button"
          aria-label="Закрыть попап"
          onClick={onClose}
        />
        <img className="popup__icon" src={isRegister.status ? success : fail} alt={alt}/>
        <h3 className="popup__heading popup__heading-info">
          {isRegister.message}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;