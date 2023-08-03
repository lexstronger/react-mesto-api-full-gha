import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const linkAvatarRef = React.useRef();

  React.useEffect(() => {
    linkAvatarRef.current.value = ''
  }, [props.isOpen])

  function handleSubmit(evt) {
    evt.preventDefault();
  
    props.onUpdateAvatar({
      avatar: linkAvatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClose={props.onOverlayClose}
      textButton={props.isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_avatar"
        id="input-avatar"
        type="url"
        name="avatar"
        placeholder="Ссылка на аватар"
        ref={linkAvatarRef}
        required
      />
      <span className="popup__input-error input-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
