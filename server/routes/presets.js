const express = require('express');
const router = express.Router();
const { addPreset, getPopularPresets, getUserPresets, getUserLikedPresets, likePreset, unlikePreset } = require("../helpers/presetHelpers");

module.exports = (db) => {
  
  router.get('/popular', (req, res) => {
    getPopularPresets(db)
      .then(popularPresets => res.send(popularPresets))
      .catch(err => console.log(err));
  });
  
  router.get('/yourpresets', (req, res) => {
    const user = req.cookies.userData.replace(/"/g, '');
    console.log(user);
    getUserPresets(db, user)
      .then(userPresets => res.send(userPresets))
      .catch(err => console.log(err));
  });
  
  router.get('/yourlikedpresets', (req, res) => {
    const user = req.cookies.userData.replace(/"/g, '');
    console.log(user);
    getUserLikedPresets(db, user)
      .then(userLikedPresets => res.send(userLikedPresets))
      .catch(err => console.log(err));
  });

  router.post('/', (req, res) => {
    const preset = req.body;
    addPreset(db, preset)
      .then(preset => res.send(preset))
      .catch(err => console.log(err));
  });

  router.post('/:id/like', (req, res) => {
    const user = req.cookies.userData.replace(/"/g, '');
    const presetID = req.params.id;

    likePreset(db, presetID, user)
      .then(like => res.send(like))
      .catch(err => console.log(err));
  });

  router.post('/:id/unlike', (req, res) => {
    const user = req.cookies.userData.replace(/"/g, '');
    const presetID = req.params.id;

    unlikePreset(db, presetID, user)
      .then(unlike => res.send(unlike))
      .catch(err => console.log(err));
  });

  return router;
};
