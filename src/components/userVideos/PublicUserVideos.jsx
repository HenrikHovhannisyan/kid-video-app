import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import VideoCard from "../videoCard/VideoCard";
import "./UserVideos.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Функция для извлечения ID видео из URL YouTube
// Поддерживает различные форматы ссылок (обычные, shorts, embed и т.д.)
const extractVideoId = (url) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/|user\/.*\/))([^?&]+)/
  );
  return match ? match[1] : null;
};

// Компонент для отображения публичных видео пользователя
// Принимает userId как обязательный параметр
const PublicUserVideos = ({ userId }) => {
  // Состояния для управления списком видео, загрузкой и ошибками
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Функция для получения видео пользователя из Firestore
    const fetchUserVideos = async () => {
      if (!userId) return;

      setIsLoading(true);
      setError(null);

      try {
        // Создаем запрос к коллекции videos, фильтруя по user_id
        const q = query(
          collection(db, "videos"),
          where("user_id", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const videosList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVideos(videosList);
      } catch (error) {
        console.error("Error fetching videos:", error);
        setError("Failed to load videos. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserVideos();
  }, [userId]);

  // Обработчик клика по видео (может быть расширен при необходимости)
  const handleVideoClick = (videoId) => {
    // Здесь можно добавить логику обработки клика по видео
  };

  // Отображение индикатора загрузки
  if (isLoading) {
    return <div className="loading-indicator">Loading videos...</div>;
  }

  // Отображение ошибки, если она есть
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  // Основной рендер компонента
  return (
    <div className="public-user-videos">
      <h2>Your videos</h2>
      <div className="videos-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <div className="video-wrapper">
              {video.video && (
                <VideoCard
                  video={{
                    id: extractVideoId(video.video),
                    title: video.title || "Untitled",
                  }}
                  handleVideoClick={handleVideoClick}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {videos.length === 0 && (
        <p>
          You don't have any videos yet.{" "}
          <Link to="/user-info" className="button button-primary">
            <FontAwesomeIcon icon={faPlus} /> Add video
          </Link>
        </p>
      )}
    </div>
  );
};

// Проверка типов пропсов
PublicUserVideos.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default PublicUserVideos;
