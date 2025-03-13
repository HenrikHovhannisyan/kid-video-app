// Импорт необходимых зависимостей
import { createUserWithEmailAndPassword } from "firebase/auth"; // Функция для создания пользователя в Firebase
import React, { useState } from "react"; // React и хук для управления состоянием
import { auth } from "../../firebase"; // Экземпляр аутентификации Firebase
import { Link, useNavigate } from "react-router-dom"; // Компоненты для навигации
import "./AuthStyle.css"; // Стили компонента

// Компонент регистрации нового пользователя
const SignUp = () => {
  const navigate = useNavigate(); // Хук для программной навигации

  // Состояния для хранения данных формы
  const [email, setEmail] = useState(""); // Email пользователя
  const [password, setPassword] = useState(""); // Пароль
  const [copyPassword, setCopyPassword] = useState(""); // Подтверждение пароля

  // Состояния для хранения ошибок
  const [error, setError] = useState(""); // Общая ошибка
  const [emailError, setEmailError] = useState(""); // Ошибка email
  const [passwordError, setPasswordError] = useState(""); // Ошибка пароля
  const [copyPasswordError, setCopyPasswordError] = useState(""); // Ошибка подтверждения пароля
  // Функция для валидации email с помощью регулярного выражения
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Функция обработки отправки формы регистрации
  function register(e) {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    let isValid = true; // Флаг валидности формы

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
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    } else {
      setPasswordError("");
    }

    // Проверка совпадения паролей
    if (!copyPassword) {
      setCopyPasswordError("Please confirm your password");
      isValid = false;
    } else if (copyPassword !== password) {
      setCopyPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setCopyPasswordError("");
    }

    // Если есть ошибки валидации, прерываем регистрацию
    if (!isValid) {
      return;
    }
    // Создаем нового пользователя в Firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        console.log(user); // Логируем успешную регистрацию
        // Очищаем все поля и ошибки
        setError("");
        setEmail("");
        setCopyPassword("");
        setPassword("");
        navigate("/"); // Перенаправляем на главную страницу
      })
      .catch((error) => {
        // Обработка ошибок Firebase
        console.log(error);
        setError("Registration error. Email may already be in use.");
      });
  }
  return (
    <div className="form-box">
      <form onSubmit={register}>
        <fieldset>
          <legend>Sign Up</legend>
          <input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className={emailError ? "error" : email ? "success" : ""}
          />
          {emailError && <p className="error-message">{emailError}</p>}
          <input
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={passwordError ? "error" : password ? "success" : ""}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
          <input
            placeholder="Confirm password"
            value={copyPassword}
            onChange={(e) => setCopyPassword(e.target.value)}
            type="password"
            className={
              copyPasswordError ? "error" : copyPassword ? "success" : ""
            }
          />
          {copyPasswordError && (
            <p className="error-message">{copyPasswordError}</p>
          )}
          {error ? <p className="error-message">{error}</p> : ""}
          <button className="button button-primary">Create Account</button>
          <p>
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default SignUp;
