let currentSongPlaying = { stop: () => {}, key: null };

const setCurrentSongPlaying = (key, stopCallback) => {
  if (currentSongPlaying.key === key) {
    // currentSongPlaying.stop();
    // currentSongPlaying.stop = stopCallback;
    console.log(currentSongPlaying.key);
    return true;
  }
  currentSongPlaying.key = key;
  currentSongPlaying.stop();
  currentSongPlaying.stop = stopCallback;
};

module.exports = setCurrentSongPlaying;
