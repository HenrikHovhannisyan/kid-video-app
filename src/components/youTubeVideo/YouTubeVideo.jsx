import React from "react";
import YouTube from "react-youtube";

const YouTubeVideo = ({ videoId }) => {
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
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <YouTube
        videoId={videoId}
        opts={opts}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default YouTubeVideo;
