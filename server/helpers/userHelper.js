const addUser = function(db, user, refreshToken) {
  return db.query(`
  INSERT INTO users (id, refresh_token)
  VALUES ($1, $2)
  ON CONFLICT (id) 
  DO UPDATE SET refresh_token = EXCLUDED.refresh_token
  RETURNING *
  `, [user, refreshToken])
    .then(res => res.rows[0]);
};

module.exports = { addUser };
