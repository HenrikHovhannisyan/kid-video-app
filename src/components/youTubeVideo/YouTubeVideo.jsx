import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import { db } from "../../firebase";
import { collection, query, getDocs } from "firebase/firestore";
import VideoModal from "../videoModal/VideoModal";
import { YT_PLAYER_STATES, DEFAULT_YOUTUBE_OPTS } from "../../constants";
import "./YouTubeVideo.css";

const YouTubeVideo = ({ videoId, videos, onPlayerReady }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allVideos, setAllVideos] = useState([]);
  const [displayedVideos, setDisplayedVideos] = useState([]);
  const playerRef = React.useRef(null);

  const opts = DEFAULT_YOUTUBE_OPTS;

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const selectRandomVideos = (videos, count = 10) => {
    const shuffledVideos = shuffleArray(videos);
    return shuffledVideos.slice(0, count);
  };

  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        const q = query(collection(db, "videos"));
        const querySnapshot = await getDocs(q);
        const userVideosList = [];
        querySnapshot.forEach((doc) => {
          const videoData = doc.data();
          if (videoData.video) {
            const videoId = extractVideoId(videoData.video);
            if (videoId) {
              userVideosList.push({
                id: videoId,
                title: videoData.title || "User Video",
                isUserVideo: true,
              });
            }
          }
        });
        setAllVideos([...(videos || []), ...userVideosList]);
        setDisplayedVideos(
          selectRandomVideos([...(videos || []), ...userVideosList])
        );
      } catch (error) {
        console.error("Error fetching user videos:", error);
        setAllVideos(videos || []);
        setDisplayedVideos(selectRandomVideos(videos || []));
      }
    };

    fetchUserVideos();
  }, [videos]);

  const extractVideoId = (url) => {
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/|user\/.*\/))([^?&]+)/
    );
    return match ? match[1] : null;
  };

  const onReady = (event) => {
    playerRef.current = event.target;
    if (onPlayerReady) {
      onPlayerReady(event.target);
    }
  };

  const onVideoEnd = (event) => {
    event.target.playVideo();
  };

  const onStateChange = (event) => {
    const isPlaying = event.data === YT_PLAYER_STATES.PLAYING;
    setIsPlaying(isPlaying);
    setIsModalOpen(!isPlaying);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  const handleVideoClick = (newVideoId) => {
    if (playerRef.current && newVideoId) {
      playerRef.current.loadVideoById(newVideoId);
      handleCloseModal();
    }
  };

  return (
    <div className="youtube-video-container">
      <YouTube
        videoId={videoId}
        opts={opts}
        style={{ width: "100%", height: "100%" }}
        onEnd={onVideoEnd}
        onStateChange={onStateChange}
        onReady={onReady}
      />
      <VideoModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        videos={displayedVideos}
        handleVideoClick={handleVideoClick}
      />
    </div>
  );
};

export default YouTubeVideo;
