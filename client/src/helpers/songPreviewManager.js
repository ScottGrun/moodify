let currentSongPlaying = {
  stop: () => {},
  play: () => {},
  key: null,
  timer: null,
};

const setCurrentSongPlaying = async (key, stopCallback, playCallback) => {
  // if (currentSongPlaying.key === key) {
  //   return true;
  // }

  currentSongPlaying.play = playCallback;
  const timer = setTimeout(() => {
    if (currentSongPlaying.key === key) {
      currentSongPlaying.play = playCallback;

      currentSongPlaying.play();
    } else {
      //Overide and stop
      currentSongPlaying.play();

      currentSongPlaying.stop();
      currentSongPlaying.key = key;

      currentSongPlaying.stop = stopCallback;
    }
  }, 300);

  clearTimeout(currentSongPlaying.timer);
  currentSongPlaying.timer = timer;
};

module.exports = setCurrentSongPlaying;
