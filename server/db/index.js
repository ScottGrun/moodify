const pg = require('pg');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} else {
    require('dotenv').config({ path: '/home/moodify/public_html/moodify/shared/.env' });
}

const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?sslmode=disable`;

const client = new pg.Client({
  connectionString: connectionString || process.env.DATABASE_URL,
});

console.log(`Connected to ${process.env.DB_NAME} on ${process.env.DB_HOST}`);
client.connect();

module.exports = client;
