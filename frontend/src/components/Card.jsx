import React from "react";
import trash from "../images/trash.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  function handleLikeClick() {
    onCardLike(card)
  }
  function handleDeleteClick() {
    onCardDelete(card)
  }
  function handleCardClick() {
    onCardClick(card);
  }

  return (
    <li className="card__item">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}
      />
      {isOwn && 
        <button
          className="card__trash"
          src={trash}
          type="button"
          aria-label="Удалить карточку"
          onClick={handleDeleteClick}
        />
      }
      <div className="card__panel">
        <h2 className="card__name">{card.name}</h2>
        <div className="card__stats">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          ></button>
          <span className="card__quantity-likes">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
