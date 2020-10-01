require('dotenv').config();
const express = require('express');
const router = express.Router();
const { addPreset } = require("../helpers/presetHelper");

module.exports = (db) => {
  
  router.post('/', (req, res) => {
    const preset = req.body;
    addPreset(db, preset)
      .then(preset => res.send(preset))
      .catch((err) => {
        console.log(err);
      });
  });

  return router;
};
