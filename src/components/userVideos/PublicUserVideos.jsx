import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import VideoCard from "../videoCard/VideoCard";
import "./UserVideos.css";
import { Link } from "react-router-dom";

const extractVideoId = (url) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/|user\/.*\/))([^?&]+)/
  );
  return match ? match[1] : null;
};

const PublicUserVideos = ({ userId }) => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserVideos = async () => {
      if (!userId) return;

      setIsLoading(true);
      setError(null);

      try {
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
        setError("Не удалось загрузить видео. Пожалуйста, попробуйте позже.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserVideos();
  }, [userId]);

  const handleVideoClick = (videoId) => {
    // Обработчик клика по видео может быть реализован при необходимости
  };

  if (isLoading) {
    return <div className="loading-indicator">Loading video...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

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
                    title: video.title || "Без названия",
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
          You don't have videos. <Link to="/user-info">Add video</Link>
        </p>
      )}
    </div>
  );
};

PublicUserVideos.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default PublicUserVideos;
