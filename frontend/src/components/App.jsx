import React, { useEffect } from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import ImagePopup from "./ImagePopup.jsx";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup.jsx";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";
import { useNavigate, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRouteElement from "./ProtectedRouteElement.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import auth from "../utils/Auth.js";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false)
  const [isRegister, setIsRegister] = React.useState({
    status: "",
    message: "",
  });
  const [inputValue, setInputValue] = React.useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loggedIn) {
    api
      .getCurrentUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }}, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
    api
      .getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(err));
  }}, [loggedIn]);

  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isInfoTooltipOpen

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }
  function closeAllPopupsByOverlay(evt) {
    if (evt.target.classList.contains("popup")) {
      closeAllPopups();
    }
  }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editProfileInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .editProfileAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }
  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      })
  }
  useEffect(() => {
    handleCheckToken();
  }, []);

  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function handleLogOut() {
    setLoggedIn(false);
    setEmail("");
    navigate("/sign-in", { replace: true });
    localStorage.removeItem("jwt");
  }
  function handleRegisterUser(evt) {
    evt.preventDefault();
    const { email, password } = inputValue;
    auth
      .register(email, password)
      .then(() => {
        setInputValue({ email: "", password: "" });
        setIsRegister({
          status: true,
          message: "Вы успешно зарегистрировались!",
        });
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {        
        setIsRegister({
          status: false,
          message: "Что-то пошло не так! Попробуйте еще раз.",
        });
        console.log(err);
      })
      .finally(() => {
        setIsInfoTooltipOpen(true);
      })
      
  }
  function handleLoginUser(evt) {
    evt.preventDefault();
    const { email, password } = inputValue;
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token)
        setInputValue({ email: "", password: "" });
        setLoggedIn(true);
        setEmail(email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleChange(evt) {
    const { name, value } = evt.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header email={email} onLogout={handleLogOut} />
          <Routes>
            <Route
              path="/sign-in"
              element={
                <Login
                  onLogin={handleLoginUser}
                  handleChange={handleChange}
                  inputValue={inputValue}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register
                  onRegister={handleRegisterUser}
                  handleChange={handleChange}
                  inputValue={inputValue}
                />
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={Main}
                  loggedIn={loggedIn}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path="/*"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
          </Routes>
          {loggedIn && <Footer />}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onOverlayClose={closeAllPopupsByOverlay}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onOverlayClose={closeAllPopupsByOverlay}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onOverlayClose={closeAllPopupsByOverlay}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <PopupWithForm
            name={"confirm"}
            title={"Вы уверены?"}
            textButton={"Да"}
          />
          <ImagePopup
            card={selectedCard}
            isOpen={isImagePopupOpen}
            onClose={closeAllPopups}
            onOverlayClose={closeAllPopupsByOverlay}
          />
          <InfoTooltip
            isRegister={isRegister}
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            onOverlayClose={closeAllPopupsByOverlay}
            alt={"Статус"}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
