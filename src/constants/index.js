/**
 * Константы состояний плеера YouTube
 * @constant {Object}
 */
export const YT_PLAYER_STATES = {
  UNSTARTED: -1,
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

/**
 * Настройки плеера YouTube по умолчанию
 * @constant {Object}
 */
export const DEFAULT_YOUTUBE_OPTS = {
  height: '100%',
  width: '100%',
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
