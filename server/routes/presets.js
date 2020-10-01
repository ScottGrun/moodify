require('dotenv').config();
const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const { addPreset } = require("../helpers/presetHelper");

module.exports = (db) => {
  
  router.post('/', (req, res) => {
    const preset = req.body;
    // console.log(preset);
    addPreset(db, preset)
      .then(preset => preset.data);
      
  });

  return router;
};
