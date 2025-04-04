import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import "./AuthStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

// Компонент для аутентификации пользователя через Firebase
// Обрабатывает вход по email и паролю с валидацией полей
const SignIn = () => {
  const navigate = useNavigate();
  // Состояния для хранения введенных данных и ошибок
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Функция для проверки корректности email с помощью регулярного выражения
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Обработчик отправки формы входа
  function logIn(e) {
    e.preventDefault();
    let isValid = true;

    // Валидация email
    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Валидация пароля
    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Если есть ошибки валидации, прерываем отправку
    if (!isValid) {
      return;
    }

    // Аутентификация через Firebase
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // Очищаем состояния и перенаправляем на главную страницу
        setError("");
        setEmail("");
        setPassword("");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setError("Sorry, couldn't find your account 😔");
      });
  }

  // Рендер формы входа с валидацией и обработкой ошибок
  return (
    <div className="form-box">
      <form>
        <fieldset>
          <legend>Login</legend>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={emailError ? "error" : email ? "success" : ""}
          />
          {emailError && <p className="error-message">{emailError}</p>}
          <div className="password-input-container">
            <input
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              className={passwordError ? "error" : password ? "success" : ""}
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          {error ? <p className="error-message">{error}</p> : ""}
          <button onClick={logIn} className="button button-primary">
            <FontAwesomeIcon icon={faRightToBracket} /> Login
          </button>
          <hr />
          <p>
            Don't have an account?{" "}
            <Link to="/sign-up" className="button button-primary">
              <FontAwesomeIcon icon={faRightToBracket} /> Sign Up
            </Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default SignIn;
