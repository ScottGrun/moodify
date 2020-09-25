-- Drop and recreate Presets table
DROP TABLE IF EXISTS presets CASCADE;

CREATE TABLE presets (
  preset_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  tags VARCHAR(255),
  acousticness FLOAT NOT NULL, -- 0.0 to 1.0
  danceability FLOAT NOT NULL, -- 0.0 to 1.0
  energy FLOAT NOT NULL, -- 0.0 to 1.0
  instrumentalness FLOAT NOT NULL, -- 0.0 to 1.0
  loudness FLOAT NOT NULL, -- -60.0 - 0.0
  speechiness FLOAT NOT NULL, -- 0.0 to 1.0
  valence FLOAT NOT NULL, -- 0.0 to 1.0
  tempo FLOAT NOT NULL, -- 0.0 +
  times_applied INTEGER,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE
);
