let currentSongPlaying = {
  stop: () => {},
  play: () => {},
  sameSongPlay: () => {},
  key: null,
  timer: null,
};

const setCurrentSongPlaying = async (
  key,
  stopCallback,
  playCallback,
  sameSongPlayCallback
) => {
  if (currentSongPlaying.key === key) {
    console.log("Clicked Same Song");
    currentSongPlaying.sameSongPlay();

    return true;
  }

  currentSongPlaying.sameSongPlay = sameSongPlayCallback;
  currentSongPlaying.play = playCallback;
  const timer = setTimeout(() => {
    currentSongPlaying.play();

    //Overide and stop
    currentSongPlaying.stop();
    currentSongPlaying.key = key;

    currentSongPlaying.stop = stopCallback;
  }, 300);

  clearTimeout(currentSongPlaying.timer);
  currentSongPlaying.timer = timer;
};

module.exports = setCurrentSongPlaying;
