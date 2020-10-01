const addUser = function(db, user, refreshToken) {
  return db.query(`
  INSERT INTO users (id, refresh_token)
  VALUES ($1, $2)
  RETURNING *
  `, [user, refreshToken])
    .then(res => res.rows[0]);
};

module.exports = { addUser };
