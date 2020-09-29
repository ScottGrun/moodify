require('dotenv').config();

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

router.post('/playlist', (req, res) => {
  let { accessToken, name, description, songs, imageUrl } = req.body;
  if (!name) name = generateString(8);
  if (!description) description = '';
  if (!imageUrl) imageUrl = 'https://i.imgur.com/GixTJ15_d.webp?maxwidth=728&fidelity=grand';
  if (!songs) {
    console.log('no songs');
    return;
  };

  console.log('Name:', name, 'Description:', description, 'ImageUrl:', imageUrl, songs, accessToken);

  spotifyApi.setAccessToken(accessToken);

  spotifyApi.getUserPlaylists('jeffreycao')
  .then(function(data) {
    console.log('Retrieved playlists', data.body);
  },function(err) {
    console.log('Something went wrong!', err);
  });
});

module.exports = router;
