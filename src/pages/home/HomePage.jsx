import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { videos } from "../../config/videoData";
import VideoGrid from "../../components/common/VideoGrid/VideoGrid";
import PublicUserVideos from "../../components/userVideos/PublicUserVideos";
import { auth } from "../../firebase";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";

// Функция для случайного перемешивания массива видео
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

// Основной компонент домашней страницы
const HomePage = () => {
  // Состояния компонента
  const [shuffledVideos, setShuffledVideos] = useState([]); // Перемешанный список видео
  const [currentUser, setCurrentUser] = useState(null); // Текущий пользователь

  useEffect(() => {
    // Перемешивание видео при первой загрузке
    setShuffledVideos(shuffleArray([...videos]));
    // Подписка на изменения состояния аутентификации
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    // Отписка при размонтировании компонента
    return () => unsubscribe();
  }, []);

  const handleVideoClick = (videoId) => {};

  return (
    <div className="home-container">
      {/* Отображение видео пользователя, если он авторизован */}
      {currentUser ? (
        <>
          <PublicUserVideos userId={currentUser.uid} /> <hr />
        </>
      ) : (
        <div className="login-prompt">
          <p>To add your videos, please log in.</p>
          <Link to="/sign-in" className="button button-primary">
            <FontAwesomeIcon icon={faRightToBracket} /> Sign In
          </Link>
        </div>
      )}

      <h2 style={{ marginTop: 15 }}>Recommended Videos</h2>
      <VideoGrid
        videos={shuffledVideos}
        handleVideoClick={handleVideoClick}
        emptyMessage="Нет рекомендованных видео"
      />
    </div>
  );
};

export default HomePage;
