const SpotifyWebApi = require('spotify-web-api-node');

//Initialize API
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: 'http://localhost:3000/',
});

module.exports = spotifyApi;
