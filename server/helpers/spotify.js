const axios = require('axios');

const getUserId = async (accessToken) => {
  const user_id = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + accessToken },
  }).then(res => res.data.id);
  return user_id;
};

const getAudioFeaturesOfTracks = async (formattedTracks, accessToken) => {
  const trackAudioFeatures = [];
  let audioFeaturesReceived = 0;

  while (audioFeaturesReceived < formattedTracks.length) {
    const trackIds = formattedTracks
      .map(track => track.id)
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
    playlistTracks.push(...playlistItems.data.items)
  }
  return playlistTracks;
}

module.exports = {
  getUserId,
  getAudioFeaturesOfTracks,
  getTracksFromPlaylist
}