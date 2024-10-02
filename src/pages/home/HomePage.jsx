import React, { useEffect, useState } from "react";
import './HomePage.css';
import { videos } from "../../config/videoData";
import VideoCard from "../../components/videoCard/VideoCard";

const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
};

const HomePage = () => {
    const [shuffledVideos, setShuffledVideos] = useState([]);

    useEffect(() => {
        setShuffledVideos(shuffleArray([...videos]));
    }, []);

    const handleVideoClick = (videoId) => {
        console.log(`Video clicked: ${videoId}`);
    };

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "20px",
                padding: "20px",
            }}
        >
            {shuffledVideos.map((video) => (
                <VideoCard
                    key={video.id}
                    video={video}
                    handleVideoClick={handleVideoClick}
                />
            ))}
        </div>
    );
};

export default HomePage;
