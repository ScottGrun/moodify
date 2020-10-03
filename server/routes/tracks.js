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

  const playlistTracks = await getTracksFromPlaylist(playlist_id, totalTracks, accessToken, res);
  const formattedTracks = formatTracks(playlistTracks);
  const trackAudioFeatures = await getAudioFeaturesOfTracks(formattedTracks, accessToken, res);
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
  })
  .catch(err => res.sendStatus(err.response.status));;

  for (let playlist of featuredPlaylists.data.playlists.items) {
    const playlistTracks = await getTracksFromPlaylist(playlist.id, playlist.tracks.total, accessToken, res);
    featuredPlaylistsTracks.push(...playlistTracks);
  }
  const formattedTracks = formatTracks(featuredPlaylistsTracks);
  const trackAudioFeatures = await getAudioFeaturesOfTracks(formattedTracks, accessToken, res);
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
  const myRecommendations = await getRecommendationsFromSeeds(accessToken, randomTracks, playlistMinMax, res);
  const formattedTracks = formatTracksRecommendations(myRecommendations);
  const trackAudioFeatures = await getAudioFeaturesOfTracks(formattedTracks, accessToken, res);
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

  let allTracks;
  let totalSongs = null;
  let numOfRequests;

  axios({
    method: 'get',
    url: `https://api.spotify.com/v1/me/tracks?offset=0&limit=50`,
    headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
  })
  .then((apiRes) => {
    totalSongs = apiRes.data.total;
    numOfRequests = Math.ceil(totalSongs / 50);
    allTracks = new Array(numOfRequests).fill([]);

    for (let i = 0; i < numOfRequests; i++) {
      axios({
        method: 'get',
        url: `https://api.spotify.com/v1/me/tracks?offset=${i * 50}&limit=50`,
        headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
      })
      .then((rawTracks) => {
        let formattedTracks = formatTracks(rawTracks.data.items);
        getAudioFeaturesOfTracks(formattedTracks, accessToken).then((audioFeatures) => {
          let finalTracks = addAudioFeaturesToTracks(formattedTracks, audioFeatures);
          allTracks[i] = [...finalTracks];

          if (allTracks.reduce((total, tracks) => total + tracks.length,0) === totalSongs) {
            console.log(`Server sent ${allTracks.length} songs.`);

            const result = [];
            allTracks.forEach(tracks => result.push(...tracks));

            res.send({
              songs: result,
              minMax: getMinMaxes(result),
              averages: getAverages(result),
            });
          }
        });
      })
      .catch(err => res.sendStatus(res.response.status));
    }
  })
  .catch(err => res.sendStatus(res.response.status));
});

module.exports = router;
