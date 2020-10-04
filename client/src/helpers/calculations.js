
//Get average of audio features for playlist
export function getAverages(songs) {
  let energy = 0;
  let danceability = 0;
  let valence = 0;
  let instrumentalness = 0;
  let loudness = 0;

  songs.forEach(song => {
    energy += song.audio.energy;
    danceability += song.audio.danceability;
    valence += song.audio.valence;
    instrumentalness += song.audio.instrumentalness;
    loudness += song.audio.loudness + 60;
  });

  energy = Math.round((energy / songs.length) * 100);
  danceability = Math.round((danceability / songs.length) * 100);
  valence = Math.round((valence / songs.length) * 100);
  instrumentalness = Math.round((instrumentalness / songs.length) * 100);
  loudness = Math.round(loudness / songs.length);

  return [energy, danceability, valence, instrumentalness, loudness];
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
    danceability: [Math.max(0, danceability - 10), Math.min(100, danceability + 10)],
    energy: [Math.max(0, energy - 10), Math.min(100, energy + 10)],
    instrumentalness: [Math.max(0, instrumentalness - 10), Math.min(100, instrumentalness + 10)],
    valence: [Math.max(0, valence - 10), Math.min(100, valence + 10)],
    loudness: [Math.max(-60, loudness - 4), Math.min(0, loudness + 4)],
    tempo: [Math.max(0, tempo - 10), tempo + 10],
  }

  for (let feature in newFeatures) {
    newFeatures[feature] = [ Math.round(newFeatures[feature][0]), Math.round(newFeatures[feature][1]) ];
  }

  return newFeatures;
};