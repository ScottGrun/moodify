
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

      playlistAudioFeaturesAverages[key] = playlistAudioFeaturesAverages[key] / songs.length;
    } else {
      playlistAudioFeaturesAverages[key] = Math.round(
        (playlistAudioFeaturesAverages[key] / songs.length) * 100,
      );
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

//Get MinMaxAudio Features
export const getMinMaxes = (songs) => {
  let playlistAudioFeaturesMinMax = {
    energy: [songs[0].audio.energy, 0],
    danceability: [songs[0].audio.danceability, 0],
    valence: [songs[0].audio.valence, 0],
    instrumentalness: [songs[0].audio.instrumentalness, 0],
    loudness: [songs[0].audio.loudness, 0],
    tempo: [songs[0].audio.tempo, 0],
  };

  songs.forEach(song => {
    if (song.audio.energy > playlistAudioFeaturesMinMax.energy[1]) {
      playlistAudioFeaturesMinMax.energy[1] = song.audio.energy;
    } else if (song.audio.energy < playlistAudioFeaturesMinMax.energy[0]) {
      playlistAudioFeaturesMinMax.energy[0] = song.audio.energy;
    }

    if (song.audio.danceability > playlistAudioFeaturesMinMax.danceability[1]) {
      playlistAudioFeaturesMinMax.danceability[1] = song.audio.danceability;
    } else if (song.audio.danceability < playlistAudioFeaturesMinMax.danceability[0]) {
      playlistAudioFeaturesMinMax.danceability[0] = song.audio.danceability;
    }

    if (song.audio.valence > playlistAudioFeaturesMinMax.valence[1]) {
      playlistAudioFeaturesMinMax.valence[1] = song.audio.valence;
    } else if (song.audio.valence < playlistAudioFeaturesMinMax.valence[0]) {
      playlistAudioFeaturesMinMax.valence[0] = song.audio.valence;
    }

    if (song.audio.instrumentalness > playlistAudioFeaturesMinMax.instrumentalness[1]) {
      playlistAudioFeaturesMinMax.instrumentalness[1] = song.audio.instrumentalness;
    } else if (song.audio.instrumentalness < playlistAudioFeaturesMinMax.instrumentalness[0]) {
      playlistAudioFeaturesMinMax.instrumentalness[0] = song.audio.instrumentalness;
    }

    if (song.audio.loudness > playlistAudioFeaturesMinMax.loudness[1]) {
      playlistAudioFeaturesMinMax.loudness[1] = song.audio.loudness;
    } else if (song.audio.loudness < playlistAudioFeaturesMinMax.loudness[0]) {
      playlistAudioFeaturesMinMax.loudness[0] = song.audio.loudness;
    }

    if (song.audio.tempo > playlistAudioFeaturesMinMax.tempo[1]) {
      playlistAudioFeaturesMinMax.tempo[1] = song.audio.tempo;
    } else if (song.audio.tempo < playlistAudioFeaturesMinMax.tempo[0]) {
      playlistAudioFeaturesMinMax.tempo[0] = song.audio.tempo;
    }
  });
};