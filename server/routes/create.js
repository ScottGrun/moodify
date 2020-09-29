require('dotenv').config();

const axios = require('axios');
const express = require('express');
const spotifyApi = require('../helpers/spotifyApiHelper');
const router = express.Router();

const generateString = (length) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789 '.split('');
  let string = '';

  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * chars.length);
    string += chars[randIndex];
  }
  return string;
}

router.post('/playlist', async (req, res) => {
  let { accessToken, name, description, songs, imageUrl } = req.body;
  if (!name) name = generateString(8);
  if (!description) description = '';
  if (!imageUrl) imageUrl = 'https://i.imgur.com/GixTJ15_d.webp?maxwidth=728&fidelity=grand';
  if (!songs) {
    console.log('no songs');
    return;
  };

  // console.log('Name:', name, 'Description:', description, 'ImageUrl:', imageUrl, songs, accessToken);

  // get current user id
  const user_id = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + accessToken },
  }).then(res => res.data.id);

  // create playlist
  const playlist_id = await axios({
    method: 'post',
    url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
    headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
    data: { name, description }
  }).then(playlist => playlist.data.id);

  let songsAdded = 0;

  //add songs to playlist
  while (songsAdded < songs.length) {
    // IE. uris=spotify:track:4iV5W9uYEdYUVa79Axb7Rh, spotify:track:1301WleyT98MSxVHPZCA6M
    const uris = songs.splice(songsAdded, songsAdded + 100).join(', ');

    await axios({
      method: 'post',
      url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${uris}`,
      headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
      data: { name, description }
    });
  };

  console.log(playlist_id);
});

module.exports = router;
