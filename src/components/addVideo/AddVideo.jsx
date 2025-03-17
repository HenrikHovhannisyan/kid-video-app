import React, { useState } from "react";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import "./AddVideo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// Компонент для добавления новых видео с YouTube в коллекцию пользователя
// Предоставляет форму для вставки URL видео и выполняет:
// 1. Валидацию введенного URL
// 2. Проверку авторизации пользователя
// 3. Сохранение видео в Firestore
// 4. Обработку ошибок и отображение статуса операции
//
// Пропсы:
// @param {Function} onVideoAdded - Колбэк, вызываемый после успешного добавления видео
// для обновления списка видео в родительском компоненте
const AddVideo = ({ onVideoAdded }) => {
  // Локальное состояние компонента:
  // videoUrl - URL добавляемого видео с YouTube
  // error - текст ошибки при неудачном добавлении
  // success - сообщение об успешном добавлении
  const [videoUrl, setVideoUrl] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Обработчик отправки формы
  // 1. Предотвращает стандартное поведение формы
  // 2. Сбрасывает предыдущие сообщения об ошибках и успехе
  // 3. Проверяет наличие URL и авторизации
  // 4. Сохраняет видео в Firestore
  // 5. Вызывает колбэк для обновления родительского компонента
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!videoUrl) {
      setError("Please enter the video URL");
      return;
    }

    try {
      // Проверяем, авторизован ли пользователь
      const user = auth.currentUser;
      if (!user) {
        setError("Please log in");
        return;
      }

      // Сохраняем информацию о видео в коллекцию 'videos' в Firestore
      await addDoc(collection(db, "videos"), {
        user_id: user.uid,
        video: videoUrl,
        createdAt: new Date().toISOString(),
      });

      // Формируем объект с данными нового видео для колбэка
      const newVideo = {
        video: videoUrl,
        user_id: user.uid,
        createdAt: new Date().toISOString(),
      };

      // Вызываем колбэк для обновления списка видео в родительском компоненте
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
          <FontAwesomeIcon icon={faPlus} /> Add
        </button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default AddVideo;
