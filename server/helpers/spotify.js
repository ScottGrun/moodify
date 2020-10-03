const axios = require('axios');

const getUserId = async (accessToken) => {
  const user_id = await axios
    .get('https://api.spotify.com/v1/me', {
      headers: { Authorization: 'Bearer ' + accessToken },
    })
    .then((res) => res.data.id);
  return user_id;
};

const getAudioFeaturesOfTracks = async (formattedTracks, accessToken) => {
  const trackAudioFeatures = [];
  let audioFeaturesReceived = 0;

  while (audioFeaturesReceived < formattedTracks.length) {
    const trackIds = formattedTracks
      .map((track) => track.id)
      .slice(audioFeaturesReceived, audioFeaturesReceived + 100)
      .join(',');

    const audioFeatures = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/audio-features?ids=${trackIds}`,
      headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
    });
    audioFeaturesReceived += 100;
    trackAudioFeatures.push(...audioFeatures.data.audio_features);
  }
  return trackAudioFeatures;
};

const getGenresFromArtists = async (accessToken, artistIds) => {
  const genres = await axios({
    method: 'get',
    url: `https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`,
    headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
  });

  return genres.data.artists.map((artist) => artist.genres[0]);
};

const getTracksFromPlaylist = async (playlist_id, totalTracks, accessToken) => {
  const playlistTracks = [];
  let tracksReceived = 0;

  while (tracksReceived < totalTracks) {
    const playlistItems = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?offset=${tracksReceived}`,
      headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
    });
    tracksReceived += 100;
    playlistTracks.push(...playlistItems.data.items);
  }
  return playlistTracks;
};

const getRecommendationsFromSeeds = async (accessToken, trackIds, playlistMinMax) => {
  trackIds = trackIds.join(',');

  for (let attr in playlistMinMax.data) {
    if (attr === 'loudness' || attr === 'tempo') continue;
    playlistMinMax.data[attr][0] = playlistMinMax.data[attr][0] / 100;
    playlistMinMax.data[attr][1] = playlistMinMax.data[attr][1] / 100;
  }

  const { danceability, energy, instrumentalness, loudness, tempo, valence } = playlistMinMax.data;

  // 
  const recommendations = await axios({
    method: 'get',
    url: `https://api.spotify.com/v1/recommendations?limit=10&seed_tracks=${trackIds}&min_danceability=${danceability[0]}&max_danceability=${danceability[1]}&min_energy=${energy[0]}&max_energy=${energy[1]}&min_instrumentalness=${instrumentalness[0]}&max_instrumentalness=${instrumentalness[1]}&min_loudness=${loudness[0]}&max_loudness=${loudness[1]}&min_tempo=${tempo[0]}&max_tempo=${tempo[1]}&min_valence=${valence[0]}&max_valence=${valence[1]}`,
    headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
  });

  return recommendations.data.tracks;
};

module.exports = {
  getUserId,
  getAudioFeaturesOfTracks,
  getTracksFromPlaylist,
  getGenresFromArtists,
  getRecommendationsFromSeeds,
};
