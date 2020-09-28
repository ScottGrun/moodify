require('dotenv').config();

const express = require('express');
const spotifyApi = require('../helpers/spotifyApiHelper');
const router = express.Router();

const { getUsersTracks } = require('../helpers/trackRetrivalHelpers');

router.post('/', (req, res) => {
  //Set token with required scopes
  spotifyApi.setAccessToken(req.body.accessToken);

  //Get inital data from user and send to front-end
  getUsersTracks().then((data) => {
    res.send(data);
  });
});

module.exports = router;
