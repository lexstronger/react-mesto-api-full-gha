import React from "react";
import Card from "./Card.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);  

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <button
            className="profile__avatar-btn"
            type="button"
            aria-label="Обновить аватар"
            onClick={props.onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="Аватар пользователя"
            />
          </button>
          <div className="profile__change-name">
            <div className="profile__text">
              <h1 className="profile__name">{currentUser.name}</h1>
              <p className="profile__description">{currentUser.about}</p>
            </div>
            <button
              className="profile__button"
              type="button"
              aria-label="Редактировать профиль"
              onClick={props.onEditProfile}
            ></button>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить карточку"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="photo-grid">
        <ul className="photo-grid__list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
