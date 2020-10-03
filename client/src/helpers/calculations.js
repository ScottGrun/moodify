
//Get average of audio features for playlist
export function getAverages(songs) {
  let playlistAudioFeaturesAverages = {
    energy: 0,
    danceability: 0,
    valence: 0,
    instrumentalness: 0,
    loudness: 0,
  };

  songs.forEach((song) => {
    playlistAudioFeaturesAverages.energy += song.audio.energy;
    playlistAudioFeaturesAverages.danceability += song.audio.danceability;
    playlistAudioFeaturesAverages.valence += song.audio.valence;
    playlistAudioFeaturesAverages.instrumentalness += song.audio.instrumentalness;
    playlistAudioFeaturesAverages.loudness += song.audio.loudness + 60;
  });

  for (const key in playlistAudioFeaturesAverages) {
    if (key === 'loudness') {
      playlistAudioFeaturesAverages[key] = Math.round(
        playlistAudioFeaturesAverages[key] / songs.length);
    } else {
      playlistAudioFeaturesAverages[key] = Math.round(
        (playlistAudioFeaturesAverages[key] / songs.length) * 100);
    }
  }
  return Object.values(playlistAudioFeaturesAverages);
};

// get total duration of songs
export function getTotalDuration(filteredTracks) {
  function formatTime(seconds) {
    let hours = Math.floor(seconds / 60 / 60);
    seconds -= hours * 60 * 60;
    let minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    seconds = Math.round(seconds);

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;         
  }

  if (!filteredTracks) return;

  const totalMs = filteredTracks.reduce((total, track) => {
    return total + track.audio.duration_ms;
  },0);

  const totalSeconds = totalMs / 1000;
  return formatTime(totalSeconds);
};

export function getAudioFeatures(audioFeatures) {
  let { danceability, energy, instrumentalness, loudness, tempo, valence } = audioFeatures;

  danceability *= 100;
  energy *= 100;
  instrumentalness *= 100;
  valence *= 100;

  const newFeatures = {
    danceability: [Math.max(0, danceability - 15), Math.min(100, danceability + 15)],
    energy: [Math.max(0, energy - 15), Math.min(100, energy + 15)],
    instrumentalness: [Math.max(0, instrumentalness - 15), Math.min(100, instrumentalness + 15)],
    valence: [Math.max(0, valence - 15), Math.min(100, valence + 15)],
    loudness: [Math.max(-60, loudness - 6), Math.min(0, loudness + 6)],
    tempo: [Math.max(0, tempo - 15), tempo + 15],
  }

  for (let feature in newFeatures) {
    newFeatures[feature] = [ Math.round(newFeatures[feature][0]), Math.round(newFeatures[feature][1]) ];
  }

  return newFeatures;
};