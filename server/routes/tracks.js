require('dotenv').config();

const express = require('express');
const axios = require('axios');
const router = express.Router();
const {
  getAudioFeaturesOfTracks,
  getTracksFromPlaylist,
  getGenresFromArtists,
  getRecommendationsFromSeeds,
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
  const songs = songList.map((song, index) => {
    return {
      name: song.name,
      id: song.id,
      uid: index,
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
    const playlistTracks = await getTracksFromPlaylist(
      playlist.id,
      playlist.tracks.total,
      accessToken,
    );
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
  const { accessToken, recommendationSeeds, playlistMinMax } = req.body;
  const randomTracks = [];

  for (let i = 0; i < 5; i++) {
    const randomNum = Math.floor(Math.random() * recommendationSeeds.length);
    randomTracks.push(recommendationSeeds[randomNum].track_id);
  }

  //Get recomended tracks
  const myRecommendations = await getRecommendationsFromSeeds(
    accessToken,
    randomTracks,
    playlistMinMax,
  );
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

  let allTracks = [];
  let totalSongs = null;
  axios({
    method: 'get',
    url: `https://api.spotify.com/v1/me/tracks?offset=0&limit=50`,
    headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
  }).then((apiRes) => {
    totalSongs = apiRes.data.total;
    for (let i = 0; i <= Math.max(totalSongs / 50); i++) {
      axios({
        method: 'get',
        url: `https://api.spotify.com/v1/me/tracks?offset=${i * 50}&limit=50`,
        headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
      }).then((rawTracks) => {
        let formattedTracks = formatTracks(rawTracks.data.items);
        getAudioFeaturesOfTracks(formattedTracks, accessToken).then((audioFeatures) => {
          let finalTracks = addAudioFeaturesToTracks(formattedTracks, audioFeatures);

          allTracks.push(...finalTracks);

          if (allTracks.length === totalSongs) {
            console.log(`Server sent ${allTracks.length} songs.`);
            res.send({
              songs: allTracks,
              minMax: getMinMaxes(allTracks),
              averages: getAverages(allTracks),
            });
          }
        });
      });
    }
  });

  // while (apiEndpoint) {
  // axios({
  //   method: 'get',
  //   url: apiEndpoint,
  //   headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
  // });
  // apiEndpoint = tracks.data.next;
  // console.log('get tracks');

  // let formattedTracks = formatTracks(tracks.data.items);

  // getAudioFeaturesOfTracks(formattedTracks, accessToken).then((audioFeatures) => {
  //   let finalTracks = addAudioFeaturesToTracks(formattedTracks, audioFeatures);
  //   allTracks.push(...finalTracks);
  // });
  // }
});

module.exports = router;
