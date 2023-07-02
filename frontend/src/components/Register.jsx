import React from "react";
import { Link } from "react-router-dom";

function Register({ onRegister, handleChange, inputValue }) {
  return (
    <div className="entry-form">
      <h1>Регистрация</h1>
      <form className="registration-form" onSubmit={onRegister}>
        <input
          className="registration-form__input"
          name="email"
          placeholder="E-mail"
          type="email"
          onChange={handleChange}
          value={inputValue.email}
          required
        />
        <input
          className="registration-form__input"
          name="password"
          placeholder="Пароль"
          type="password"
          onChange={handleChange}
          value={inputValue.password}
          required
        />
        <button
          className="registration-form__button"
          name="save"
          type="submit"
        >
          Зарегистрироваться
        </button>
        <Link className="registration-form__link" to="/sign-in">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
