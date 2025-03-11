import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { videos } from "../../config/videoData";
import VideoCard from "../../components/videoCard/VideoCard";
import PublicUserVideos from "../../components/userVideos/PublicUserVideos";
import { auth } from "../../firebase";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const HomePage = () => {
  const [shuffledVideos, setShuffledVideos] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setShuffledVideos(shuffleArray([...videos]));
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleVideoClick = (videoId) => {};

  return (
    <div className="home-container">
      {currentUser && <PublicUserVideos userId={currentUser.uid} />}
      <h2>Recommended Videos</h2>
      <div className="videos-grid">
        {shuffledVideos.map((video) => (
          <VideoCard
            key={video.id}
            video={video}
            handleVideoClick={handleVideoClick}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
