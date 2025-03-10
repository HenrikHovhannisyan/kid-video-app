import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import "./VideoCard.css";

/**
 * Компонент карточки видео для отображения в модальном окне
 * @param {Object} props - Свойства компонента
 * @param {Object} props.video - Информация о видео
 * @param {string} props.video.id - Идентификатор видео
 * @param {Function} props.handleVideoClick - Обработчик клика по видео
 * @returns {React.ReactElement} Компонент VideoCard
 */
const VideoCard = ({ video, handleVideoClick }) => {
    return (
        <div className="video-card" onClick={() => handleVideoClick(video.id)}>
            <Link to={`/video/${video.id}`}>
                <img
                    src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
                    className="video-thumbnail"
                />
            </Link>
        </div>
    );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  handleVideoClick: PropTypes.func.isRequired
};

export default VideoCard;
