-- Drop and recreate User_likes table

DROP TABLE IF EXISTS user_likes CASCADE;
CREATE TABLE user_likes (
  id SERIAL PRIMARY KEY NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  removed_at TIMESTAMP DEFAULT NULL,
  preset_id INTEGER REFERENCES presets(id) ON DELETE CASCADE,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX user_likes_unique_user_id_and_preset_id
ON user_likes(user_id, preset_id)
WHERE removed_at IS NULL;
