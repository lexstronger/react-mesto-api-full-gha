import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={"profile"}
      title={"Редактировать профиль"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClose={props.onOverlayClose}
      textButton={props.isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        id="input-username"
        type="text"
        name="name"
        value={name || ""}
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        onChange={handleNameChange}
      />
      <span className="popup__input-error unput-username-error" />
      <input
        className="popup__input popup__input_type_description"
        id="input-description"
        type="text"
        name="description"
        value={description || ""}
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error unput-description-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
