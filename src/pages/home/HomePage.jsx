import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { videos } from "../../config/videoData";
import VideoCard from "../../components/videoCard/VideoCard";
import PublicUserVideos from "../../components/userVideos/PublicUserVideos";
import { auth } from "../../firebase";

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
      {currentUser && <PublicUserVideos userId={currentUser.uid} />}
      <h2>Recommended Videos</h2>
      {/* Сетка с рекомендованными видео */}
      <div className="videos-grid">
        {shuffledVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            handleVideoClick={handleVideoClick}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
