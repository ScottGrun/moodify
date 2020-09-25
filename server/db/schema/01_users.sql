-- Drop and recreate Users table
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE,
  refresh_token VARCHAR(255) NOT NULL
);
