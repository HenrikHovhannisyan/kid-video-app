import React, { useState } from "react";
import YouTube from "react-youtube";
import VideoModal from "../videoModal/VideoModal";

const YouTubeVideo = ({ videoId, videos }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
      rel: 0,
      modestbranding: 0,
      controls: 1,
      showinfo: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
    },
  };

  const onVideoEnd = (event) => {
    event.target.playVideo();
  };

  const onStateChange = (event) => {
    // YT.PlayerState.PLAYING = 1
    // YT.PlayerState.PAUSED = 2
    setIsPlaying(event.data === 1);
    if (event.data === 2) {
      setIsModalOpen(true);
    } else if (event.data === 1) {
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleVideoClick = (newVideoId) => {
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 64px)",
      }}
    >
      <YouTube
        videoId={videoId}
        opts={opts}
        style={{ width: "100%", height: "100%" }}
        onEnd={onVideoEnd}
        onStateChange={onStateChange}
      />
      <VideoModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        videos={videos}
        handleVideoClick={handleVideoClick}
      />
    </div>
  );
};

export default YouTubeVideo;
