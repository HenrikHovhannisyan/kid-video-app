import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

// Компонент Header отвечает за отображение навигационной панели
const Header = () => {
  // Состояние для хранения информации об аутентифицированном пользователе
  const [authUser, setAuthUser] = useState(null);

  // Эффект для отслеживания состояния аутентификации
  useEffect(() => {
    // Подписка на изменения состояния аутентификации
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user ? user : null);
    });

    // Отписка при размонтировании компонента
    return () => unsubscribe();
  }, []);

  // Рендеринг компонента
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo" aria-label="Main page">
          KidsVideo
        </Link>
        <nav>
          {authUser ? (
            <Link
              to="/user-info"
              className="nav-link"
              aria-label="User profile"
            >
              Profile
            </Link>
          ) : (
            <Link to="/sign-in" className="nav-link" aria-label="Sign in">
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
