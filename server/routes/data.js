require('dotenv').config();
const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const axios = require('axios');
const request = require('request');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = `http://localhost:3000/`;

router.post('/track', (req, res) => {
  const accessToken = req.body.accessToken;

  axios({
    method: 'get',
    url: 'https://api.spotify.com/v1/tracks/3n3Ppam7vgaVa1iaRUc9Lp',
    headers: { Authorization: `Bearer ${accessToken}` }
  })
  .then(trackData => {
    res.send(JSON.stringify(trackData.data));
  });

});



module.exports = router;