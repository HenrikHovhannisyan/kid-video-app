import React from "react";
import { Link } from "react-router-dom";
import "./VideoCard.css";

const VideoCard = ({ video, handleVideoClick }) => {
    return (
        <div className="video-card" onClick={() => handleVideoClick(video.id)}>
            <Link to={`/video/${video.id}`}>
                <img
                    src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
                    alt={video.title}
                    className="video-thumbnail"
                />
                <h4 className="video-title" title={video.title}>{video.title}</h4>
            </Link>
        </div>
    );
};

export default VideoCard;
