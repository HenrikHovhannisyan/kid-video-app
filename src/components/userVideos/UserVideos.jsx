import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import VideoCard from "../videoCard/VideoCard";
import "./UserVideos.css";
import AddVideo from "../addVideo/AddVideo";

// Функция для извлечения ID видео из URL YouTube
const extractVideoId = (url) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/|user\/.*\/))([^?&]+)/
  );

  return match ? match[1] : null;
};

// Компонент для отображения видео пользователя
const UserVideos = ({ userId }) => {
  // Состояние для хранения списка видео
  const [videos, setVideos] = useState([]);

  // Обработчик добавления нового видео
  const handleVideoAdded = (newVideo) => {
    setVideos([...videos, { id: newVideo.id, ...newVideo }]);
  };

  // Загрузка видео пользователя при монтировании компонента или изменении userId
  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        // Запрос к Firebase для получения видео текущего пользователя
        const q = query(
          collection(db, "videos"),
          where("user_id", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const videosList = [];
        querySnapshot.forEach((doc) => {
          videosList.push({ id: doc.id, ...doc.data() });
        });
        setVideos(videosList);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    if (userId) {
      fetchUserVideos();
    }
  }, [userId]);

  // Обработчик удаления видео
  const handleDelete = async (videoId) => {
    try {
      // Удаление документа из коллекции videos в Firebase
      await deleteDoc(doc(db, "videos", videoId));
      // Обновление локального состояния после удаления
      setVideos(videos.filter((video) => video.id !== videoId));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  // Обработчик клика по видео (пока не реализован)
  const handleVideoClick = (videoId) => {};

  return (
    <>
      <AddVideo onVideoAdded={handleVideoAdded} />
      <div className="auth-details">
        <h2>My videos</h2>
        <div className="videos-grid">
          {videos.map((video) => (
            <div key={video.id} className="video-item">
              <div className="video-wrapper">
                {video.video && (
                  <VideoCard
                    video={{
                      id: extractVideoId(video.video),
                    }}
                    handleVideoClick={handleVideoClick}
                  />
                )}
              </div>
              <button
                onClick={() => handleDelete(video.id)}
                className="button button-danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {videos.length === 0 && <p>You don't have videos.</p>}
      </div>
    </>
  );
};

export default UserVideos;
