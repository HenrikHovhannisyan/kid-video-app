import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import YouTubeVideo from "../components/YouTubeVideo";
import { useSwipeable } from "react-swipeable";
import { videos } from "../config/videoData";

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

  return (
    <div
      {...handlers}
      style={{ height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1 }}>
        <YouTubeVideo videoId={id} />
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h3>Պատահական տեսանյութեր</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
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
      </div>
    </div>
  );
};

export default VideoPage;
