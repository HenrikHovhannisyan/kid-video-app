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
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser(user ? user : null);
    });

    // Отслеживаем событие beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      unsubscribe();
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // Функция для установки PWA
  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    try {
      // Показываем диалог установки
      const result = await deferredPrompt.prompt();
      // Ожидаем ответ пользователя
      await result.userChoice;
      // Очищаем состояние
      setDeferredPrompt(null);
    } catch (error) {
      console.error("Ошибка при установке PWA:", error);
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo" aria-label="Main page">
          KidsVideo
        </Link>
        <nav>
          {deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="button button-primary"
              aria-label="Install app"
            >
              Install app
            </button>
          )}
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
