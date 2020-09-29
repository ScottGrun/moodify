require('dotenv').config();

const express = require('express');
const axios = require('axios');
const spotifyApi = require('../helpers/spotifyApiHelper');
const router = express.Router();
const { 
  getUsersTracks, 
  parseAudioFeatures, 
  parseSongs, 
  getMinMax, 
  getAverageAudioFeatures
} = require('../helpers/trackRetrievalHelpers');

router.post('/playlist', async (req, res) => {
  const { accessToken, playlist_id, totalTracks } = req.body;
  const playlistTracks = [];
  const trackAudioFeatures = [];
  let parsedSongs = [];

  // gets all the tracks of the playlist
  let tracksReceived = 0;
  while (tracksReceived < totalTracks) {
    const playlistItems = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?offset=${tracksReceived}`,
      headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
    });
    tracksReceived += 100;
    playlistTracks.push(...playlistItems.data.items)
  }
  parsedSongs = parseSongs(playlistTracks);

  // get all the audio features of a track
  let songsAudioFeatures = 0;
  while (songsAudioFeatures < totalTracks) {
    const songIds = parsedSongs
      .map(song => song.id)
      .slice(songsAudioFeatures, songsAudioFeatures + 100)
      .join(',');

    const audioFeatures = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/audio-features?ids=${songIds}`,
      headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
    });
    songsAudioFeatures += 100;
    trackAudioFeatures.push(...audioFeatures.data.audio_features);
  }

  // format songs
  const allSongs = parsedSongs.map((song, index) => {
    return { ...song, audio: {...trackAudioFeatures[index]} };
  })

  res.send({
    songs: allSongs,
    minMax: getMinMax(allSongs),
    averages: getAverageAudioFeatures(allSongs),
  });
});

router.post('/', (req, res) => {
  //Set token with required scopes
  spotifyApi.setAccessToken(req.body.accessToken);

  //Get inital data from user and send to front-end
  getUsersTracks().then((data) => {
    res.send(data);
  });
});

module.exports = router;
