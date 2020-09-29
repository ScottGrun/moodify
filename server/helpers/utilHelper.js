const axios = require('axios');

const generateString = (length) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789 '.split('');
  let string = '';

  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * chars.length);
    string += chars[randIndex];
  }
  return string;
};

const getUserId = async (accessToken) => {
  const user_id = await axios.get('https://api.spotify.com/v1/me', {
    headers: { Authorization: 'Bearer ' + accessToken },
  }).then(res => res.data.id);
  return user_id;
};

module.exports = {
  generateString,
  getUserId
}