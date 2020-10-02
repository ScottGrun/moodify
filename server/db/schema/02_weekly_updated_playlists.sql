-- Drop and recreate Weekly Updated Playlists table
DROP TABLE IF EXISTS weekly_updated_playlists CASCADE;

CREATE TABLE weekly_updated_playlists (
  id VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
  audio_features JSON NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  removed_at TIMESTAMP DEFAULT NULL,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE
);
