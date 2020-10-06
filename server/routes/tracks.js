if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} else {
    require('dotenv').config({ path: '/home/moodify/public_html/moodify/shared/.env' });
}

const express = require('express');
const axios = require('axios');
const router = express.Router();
const {
  getAudioFeaturesOfTracks,
  getTracksFromPlaylist,
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
  const numOfRequests = Math.ceil(totalTracks / 50);
  let allTracks = new Array(numOfRequests).fill([]);
  for (let i = 0; i < numOfRequests; i++) {
    axios({
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?offset=${i * 50}`,
      headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
    })
    .then((rawTracks) => {
      let formattedTracks = formatTracks(rawTracks.data.items);
      getAudioFeaturesOfTracks(formattedTracks, accessToken)
      .then(audioFeatures => {
        let finalTracks = addAudioFeaturesToTracks(formattedTracks, audioFeatures);
        allTracks[i] = [...finalTracks];

        const allTracksLength = allTracks.reduce((total, tracks) => total + tracks.length, 0);
        if (allTracksLength >= totalTracks) {
          const result = [];
          allTracks.forEach(tracks => result.push(...tracks));
          
          res.send({
            songs: result,
            minMax: getMinMaxes(result),
            averages: getAverages(result),
          });
        }
      })
      .catch(err => res.sendStatus(err.response.status));
    })
    .catch(err => res.sendStatus(err.response.status));
  }
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
  const ms = new Date().getMilliseconds();
  const { accessToken } = req.body;
  const featuredPlaylistsTracks = [];

  const featuredPlaylists = await axios({
    method: 'get',
    url: `https://api.spotify.com/v1/browse/featured-playlists?limit=50`,
    headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
  }).catch((err) => res.sendStatus(err.response.status));

  const featuredSongsLength = featuredPlaylists.data.playlists.items.reduce((total, playlist) => total + playlist.tracks.total, 0);
 
  // loop through all playlists
  for (let playlist of featuredPlaylists.data.playlists.items) {
    const totalTracks = playlist.tracks.total;
    const playlistTracks = [];
    const numOfRequests = Math.ceil(totalTracks / 100);

    // get all songs of a playlist
    for (let i = 0; i < numOfRequests; i++) {
      axios({
        method: 'get',
        url: `https://api.spotify.com/v1/playlists/${playlist.id}/tracks?offset=${i * 100}`,
        headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
      })
      .then(rawTracks => {
        // extract required data
        const formattedTracks = formatTracks(rawTracks.data.items);

        // get audio features of the track
        getAudioFeaturesOfTracks(formattedTracks, accessToken, res)
        .then(trackAudioFeatures => {
          const allTracks = addAudioFeaturesToTracks(formattedTracks, trackAudioFeatures);
          playlistTracks.push(...allTracks);

          if (playlistTracks.length >= totalTracks) {
            featuredPlaylistsTracks.push(...playlistTracks);
            
            if (featuredPlaylistsTracks.length >= featuredSongsLength) {
              const now = new Date().getMilliseconds();
              
              res.send({
                songs: featuredPlaylistsTracks,
                minMax: getMinMaxes(featuredPlaylistsTracks),
                averages: getAverages(featuredPlaylistsTracks),
              });
            }
          }
        })
      })
      .catch(err => res.sendStatus(err.response.status));
    }
  }
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
    res,
  );
  
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

          const allTracksLength = allTracks.reduce((total, tracks) => total + tracks.length, 0);
          if (allTracksLength >= totalSongs) {
            const result = [];
            allTracks.forEach((tracks) => result.push(...tracks));

            res.send({
              songs: result,
              minMax: getMinMaxes(result),
              averages: getAverages(result),
            });
          }
        });
      })
      .catch(err => res.sendStatus(err.response.status));
    }
  })
  .catch(err => res.sendStatus(err.response.status));
});

module.exports = router;
