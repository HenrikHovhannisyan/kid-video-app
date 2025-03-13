// Импорт необходимых зависимостей
import React, { useState } from "react";
import Modal from "react-modal";
import VideoCard from "../videoCard/VideoCard";
import "./VideoModal.css";

// Компонент модального окна для отображения видео
// Принимает следующие пропсы:
// - isOpen: булево значение, определяющее открыто ли модальное окно
// - onRequestClose: функция для закрытия модального окна
// - videos: массив объектов видео для отображения
// - handleVideoClick: функция обработки клика по видео
const VideoModal = ({ isOpen, onRequestClose, videos, handleVideoClick }) => {
  // Обработчик клика по карточке видео
  // Вызывает переданную функцию handleVideoClick и закрывает модальное окно
  const handleCardClick = (videoId) => {
    handleVideoClick(videoId);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Video selection"
      className="video-modal"
      overlayClassName="video-modal-overlay"
    >
      {/* Кнопка закрытия модального окна */}
      <button onClick={onRequestClose} className="close-modal-btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </button>
      {/* Контейнер для отображения списка видео */}
      <div className="video-slider">
        {/* Условный рендеринг: показываем список видео или сообщение о загрузке */}
        {videos.length > 0 ? (
          videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              handleVideoClick={() => handleCardClick(video.id)}
            />
          ))
        ) : (
          <p>Loading videos...</p>
        )}
      </div>
    </Modal>
  );
};

export default VideoModal;
