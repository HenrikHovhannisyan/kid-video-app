import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import VideoCard from "../videoCard/VideoCard";
import "./UserVideos.css";
import { Link } from "react-router-dom";

const extractVideoId = (url) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/|user\/.*\/))([^?&]+)/
  );

  return match ? match[1] : null;
};

const PublicUserVideos = ({ userId }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchUserVideos = async () => {
      try {
        const q = query(
          collection(db, "videos"),
          where("user_id", "==", userId)
        );
        const querySnapshot = await getDocs(q);
        const videosList = [];
        querySnapshot.forEach((doc) => {
          videosList.push({ id: doc.id, ...doc.data() });
        });
        setVideos(videosList);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    if (userId) {
      fetchUserVideos();
    }
  }, [userId]);

  const handleVideoClick = (videoId) => {};

  return (
    <div className="public-user-videos">
      <h2>Your Videos</h2>
      <div className="videos-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-item">
            <div className="video-wrapper">
              {video.video && (
                <VideoCard
                  video={{
                    id: extractVideoId(video.video),
                  }}
                  handleVideoClick={handleVideoClick}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {videos.length === 0 && (
        <p>
          You don't have any videos uploaded yet.{" "}
          <Link to="/user-info">Add Video</Link>
        </p>
      )}
    </div>
  );
};

export default PublicUserVideos;
