const express = require('express');
const router = express.Router();
const { addPreset, getPopularPresets, getUserPresets } = require("../helpers/presetHelpers");

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
  
  router.post('/', (req, res) => {
    const preset = req.body;
    addPreset(db, preset)
      .then(preset => res.send(preset))
      .catch(err => console.log(err));
  });

  return router;
};
