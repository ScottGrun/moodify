const spotifyApi = require('./spotifyApiHelper');

const parseAudioFeatures = async (songList) => {
  let data = await spotifyApi.getAudioFeaturesForTracks(songList).then(
    (res) => {
      return res.body.audio_features;
    },
    (err) => {
      console.log(err);
    },
  );
  return data;
};

//Parse songs into easier to use format
const formatTracks = (songList) => {
  const songs = songList.map((song) => ({
    name: song.track.name,
    id: song.track.id,
    artist: song.track.artists[0].name,
    img: song.track.album.images[2].url,
    previewUrl: song.track.preview_url,
    uri: song.track.uri
  }));
  return songs;
};

//Get MinMaxAudio Features
const getMinMax = (songs) => {
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
      playlistAudioFeaturesMinMax[key][1] = Math.trunc((60 + playlistAudioFeaturesMinMax[key][1]) / 60);
    } else if (key !== 'tempo') {
      playlistAudioFeaturesMinMax[key][1] = Math.trunc(Math.round(playlistAudioFeaturesMinMax[key][1] * 100));
      playlistAudioFeaturesMinMax[key][0] = Math.trunc(Math.round(playlistAudioFeaturesMinMax[key][0] * 100));
    }
  }

  return playlistAudioFeaturesMinMax;
};

//Get average audio features for playlist
const getAverageAudioFeatures = (songs) => {
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

const getUsersTracks = async () => {
  let allSongs = [];
  await spotifyApi
    .getMySavedTracks({
      limit: 50,
      offset: 1,
    })
    .then(async (data) => {
      let songCount = data.body.total;
      console.log(`Songs in Playlist : ${songCount}`);
      //Set total count of user songs

      //Push first 50 songs into array
      let songs = formatTracks(data.body.items);
      let songIds = songs.map((song) => song.id);

      parseAudioFeatures(songIds).then((features) => {
        songs.forEach((song, idx) => {
          song['audio'] = features[idx];
        });
        allSongs.push(...songs);
      });

      //Makes the required network requests till all songs fetched (50 per request)
      for (let i = 1; i * 50 <= songCount; i++) {
        await spotifyApi
          .getMySavedTracks({
            limit: 50,
            offset: i * 50,
          })
          .then(
            async (data) => {
              let songs = formatTracks(data.body.items);
              let songIds = songs.map((song) => song.id);

              await parseAudioFeatures(songIds).then((features) => {
                songs.forEach((song, idx) => {
                  song['audio'] = features[idx];
                });
                allSongs.push(...songs);
              });
            },
            (err) => {
              console.log('Something went wrong!', err);
            },
          );
      }
    })
    .then(() => {
      return allSongs;
    });
  return {
    songs: allSongs,
    minMax: getMinMax(allSongs),
    averages: getAverageAudioFeatures(allSongs),
  };
};

module.exports = {
  getUsersTracks, 
  parseAudioFeatures, 
  formatTracks, 
  getMinMax, 
  getAverageAudioFeatures
};
