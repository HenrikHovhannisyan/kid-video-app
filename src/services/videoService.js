import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Получает список всех видео из базы данных
 * @returns {Promise<Array>} Массив объектов видео
 */
export const getVideos = async () => {
  try {
    const videosCollection = collection(db, 'videos');
    const videoSnapshot = await getDocs(videosCollection);
    return videoSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Ошибка при получении видео:', error);
    throw error;
  }
};

/**
 * Получает информацию о конкретном видео по ID
 * @param {string} videoId - Идентификатор видео
 * @returns {Promise<Object>} Объект с информацией о видео
 */
export const getVideoById = async (videoId) => {
  try {
    const videoDoc = doc(db, 'videos', videoId);
    const videoSnapshot = await getDoc(videoDoc);
    
    if (!videoSnapshot.exists()) {
      throw new Error('Видео не найдено');
    }

    return {
      id: videoSnapshot.id,
      ...videoSnapshot.data()
    };
  } catch (error) {
    console.error('Ошибка при получении видео:', error);
    throw error;
  }
};