import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({name, link});
  }

  return (
    <PopupWithForm
      name={"new-card"}
      title={"Новое место"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClose={props.onOverlayClose}
      textButton={props.isLoading ? "Создание..." : "Создать"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_title"
        id="input-cardtitle"
        type="text"
        name="title"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={name || ''}
        onChange={handleNameChange}
      />
      <span className="popup__input-error unput-cardtitle-error" />
      <input
        className="popup__input popup__input_type_link"
        id="input-link"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        required
        value={link || ''}
        onChange={handleLinkChange}
      />
      <span className="popup__input-error unput-link-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
