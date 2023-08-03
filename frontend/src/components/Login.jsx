import React from "react";

function Login({ onLogin, handleChange, inputValue }) {
  return (
    <div className="entry-form">
      <h1>Вход</h1>
      <form className="registration-form" onSubmit={onLogin}>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
