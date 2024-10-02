import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { videos } from "../config/videoData";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const HomePage = () => {
  const [shuffledVideos, setShuffledVideos] = useState([]);

  useEffect(() => {
    setShuffledVideos(shuffleArray([...videos]));
  }, []);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {shuffledVideos.map((video) => (
          <div key={video.id}>
            <Link to={`/video/${video.id}`}>
              <img
                src={`https://img.youtube.com/vi/${video.id}/0.jpg`}
                alt={video.title}
                style={{
                  width: "100%",
                  borderRadius: "10px",
                }}
              />
              <h3 style={{ textAlign: "center" }}>{video.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
