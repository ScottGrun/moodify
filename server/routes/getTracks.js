require('dotenv').config();
const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

//Initialize API
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/',
});

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

const parseSongs = (songList) => {
  const songs = songList.map((song) => ({
    name: song.track.name,
    id: song.track.id,
    artist: song.track.artists[0].name,
    img: song.track.album.images[2].url,
  }));
  return songs;
};

//Get MinMaxAudio Features
const getMinMax = (songs) => {
  let playlistAudioFeaturesMinMax = {
    energy: [songs[0].audio.energy, 0],
    danceability: [songs[0].audio.danceability, 0],
    valence: [songs[0].audio.valence, 0],
    speechiness: [songs[0].audio.speechiness, 0],
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

    if (song.audio.speechiness > playlistAudioFeaturesMinMax.speechiness[1]) {
      playlistAudioFeaturesMinMax.speechiness[1] = song.audio.speechiness;
    } else if (song.audio.speechiness < playlistAudioFeaturesMinMax.speechiness[0]) {
      playlistAudioFeaturesMinMax.speechiness[0] = song.audio.speechiness;
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
      playlistAudioFeaturesMinMax[key][1] = (60 + playlistAudioFeaturesMinMax[key][1]) / 60;
    } else if (key !== 'tempo') {
      playlistAudioFeaturesMinMax[key][1] = Math.round(playlistAudioFeaturesMinMax[key][1] * 100);
      playlistAudioFeaturesMinMax[key][0] = Math.round(playlistAudioFeaturesMinMax[key][0] * 100);
    }
  }

  return Object.values(playlistAudioFeaturesMinMax);
};

//Get average audio features for playlist

const getAverageAudioFeatures = (songs) => {
  let playlistAudioFeaturesAverages = {
    energy: 0,
    danceability: 0,
    valence: 0,
    speechiness: 0,
    loudness: 0,
  };

  songs.forEach((song) => {
    playlistAudioFeaturesAverages.energy += song.energy;
    playlistAudioFeaturesAverages.danceability += song.danceability;
    playlistAudioFeaturesAverages.valence += song.valence;
    playlistAudioFeaturesAverages.speechiness += song.speechiness;
    playlistAudioFeaturesAverages.loudness += song.loudness;
  });

  
  console.log(playlistAudioFeaturesAverages)

  return Object.values(playlistAudioFeaturesAverages);
};

router.post('/', (req, res) => {
  console.log(req.body.accessToken);

  //Set token with required scopes
  spotifyApi.setAccessToken(req.body.accessToken);

  let allSongs = [];

  spotifyApi
    .getMySavedTracks({
      limit: 50,
      offset: 1,
    })
    .then(async (data) => {
      let songCount = data.body.total;
      console.log(`Songs in Playlist : ${songCount}`);
      //Set total count of user songs

      //Push first 50 songs into array
      let songs = parseSongs(data.body.items);
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
            (data) => {
              let songs = parseSongs(data.body.items);
              let songIds = songs.map((song) => song.id);

              parseAudioFeatures(songIds).then((features) => {
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
      //Send data -
      console.log(allSongs.length);
      res.send(allSongs);
      console.log(getMinMax(allSongs));
      console.log('--averages---')
      console.log(getAverageAudioFeatures(allSongs));
      console.log('-----done-----');
    });
});

module.exports = router;

// let playlistAudioFeaturesAverages = {
//   energy: 0,
//   danceability: 0,
//   valence: 0,
//   speechiness: 0,
//   loudness: 0,
// };

// res.data.forEach((song) => {
//   playlistAudioFeaturesAverages.energy += song.energy;
//   playlistAudioFeaturesAverages.danceability += song.danceability;
//   playlistAudioFeaturesAverages.valence += song.valence;
//   playlistAudioFeaturesAverages.speechiness += song.speechiness;
//   playlistAudioFeaturesAverages.loudness += song.loudness;

//   if (song.audio.energy > playlistAudioFeaturesMinMax.energy[1]) {
//     playlistAudioFeaturesMinMax.energy[1] = song.audio.energy;
//   } else if (song.audio.energy < playlistAudioFeaturesMinMax.energy[0]) {
//     playlistAudioFeaturesMinMax.energy[1] = song.audio.energy;
//   }

//   if (song.audio.danceability > playlistAudioFeaturesMinMax.danceability[1]) {
//     playlistAudioFeaturesMinMax.danceability[1] = song.audio.danceability;
//   } else if (song.audio.danceability < playlistAudioFeaturesMinMax.danceability[0]) {
//     playlistAudioFeaturesMinMax.danceability[1] = song.audio.danceability;
//   }

//   if (song.audio.valence > playlistAudioFeaturesMinMax.valence[1]) {
//     playlistAudioFeaturesMinMax.valence[1] = song.audio.valence;
//   } else if (song.audio.valence < playlistAudioFeaturesMinMax.valence[0]) {
//     playlistAudioFeaturesMinMax.valence[1] = song.audio.valence;
//   }

//   if (song.audio.speechiness > playlistAudioFeaturesMinMax.speechiness[1]) {
//     playlistAudioFeaturesMinMax.speechiness[1] = song.audio.speechiness;
//   } else if (song.audio.speechiness < playlistAudioFeaturesMinMax.speechiness[0]) {
//     playlistAudioFeaturesMinMax.speechiness[1] = song.audio.speechiness;
//   }

//   if (song.audio.loudness > playlistAudioFeaturesMinMax.loudness[1]) {
//     playlistAudioFeaturesMinMax.loudness[1] = song.audio.loudness;
//   } else if (song.audio.loudness < playlistAudioFeaturesMinMax.loudness[0]) {
//     playlistAudioFeaturesMinMax.loudness[1] = song.audio.loudness;
//   }
// });

// for (const key in playlistAudioFeaturesMinMax) {
//   if (key === 'loudness') {
//     playlistAudioFeaturesMinMax[key][1] = (60 + playlistAudioFeaturesMinMax[key][1]) / 60;
//   }
//   playlistAudioFeaturesMinMax[key][1] = playlistAudioFeaturesMinMax[key][1] * 100;
// }

// setChartValues();
// });
