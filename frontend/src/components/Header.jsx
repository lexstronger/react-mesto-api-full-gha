import React, { useContext } from "react";
import { Route, Routes, Link } from "react-router-dom";
import logo from "../images/logo.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({ onLogout }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип сервиса Mesto" />
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Link className="header__link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <div className="header__user">
              <p className="header__email">{currentUser.email}</p>
              <button className="header__button" onClick={onLogout}>
                Выйти
              </button>
            </div>
          }
        />
      </Routes>
    </header>
  );
}

export default Header;
