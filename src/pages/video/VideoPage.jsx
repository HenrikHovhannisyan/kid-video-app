import React, { useEffect, useState } from "react";
import "./VideoPage.css";
import { useParams, useNavigate } from "react-router-dom";
import YouTubeVideo from "../../components/youTubeVideo/YouTubeVideo";
import { videos } from "../../config/videoData";
import VideoModal from "../../components/videoModal/VideoModal";

// Функция для получения случайных видео, исключая текущее
const getRandomVideos = (currentId, count) => {
  return videos
    .filter((video) => video.id !== currentId)
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
};

// Основной компонент страницы видео
const VideoPage = () => {
  // Получаем id видео из параметров URL
  const { id } = useParams();
  const navigate = useNavigate();
  // Состояния компонента
  const [randomVideos, setRandomVideos] = useState([]); // Список случайных видео
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Определение мобильного устройства
  const [modalIsOpen, setModalIsOpen] = useState(false); // Состояние модального окна
  const playerRef = React.useRef(null); // Ссылка на плеер для управления

  const VIDEOS_COUNT = 10; // Количество случайных видео
  const MOBILE_BREAKPOINT = 768; // Точка перехода для мобильной версии

  // Обработчик готовности плеера
  const handlePlayerReady = (player) => {
    playerRef.current = player;
  };

  // Обработчик изменения размера окна
  const handleResize = React.useCallback(() => {
    setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
  }, []);

  // Загрузка случайных видео при изменении id
  useEffect(() => {
    setRandomVideos(getRandomVideos(id, VIDEOS_COUNT));
  }, [id]);

  // Добавление слушателя изменения размера окна
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  // Обработчик клика по видео
  const handleVideoClick = React.useCallback(
    (videoId) => {
      navigate(`/video/${videoId}`);
    },
    [navigate]
  );

  // Управление плеером (пауза/воспроизведение)
  const handlePlayerControl = React.useCallback((action) => {
    if (playerRef.current) {
      playerRef.current[action]();
    }
  }, []);

  // Открытие модального окна и постановка видео на паузу
  const openModal = React.useCallback(() => {
    setModalIsOpen(true);
  }, [handlePlayerControl]);

  // Закрытие модального окна и возобновление воспроизведения
  const closeModal = React.useCallback(() => {
    setModalIsOpen(false);
  }, [handlePlayerControl]);

  // Переход на главную страницу
  const goToHomePage = React.useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <div style={{ position: "relative" }}>
        <div className="video-header">
          <button onClick={goToHomePage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left-circle"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
              />
            </svg>
          </button>
        </div>

        <YouTubeVideo
          videoId={id}
          videos={randomVideos}
          onPlayerReady={handlePlayerReady}
        />

        <button onClick={openModal} className="top-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-up-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"
            />
          </svg>
        </button>

        <div className="btn-block" />
      </div>

      <VideoModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        videos={randomVideos}
        handleVideoClick={handleVideoClick}
      />
    </div>
  );
};

export default VideoPage;
