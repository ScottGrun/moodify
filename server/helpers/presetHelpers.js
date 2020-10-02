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

const getUserPresets = function(db, userID) {
  return db.query(`
  SELECT *
  FROM presets
  WHERE user_id = $1
  `, [userID])
    .then(res => {
      return res.rows;
    });
};

const getUserLikedPresets = function(db, userID) {
  return db.query(`
  SELECT presets.*
  FROM user_likes
  INNER JOIN presets
  ON presets.id = user_likes.preset_id 
  WHERE user_likes.user_id = $1
  AND user_likes.removed_at IS NULL
  `, [userID])
    .then(res => {
      return res.rows;
    });
};

const likePreset = function(db, presetID, userID) {
  return db.query(`
  INSERT INTO user_likes (preset_id, user_id)
  VALUES ($1, $2)
  RETURNING *
  `, [presetID, userID])
    .then(res => res.rows);
};

const unlikePreset = function(db, presetID, userID) {
  return db.query(`
  UPDATE user_likes
  SET removed_at = now()
  WHERE preset_id = $1
  AND user_id = $2
  RETURNING *
  `, [presetID, userID])
    .then(res => res.rows);
};

module.exports = { addPreset, getPopularPresets, getUserPresets, getUserLikedPresets, likePreset, unlikePreset };
