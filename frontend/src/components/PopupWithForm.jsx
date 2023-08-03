import React from "react";

function PopupWithForm({name, isOpen, onOverlayClose, onClose, title, onSubmit, children, textButton,}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={onOverlayClose}
    >
      <div className="popup__container">
        <button
          className="popup__cross"
          type="button"
          aria-label="Закрыть попап"
          onClick={onClose}
        />
        <h3 className="popup__heading">{title}</h3>
        <form className="popup__form" name={`${name}`} onSubmit={onSubmit}>
          {children}
          <button className="popup__button" type="submit">
            {textButton}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
