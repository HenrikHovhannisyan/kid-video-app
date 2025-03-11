import React, { useState } from "react";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./AddVideo.css";

const AddVideo = ({ onVideoAdded }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!videoUrl) {
      setError("Please enter the video URL");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setError("Please log in");
        return;
      }

      await addDoc(collection(db, "videos"), {
        user_id: user.uid,
        video: videoUrl,
        createdAt: new Date().toISOString(),
      });

      const newVideo = {
        video: videoUrl,
        user_id: user.uid,
        createdAt: new Date().toISOString(),
      };

      if (onVideoAdded) {
        onVideoAdded(newVideo);
      }

      setSuccess("Video added successfully!");
      setVideoUrl("");
    } catch (err) {
      setError("Error adding video: " + err.message);
    }
  };

  return (
    <div className="add-video-container">
      <h2>Add new video</h2>
      <div className="youtube-instructions">
        <h3>How to add a video from YouTube:</h3>
        <ol>
          <li>Open the YouTube video you want to add.</li>
          <li>Click the "Share" button below the video.</li>
          <li>
            Copy the video URL from the address bar or from the "Share" window.
          </li>
          <li>Paste the copied URL in the input field below.</li>
        </ol>
        <div className="url-examples">
          <p>
            <strong>Supported URL formats:</strong>
          </p>
          <ul>
            <li>✅ https://www.youtube.com/watch?v=XXXXXXXXXXX</li>
            <li>✅ https://youtu.be/XXXXXXXXXXX</li>
            <li>❌ https://youtube.com/shorts/XXXXXXXXXXX</li>
            <li>❌ https://youtube.com/playlist?list=XXXXXXXXXXX</li>
          </ul>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="Enter video URL"
          required
        />
        <button type="submit" className="button button-primary">
          Add
        </button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default AddVideo;
