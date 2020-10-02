const addPreset = function(db, preset) {
  return db.query(`
  INSERT INTO presets (name, image_url, audio_features, user_id)
  VALUES ($1, $2, $3, $4)
  RETURNING *
  `, [preset.name, preset.image_url, preset.audio_features, preset.user_id])
    .then(res => res.rows[0]);
};

const getPopularPresets = function(db) {
  return db.query(`
  SELECT *
  FROM presets
  ORDER BY likes DESC
  LIMIT 25
  `)
    .then(res => res.rows);
};

const getUserPresets = function(db, user) {
  return db.query(`
  SELECT *
  FROM presets
  WHERE user_id = $1
  `, [user])
    .then(res => {
      console.log(user.length);
      return res.rows;
    });
};

module.exports = { addPreset, getPopularPresets, getUserPresets };
