import React, { useState } from "react";
import Modal from "react-modal";
import VideoCard from "../videoCard/VideoCard";
import "./VideoModal.css";

const VideoModal = ({ isOpen, onRequestClose, videos, handleVideoClick }) => {
    const [isVideoLoading, setIsVideoLoading] = useState(false);

    const handleCardClick = (videoId) => {
        if (!isVideoLoading) {
            setIsVideoLoading(true);
            handleVideoClick(videoId);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Патаханный видео"
            className="video-modal"
            overlayClassName="video-modal-overlay"
        >
            <button onClick={onRequestClose} className="close-modal-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </button>
            <div className="video-slider">
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                            handleVideoClick={() => handleCardClick(video.id)}
                        />
                    ))
                ) : (
                    <p>Տեսանյութը բեռնվում է…</p>
                )}
            </div>
        </Modal>
    );
};

export default VideoModal;
