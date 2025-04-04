import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./VideoCard.css";

// Компонент VideoCard отвечает за отображение карточки видео с превью и заголовком
// Компонент обрабатывает состояния загрузки изображения и возможные ошибки
//
// Пропсы:
// @param {Object} video - Объект с данными о видео
//   @param {string} video.id - Уникальный идентификатор видео с YouTube
// @param {Function} handleVideoClick - Функция обработки клика по видео, принимает id видео
const VideoCard = ({ video, handleVideoClick }) => {
  // Локальные состояния компонента:
  // imageError - флаг ошибки загрузки изображения
  // imageLoaded - флаг успешной загрузки изображения
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Обработчик ошибки загрузки изображения
  // Устанавливает флаг ошибки и выводит сообщение в консоль
  const handleImageError = () => {
    setImageError(true);
    console.error(`Error loading video preview ${video.id}`);
  };

  // Обработчик успешной загрузки изображения
  // Устанавливает флаг загрузки для скрытия индикатора загрузки
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className="video-card"
      onClick={() => handleVideoClick(video.id)}
      role="button"
      tabIndex={0}
    >
      <Link to={`/video/${video.id}`}>
        {/* Отображение состояния загрузки */}
        {!imageLoaded && !imageError && (
          <div className="video-thumbnail-loading">Loading...</div>
        )}
        {/* Отображение ошибки или превью видео */}
        {imageError ? (
          <div className="video-thumbnail-error">Error loading image.</div>
        ) : (
          <img
            src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
            className={`video-thumbnail ${imageLoaded ? "loaded" : ""}`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        )}
      </Link>
    </div>
  );
};

// Определение типов пропсов компонента через PropTypes
// Обязательные поля: video (объект с id) и handleVideoClick (функция)
VideoCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string.isRequired, // Обязательный ID видео
  }).isRequired,
  handleVideoClick: PropTypes.func.isRequired, // Обязательная функция обработки клика
};

export default VideoCard;
