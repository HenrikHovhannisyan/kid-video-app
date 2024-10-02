import React from "react";
import Modal from "react-modal";
import VideoCard from "../videoCard/VideoCard";
import "./VideoModal.css";

const VideoModal = ({ isOpen, onRequestClose, videos, handleVideoClick }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Патаханный видео"
            className="video-modal"
            overlayClassName="video-modal-overlay"
        >
            <button onClick={onRequestClose} className="close-modal-btn">
                X
            </button>
            <div className="video-slider">
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                            handleVideoClick={handleVideoClick}
                        />
                    ))
                ) : (
                    <p>Загрузка видео...</p>
                )}
            </div>
        </Modal>
    );
};

export default VideoModal;
