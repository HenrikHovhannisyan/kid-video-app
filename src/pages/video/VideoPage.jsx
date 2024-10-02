import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import YouTubeVideo from "../../components/youTubeVideo/YouTubeVideo";
import { useSwipeable } from "react-swipeable";
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

                <button
                    onClick={openModal}
                    style={{
                        position: "absolute",
                        bottom: "10px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 1000,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 10px",
                        fontSize: "14px",
                        cursor: "pointer",
                    }}
                >
                    🡹
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
