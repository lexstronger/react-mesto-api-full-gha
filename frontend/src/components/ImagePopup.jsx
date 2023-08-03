import React from "react";

function ImagePopup({ card, onClose, isOpen, onOverlayClose }) {
  return (
    <div
      className={`popup popup_type_image ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={onOverlayClose}
    >
      <figure className="popup__picture">
        <button
          className="popup__cross"
          type="button"
          aria-label="Закрыть попап"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <figcaption className="popup__title">{card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
