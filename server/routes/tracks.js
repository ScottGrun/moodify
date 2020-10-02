require('dotenv').config();

const express = require('express');
const axios = require('axios');
const router = express.Router();
const {
  getAudioFeaturesOfTracks,
  getTracksFromPlaylist,
  getGenresFromArtists,
  getRecommendationsFromSeeds
} = require('../helpers/spotify');

const {
  formatTracks,
  getMinMaxes,
  getAverages,
  addAudioFeaturesToTracks,
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

const formatTracksRecommendations = (songList) => {
  const songs = songList.map((song) => {
    return {
      name: song.name,
      id: song.id,
      artist: song.artists[0].name,
      artist_id: song.artists[0].id,
      img: song.album.images[2] ? song.album.images[2].url : null,
      previewUrl: song.preview_url,
      uri: song.uri,
    };
  });
  return songs;
};

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
  }
  const formattedTracks = formatTracks(featuredPlaylistsTracks);
  const trackAudioFeatures = await getAudioFeaturesOfTracks(formattedTracks, accessToken);
  const allTracks = addAudioFeaturesToTracks(formattedTracks, trackAudioFeatures);

  res.send({
    songs: allTracks,
    minMax: getMinMaxes(allTracks),
    averages: getAverages(allTracks),
  });
});

router.post('/recommendations', async (req, res) => {
  const { accessToken, recomendationSeeds, playlistMinMax } = req.body;
  const randomTracks = [];
  const randomArtists = [];
  let randomGenres = [];

  for (let i = 0; i < 5; i++) {
    const randomNum = Math.floor(Math.random() * recomendationSeeds.length);
    randomTracks.push(recomendationSeeds[randomNum].track_id);
  }

  for (let i = 0; i < 5; i++) {
    const randomNum = Math.floor(Math.random() * recomendationSeeds.length);
    randomArtists.push(recomendationSeeds[randomNum].artist_id);
  }
  
  randomGenres = await getGenresFromArtists(accessToken, randomArtists);
  randomGenres = randomGenres.filter(randomGenres => randomGenres !== undefined);
 
  if (randomGenres.length < 1) {
    randomGenres = ['Test', 'Pop'];
  }

  //Get recomended tracks
  const myRecommendations = await getRecommendationsFromSeeds(accessToken, randomTracks, playlistMinMax);
  const formattedTracks = formatTracksRecommendations(myRecommendations);
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

  let apiEndpoint = `https://api.spotify.com/v1/me/tracks?limit=50`;
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
