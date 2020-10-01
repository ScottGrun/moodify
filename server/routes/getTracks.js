require('dotenv').config();

const express = require('express');
const axios = require('axios');
const spotifyApi = require('../helpers/spotifyApiHelper');
const router = express.Router();
const { 
  getUsersTracks, 
  parseAudioFeatures, 
  formatTracks, 
  getMinMax, 
  getAverageAudioFeatures
} = require('../helpers/trackRetrievalHelpers');

const {
  getTracksFromPlaylist,
  addAudioFeaturesToTracks,
  getAudioFeaturesOfTracks
} = require('../helpers/utilHelper');


router.post('/playlist', async (req, res) => {
  const { accessToken, playlist_id, totalTracks } = req.body;
  
  const playlistTracks = await getTracksFromPlaylist(playlist_id, totalTracks, accessToken);
  const formattedTracks = formatTracks(playlistTracks);
  const trackAudioFeatures = await getAudioFeaturesOfTracks(formattedTracks, accessToken);
  const allTracks = addAudioFeaturesToTracks(formattedTracks, trackAudioFeatures);

  res.send({
    songs: allTracks,
    minMax: getMinMax(allTracks),
    averages: getAverageAudioFeatures(allTracks),
  });
});

router.post('/newSongs', async (req, res) => {
  const { accessToken } = req.body;
  const featuredPlaylistsTracks = [];

  const featuredPlaylists = await axios({
    method: 'get',
    url: `https://api.spotify.com/v1/browse/featured-playlists?limit=50`,
    headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
  });

  for (let playlist of featuredPlaylists.data.playlists.items) {
    const playlistTracks = await getTracksFromPlaylist(playlist.id, playlist.tracks.total, accessToken);
    featuredPlaylistsTracks.push(...playlistTracks);
  };

  const formattedTracks = formatTracks(featuredPlaylistsTracks);
  const trackAudioFeatures = await getAudioFeaturesOfTracks(formattedTracks, accessToken);
  const allTracks = addAudioFeaturesToTracks(formattedTracks, trackAudioFeatures);

  res.send({
    songs: allTracks,
    minMax: getMinMax(allTracks),
    averages: getAverageAudioFeatures(allTracks),
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
