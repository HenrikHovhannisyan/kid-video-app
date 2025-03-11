import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import VideoCard from "../videoCard/VideoCard";
import "./UserVideos.css";
import AddVideo from "../addVideo/AddVideo";

const extractVideoId = (url) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtu(?:\.be\/|be\.com\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/|user\/.*\/))([^?&]+)/
  );

  return match ? match[1] : null;
};

const UserVideos = ({ userId }) => {
  const [videos, setVideos] = useState([]);

  const handleVideoAdded = (newVideo) => {
    setVideos([...videos, { id: newVideo.id, ...newVideo }]);
  };

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

  const handleDelete = async (videoId) => {
    try {
      await deleteDoc(doc(db, "videos", videoId));
      setVideos(videos.filter((video) => video.id !== videoId));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };

  const handleVideoClick = (videoId) => {};

  return (
    <>
      <AddVideo onVideoAdded={handleVideoAdded} />
      <div className="auth-details">
        <h2>My videos</h2>
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
              <button
                onClick={() => handleDelete(video.id)}
                className="button button-danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        {videos.length === 0 && <p>You don't have videos.</p>}
      </div>
    </>
  );
};

export default UserVideos;
