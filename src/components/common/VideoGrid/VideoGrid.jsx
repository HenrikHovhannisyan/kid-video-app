import React from "react";
import PropTypes from "prop-types";
import VideoCard from "../../videoCard/VideoCard";
import "./VideoGrid.css";

// Компонент для отображения сетки видео
// @param {Object[]} videos - Массив объектов видео для отображения
// @param {Function} handleVideoClick - Функция обработки клика по видео
// @param {string} emptyMessage - Сообщение, отображаемое при отсутствии видео
const VideoGrid = ({ videos, handleVideoClick, emptyMessage }) => {
  // Если нет видео для отображения, показываем сообщение
  if (videos.length === 0) {
    return <p className="empty-message">{emptyMessage}</p>;
  }

  // Отрисовка сетки видео
  return (
    <div className="videos-grid">
      {videos.map((video) => (
        <div key={video.id} className="video-item">
          <div className="video-wrapper">
            <VideoCard
              video={{
                id: video.id,
              }}
              handleVideoClick={handleVideoClick}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// Определение типов пропсов компонента
VideoGrid.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // Обязательный ID видео
      title: PropTypes.string, // Опциональное название видео
    })
  ).isRequired,
  handleVideoClick: PropTypes.func.isRequired, // Обязательная функция обработки клика
  emptyMessage: PropTypes.string.isRequired, // Обязательное сообщение при отсутствии видео
};

export default VideoGrid;
