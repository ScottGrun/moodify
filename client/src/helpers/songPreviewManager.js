const debounce = require("debounce");

let currentSongPlaying = {
  stop: () => {},
  play: () => {},
  key: null,
  timer: null,
};

const setCurrentSongPlaying = async (key, stopCallback, playCallback) => {
  if (currentSongPlaying.key === key) {
    console.log(currentSongPlaying.key);
    return true;
  }

  currentSongPlaying.play = playCallback;
  const timer = setTimeout(() => {
    currentSongPlaying.play();

    //Overide and stop
    currentSongPlaying.key = key;
    currentSongPlaying.stop();
    currentSongPlaying.stop = stopCallback;
  }, 300);

  clearTimeout(currentSongPlaying.timer);
  currentSongPlaying.timer = timer;
};

module.exports = setCurrentSongPlaying;
