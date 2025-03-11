import React, { useState } from "react";
import YouTube from "react-youtube";
import VideoModal from "../videoModal/VideoModal";
import { YT_PLAYER_STATES, DEFAULT_YOUTUBE_OPTS } from "../../constants";
import "./YouTubeVideo.css";

/**
 * Компонент для отображения и управления YouTube видео
 * @param {Object} props - Свойства компонента
 * @param {string} props.videoId - ID видео с YouTube
 * @param {Array} props.videos - Список видео для отображения в модальном окне
 * @returns {React.ReactElement} Компонент YouTubeVideo
 */
const YouTubeVideo = ({ videoId, videos, onPlayerReady }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const playerRef = React.useRef(null);

  const opts = DEFAULT_YOUTUBE_OPTS;

  const onReady = (event) => {
    playerRef.current = event.target;
    if (onPlayerReady) {
      onPlayerReady(event.target);
    }
  };

  /**
   * Обработчик окончания воспроизведения видео
   * @param {Object} event - Событие окончания воспроизведения
   */
  const onVideoEnd = (event) => {
    event.target.playVideo();
  };

  /**
   * Обработчик изменения состояния плеера
   * @param {Object} event - Событие изменения состояния
   */
  const onStateChange = (event) => {
    const isPlaying = event.data === YT_PLAYER_STATES.PLAYING;
    setIsPlaying(isPlaying);
    setIsModalOpen(!isPlaying);
  };

  /**
   * Обработчик закрытия модального окна
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  /**
   * Обработчик клика по видео в модальном окне
   * @param {string} newVideoId - ID нового выбранного видео
   */
  const handleVideoClick = (newVideoId) => {
    // TODO: Добавить логику переключения видео
  };

  return (
    <div className="youtube-video-container">
      <YouTube
        videoId={videoId}
        opts={opts}
        style={{ width: "100%", height: "100%" }}
        onEnd={onVideoEnd}
        onStateChange={onStateChange}
        onReady={onReady}
      />
      <VideoModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        videos={videos || []}
        handleVideoClick={handleVideoClick}
      />
    </div>
  );
};

export default YouTubeVideo;
