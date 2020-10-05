if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} else {
    require('dotenv').config({ path: '/home/moodify/public_html/moodify/shared/.env' });
}
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { clientRoot } = require("./env");

const authRouter = require('./routes/auth');
const tracksRouter = require('./routes/tracks');
const playlistsRouter = require('./routes/playlists');
const presetsRouter = require('./routes/presets');

const app = express();

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: clientRoot}));

app.use('/auth', authRouter(db));
app.use('/tracks', tracksRouter);
app.use('/playlists', playlistsRouter);
app.use('/presets', presetsRouter(db));

app.listen(9000, () => {
  console.log(`server listening on port 9000`);
});
