let currentSongPlaying = { stop: () => {}, key: null };

const setCurrentSongPlaying = (key, stopCallback) => {
  if (currentSongPlaying.key === key) {
    return true;
  }
  currentSongPlaying.key = key;
  currentSongPlaying.stop();
  currentSongPlaying.stop = stopCallback;

  return true;
};

module.exports = setCurrentSongPlaying;
