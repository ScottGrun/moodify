const generateString = (length) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789 '.split('');
  let string = '';

  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * chars.length);
    string += chars[randIndex];
  }
  return string;
};

//format
const formatTracks = (songList) => {
  const songs = songList
    .filter(song => song.track)
    .map((song, index) => {
      return {
        name: song.track.name,
        id: song.track.id,
        uid: index,
        artist: song.track.artists[0].name,
        artist_id: song.track.artists[0].id,
        img: song.track.album.images[2] ? song.track.album.images[2].url : null,
        previewUrl: song.track.preview_url,
        uri: song.track.uri,
      };
    });
  return songs;
};

//Get MinMaxAudio Features
const getMinMaxes = (songs) => {
  if (!songs.length) return;
  const { energy, danceability, valence, instrumentalness, loudness, tempo } = songs[0].audio;

  let playlistAudioFeaturesMinMax = {
    energy: [energy, 0],
    danceability: [danceability, 0],
    valence: [valence, 0],
    instrumentalness: [instrumentalness, 0],
    loudness: [loudness, loudness],
    tempo: [tempo, 0],
  };

  songs.forEach((song) => {
    const { energy, danceability, valence, instrumentalness, loudness, tempo } = song.audio;

    if (energy > playlistAudioFeaturesMinMax.energy[1]) {
      playlistAudioFeaturesMinMax.energy[1] = energy;
    } else if (energy < playlistAudioFeaturesMinMax.energy[0]) {
      playlistAudioFeaturesMinMax.energy[0] = energy;
    }

    if (danceability > playlistAudioFeaturesMinMax.danceability[1]) {
      playlistAudioFeaturesMinMax.danceability[1] = danceability;
    } else if (danceability < playlistAudioFeaturesMinMax.danceability[0]) {
      playlistAudioFeaturesMinMax.danceability[0] = danceability;
    }

    if (valence > playlistAudioFeaturesMinMax.valence[1]) {
      playlistAudioFeaturesMinMax.valence[1] = valence;
    } else if (valence < playlistAudioFeaturesMinMax.valence[0]) {
      playlistAudioFeaturesMinMax.valence[0] = valence;
    }

    if (instrumentalness > playlistAudioFeaturesMinMax.instrumentalness[1]) {
      playlistAudioFeaturesMinMax.instrumentalness[1] = instrumentalness;
    } else if (instrumentalness < playlistAudioFeaturesMinMax.instrumentalness[0]) {
      playlistAudioFeaturesMinMax.instrumentalness[0] = instrumentalness;
    }

    if (loudness > playlistAudioFeaturesMinMax.loudness[1]) {
      playlistAudioFeaturesMinMax.loudness[1] = loudness;
    } else if (loudness < playlistAudioFeaturesMinMax.loudness[0]) {
      playlistAudioFeaturesMinMax.loudness[0] = loudness;
    }

    if (tempo > playlistAudioFeaturesMinMax.tempo[1]) {
      playlistAudioFeaturesMinMax.tempo[1] = tempo;
    } else if (tempo < playlistAudioFeaturesMinMax.tempo[0]) {
      playlistAudioFeaturesMinMax.tempo[0] = tempo;
    }
  });

  for (const key in playlistAudioFeaturesMinMax) {
    if (key !== 'tempo' && key !== 'loudness') {
      playlistAudioFeaturesMinMax[key][0] = Math.round(playlistAudioFeaturesMinMax[key][0] * 100);
      playlistAudioFeaturesMinMax[key][1] = Math.round(playlistAudioFeaturesMinMax[key][1] * 100);
    }
  }
  playlistAudioFeaturesMinMax.tempo[0] = Math.round(playlistAudioFeaturesMinMax.tempo[0]);
  playlistAudioFeaturesMinMax.tempo[1] = Math.round(playlistAudioFeaturesMinMax.tempo[1]);
  playlistAudioFeaturesMinMax.loudness[0] = Math.round(playlistAudioFeaturesMinMax.loudness[0]);
  playlistAudioFeaturesMinMax.loudness[1] = Math.round(playlistAudioFeaturesMinMax.loudness[1]);

  return playlistAudioFeaturesMinMax;
};

//Get average audio features for playlist
const getAverages = (songs) => {
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
      playlistAudioFeaturesAverages[key] = Math.round(playlistAudioFeaturesAverages[key] / songs.length);
    } else {
      playlistAudioFeaturesAverages[key] = Math.round(
        (playlistAudioFeaturesAverages[key] / songs.length) * 100,
      );
    }
  }
  return Object.values(playlistAudioFeaturesAverages);
};

const addAudioFeaturesToTracks = (parsedTracks, trackAudioFeatures) => {
  const formattedSongs = parsedTracks.map((song, index) => {
    return { ...song, audio: { ...trackAudioFeatures[index] } };
  });
  return formattedSongs;
};

module.exports = {
  generateString,
  formatTracks,
  getMinMaxes,
  getAverages,
  addAudioFeaturesToTracks,
};
