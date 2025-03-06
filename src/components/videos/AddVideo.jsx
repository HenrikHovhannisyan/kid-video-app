import React, { useState } from "react";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./AddVideo.css";

const AddVideo = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!videoUrl) {
      setError("Пожалуйста, введите URL видео");
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        setError("Пожалуйста, войдите в систему");
        return;
      }

      await addDoc(collection(db, "videos"), {
        user_id: user.uid,
        video: videoUrl,
        createdAt: new Date().toISOString(),
      });

      setSuccess("Видео успешно добавлено!");
      setVideoUrl("");
    } catch (err) {
      setError("Ошибка при добавлении видео: " + err.message);
    }
  };

  return (
    <div className="add-video-container">
      <h2>Add new video</h2>
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
