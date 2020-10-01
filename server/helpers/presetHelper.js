const addPreset = function(db, preset) {
  return db.query(`
  INSERT INTO presets (name, image_url, audio_features, user_id)
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `, [preset.name, preset.image_url, preset.audio_features, preset.user_id])
    .then(res => res.rows[0]);
};

module.exports = { addPreset };
