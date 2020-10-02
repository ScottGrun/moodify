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
  const songs = songList.map((song, index) => {
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
  let playlistAudioFeaturesMinMax = {
    energy: [songs[0].audio.energy, 0],
    danceability: [songs[0].audio.danceability, 0],
    valence: [songs[0].audio.valence, 0],
    instrumentalness: [songs[0].audio.instrumentalness, 0],
    loudness: [songs[0].audio.loudness, 0],
    tempo: [songs[0].audio.tempo, 0],
  };

  songs.forEach((song) => {
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

  for (const key in playlistAudioFeaturesMinMax) {
    if (key === 'loudness') {
      playlistAudioFeaturesMinMax[key][1] = Math.trunc(
        (60 + playlistAudioFeaturesMinMax[key][1]) / 60,
      );
    } else if (key !== 'tempo') {
      playlistAudioFeaturesMinMax[key][1] = Math.trunc(
        Math.round(playlistAudioFeaturesMinMax[key][1] * 100),
      );
      playlistAudioFeaturesMinMax[key][0] = Math.trunc(
        Math.round(playlistAudioFeaturesMinMax[key][0] * 100),
      );
    }
  }
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
      playlistAudioFeaturesAverages[key] = playlistAudioFeaturesAverages[key] / songs.length;
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
