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
      console.log('-----done-----');
    });
});

module.exports = router;
