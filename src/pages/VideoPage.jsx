import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import YouTubeVideo from "../components/YouTubeVideo";
import { useSwipeable } from "react-swipeable";
import { videos } from "../config/videoData";
import Modal from "react-modal";

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

    const handlers = useSwipeable({
        onSwipedUp: () => setRandomVideos(getRandomVideos(id, 10)),
    });

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
            {...handlers}
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
                    l
                </button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Պատահական տեսանյութեր"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    },
                    content: {
                        position: 'absolute',
                        inset: 'unset',
                        bottom: '0',
                        left: '0',
                        right: '0',
                        width: '100%',
                        maxHeight: '80vh',
                        padding: '0',
                        backgroundColor: '#fff',
                        overflowY: 'auto',
                        borderRadius: '8px 8px 0 0',
                    },
                }}
            >
                <button
                    onClick={closeModal}
                    style={{
                        position: 'absolute',
                        top: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 1001,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        border: "none",
                        borderRadius: "5px",
                        padding: "10px 20px",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    X
                </button>

                <div style={{ display: "flex", overflowX: "auto", padding: '60px 20px 20px' }}>
                    {randomVideos.length > 0 ? (
                        randomVideos.map((video) => (
                            <div
                                key={video.id}
                                style={{ margin: "10px", cursor: "pointer" }}
                                onClick={() => handleVideoClick(video.id)}
                            >
                                <img
                                    src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
                                    alt={video.title}
                                    width="150"
                                />
                                <h4>{video.title}</h4>
                            </div>
                        ))
                    ) : (
                        <p>Բեռնվում են պատահական տեսանյութեր...</p>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default VideoPage;
