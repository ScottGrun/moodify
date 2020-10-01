require('dotenv').config();
const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const { addPreset } = require("../helpers/presetHelper");

module.exports = (db) => {
  
  router.post('/', (req, res) => {
    const user = req.session.userData;
    console.log(user);
  });
}