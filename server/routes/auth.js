require('dotenv').config();
const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const axios = require('axios');
const request = require('request');

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const redirect_uri = `http://localhost:3000/`;
var stateKey = 'spotify_auth_state';

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

router.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  const scope = 'user-read-email user-read-private playlist-read-private streaming user-read-email user-read-private user-library-read streaming playlist-modify-public playlist-read-collaborative user-modify-playback-state user-library-modify';
  res.send(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id,
        scope,
        redirect_uri,
        state,
        show_dialog: true,
      }),
  );
});

router.post('/token', (req, res) => {
  const code = req.body.code;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code',
      client_id,
      client_secret,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token,
        refresh_token = body.refresh_token;

      var options = {
        url: 'https://api.spotify.com/v1/me',
        headers: { Authorization: 'Bearer ' + access_token },
        json: true,
      };

      // use the access token to access the Spotify Web API
      // request.get(options, function(error, response, body) {
      //   console.log(body);
      // });

      // we can also pass the token to the browser to make requests from there
      res.send(access_token);
    } else {
      res.send(
        '/#' +
          querystring.stringify({
            error: 'invalid_token',
          }),
      );
    }
  });
});

module.exports = router;
