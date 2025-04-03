import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import MathCaptchaModal from "../MathCaptchaModal/MathCaptchaModal";
import AuthDetails from "../../../pages/auth/AuthDetails";

/**
 * Компонент защищенной страницы информации о пользователе
 * Требует прохождения математической капчи перед отображением данных
 */
const ProtectedUserInfo = () => {
  // Состояния для управления отображением капчи и доступом к информации
  const [isCaptchaPassed, setIsCaptchaPassed] = useState(false); // Флаг успешного прохождения капчи
  const [showCaptcha, setShowCaptcha] = useState(true); // Флаг отображения модального окна капчи

  /**
   * Обработчик успешного прохождения капчи
   * Открывает доступ к защищенной информации
   */
  const handleCaptchaSuccess = () => {
    setIsCaptchaPassed(true);
    setShowCaptcha(false);
  };

  /**
   * Обработчик закрытия окна капчи
   * Перенаправляет пользователя на главную страницу
   */
  const handleCaptchaClose = () => {
    setShowCaptcha(false);
    return <Navigate to="/" />;
  };

  // Перенаправление на главную страницу, если капча не пройдена и окно закрыто
  if (!showCaptcha && !isCaptchaPassed) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {showCaptcha && !isCaptchaPassed && (
        <MathCaptchaModal
          onSuccess={handleCaptchaSuccess}
          onClose={handleCaptchaClose}
        />
      )}
      {isCaptchaPassed && <AuthDetails />}
    </>
  );
};

export default ProtectedUserInfo;
