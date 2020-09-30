require('dotenv').config();

const axios = require('axios');
const express = require('express');
const spotifyApi = require('../helpers/spotifyApiHelper');
const router = express.Router();
const { generateString, getUserId } = require('../helpers/utilHelper');

router.post('/create', async (req, res) => {
  let { accessToken, name, description, uris, imageUrl } = req.body;
  if (!name) name = generateString(8);
  if (!description) description = '';
  if (uris.length === 0) {
    console.log('no songs');
    return;
  };
  
  const user_id = await getUserId(accessToken);
  
  // create playlist
  const playlist_id = await axios({
    method: 'post',
    url: `https://api.spotify.com/v1/users/${user_id}/playlists`,
    headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
    data: { name, description }
  }).then(playlist => playlist.data.id);
  
  //add songs to playlist
  let songsAdded = 0;
  while (songsAdded < uris.length) {
    const songURIS = uris.splice(songsAdded, songsAdded + 50).join(',');

    await axios({
      method: 'post',
      url: `https://api.spotify.com/v1/playlists/${playlist_id}/tracks?uris=${songURIS}`,
      headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
      data: { name, description }
    });
    songsAdded += 100;
  };
  res.send('New playlist created and songs added!');
});

router.post('/ids', async (req, res) => {
  const { accessToken } = req.body;

  axios({
    method: 'get',
    url: `https://api.spotify.com/v1/me/playlists?limit=50`,
    headers: { Authorization: 'Bearer ' + accessToken, 'Content-Type': 'application/json' },
  }).then(playlists => {
    res.send(playlists.data.items)
  });
});

module.exports = router;
