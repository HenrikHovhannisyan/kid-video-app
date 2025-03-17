// Импорт необходимых функций из Firebase для работы с аутентификацией
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
// Импорт экземпляра auth из нашей конфигурации Firebase
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import UserVideos from "../userVideos/UserVideos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

// Компонент AuthDetails отвечает за отображение информации о пользователе и управление его аутентификацией
const AuthDetails = () => {
  // Состояние для хранения данных аутентифицированного пользователя
  const [authUser, setAuthUser] = useState(null);
  // Хук для программной навигации по приложению
  const navigate = useNavigate();

  useEffect(() => {
    // Подписываемся на изменения состояния аутентификации
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Если пользователь авторизован, сохраняем его данные в состоянии
        setAuthUser(user);
      } else {
        // Если пользователь не авторизован, очищаем состояние
        setAuthUser(null);
      }
    });

    // Отписываемся от слушателя при размонтировании компонента
    return () => {
      listen();
    };
  }, []);

  // Функция для выхода пользователя из системы
  function userSignOut() {
    signOut(auth)
      .then(() => {
        // После успешного выхода перенаправляем на главную страницу
        navigate("/");
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className="user-info">
      {authUser ? (
        // Если пользователь авторизован, показываем его данные и кнопку выхода
        <>
          <div className="auth-details">
            <h2>User info</h2>
            <p>
              Signed in as <strong>{authUser.email}</strong>
            </p>
            <button onClick={userSignOut} className="button button-danger">
              <FontAwesomeIcon icon={faRightFromBracket} /> Sign Out
            </button>
          </div>
          {/* Отображаем компонент с видео пользователя, передавая его ID */}
          <UserVideos userId={authUser.uid} />
        </>
      ) : (
        // Если пользователь не авторизован, показываем сообщение
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;
