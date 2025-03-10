/**
 * Утилиты для работы с видео
 */

/**
 * Форматирует длительность видео в читаемый формат
 * @param {number} duration - Длительность в секундах
 * @returns {string} Отформатированная длительность (например, "5:23")
 */
export const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

/**
 * Получает URL превью видео YouTube
 * @param {string} videoId - Идентификатор видео YouTube
 * @param {string} quality - Качество превью (default, hq, mq, sd)
 * @returns {string} URL превью
 */
export const getYouTubeThumbnail = (videoId, quality = 'mq') => {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
};

/**
 * Проверяет валидность ID видео YouTube
 * @param {string} videoId - Идентификатор видео для проверки
 * @returns {boolean} Результат проверки
 */
export const isValidYouTubeId = (videoId) => {
  const pattern = /^[a-zA-Z0-9_-]{11}$/;
  return pattern.test(videoId);
};