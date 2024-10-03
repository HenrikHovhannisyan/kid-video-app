import React, { useEffect, useState } from "react";
import "./VideoPage.css"
import { useParams, useNavigate } from "react-router-dom";
import YouTubeVideo from "../../components/youTubeVideo/YouTubeVideo";
import { videos } from "../../config/videoData";
import VideoModal from "../../components/videoModal/VideoModal";

const getRandomVideos = (currentId, count) => {
    return videos
        .filter((video) => video.id !== currentId)
        .sort(() => Math.random() - 0.5)
        .slice(0, count);
};

const VideoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [randomVideos, setRandomVideos] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();

        setRandomVideos(getRandomVideos(id, isMobile ? 10 : 9));

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [id, isMobile]);

    const handleVideoClick = (videoId) => {
        navigate(`/video/${videoId}`);
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div
            style={{ height: "100vh", display: "flex", flexDirection: "column" }}
        >
            <div style={{ flex: 1, position: "relative" }}>
                <YouTubeVideo videoId={id} />

                <button onClick={openModal} className={'top-btn'}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd"
                              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                    </svg>
                </button>
            </div>

            <VideoModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                videos={randomVideos}
                handleVideoClick={handleVideoClick}
            />
        </div>
    );
};

export default VideoPage;
