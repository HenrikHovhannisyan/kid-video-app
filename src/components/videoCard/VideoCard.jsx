import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./VideoCard.css";

const VideoCard = ({ video, handleVideoClick }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
    console.error(`Error loading video preview ${video.id}`);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div
      className="video-card"
      onClick={() => handleVideoClick(video.id)}
      role="button"
      tabIndex={0}
      aria-label={`Открыть видео: ${video.title}`}
    >
      <Link to={`/video/${video.id}`}>
        {!imageLoaded && !imageError && (
          <div className="video-thumbnail-loading">Loading...</div>
        )}
        {imageError ? (
          <div className="video-thumbnail-error">Error loading image.</div>
        ) : (
          <img
            src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
            className={`video-thumbnail ${imageLoaded ? "loaded" : ""}`}
            alt={video.title}
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
        )}
      </Link>
    </div>
  );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  handleVideoClick: PropTypes.func.isRequired,
};

export default VideoCard;
