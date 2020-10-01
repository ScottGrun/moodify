require('dotenv').config();

const express = require('express');
const axios = require('axios');
const router = express.Router();
const {
  getAudioFeaturesOfTracks,
  getTracksFromPlaylist
} = require('../helpers/spotify');

const {
  formatTracks,
  getMinMaxes,
  getAverages,
  addAudioFeaturesToTracks
} = require('../helpers/util');

// get tracks from specific playlist
router.post('/playlist', async (req, res) => {
  const { accessToken, playlist_id, totalTracks } = req.body;
  
  const playlistTracks = await getTracksFromPlaylist(playlist_id, totalTracks, accessToken);
  const formattedTracks = formatTracks(playlistTracks);
  const trackAudioFeatures = await getAudioFeaturesOfTracks(formattedTracks, accessToken);
  const allTracks = addAudioFeaturesToTracks(formattedTracks, trackAudioFeatures);

  res.send({
    songs: allTracks,
    minMax: getMinMaxes(allTracks),
    averages: getAverages(allTracks),
  });
});

// get tracks from featured playlists
router.post('/featured', async (req, res) => {
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
    minMax: getMinMaxes(allTracks),
    averages: getAverages(allTracks),
  });
});

// get user's saved tracks
router.post('/saved', async (req, res) => {
  const { accessToken } = req.body;
  const myTracks = [];
  
  let apiEndpoint = `https://api.spotify.com/v1/me/tracks?limit=50`
  while (apiEndpoint) {
    const tracks = await axios({
      method: 'get',
      url: apiEndpoint,
      headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
    });
    apiEndpoint = tracks.data.next;
    myTracks.push(...tracks.data.items);
  }

  const formattedTracks = formatTracks(myTracks);
  const trackAudioFeatures = await getAudioFeaturesOfTracks(formattedTracks, accessToken);
  const allTracks = addAudioFeaturesToTracks(formattedTracks, trackAudioFeatures);

  res.send({
    songs: allTracks,
    minMax: getMinMaxes(allTracks),
    averages: getAverages(allTracks),
  });
});

module.exports = router;
