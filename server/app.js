// const db = require('./db');
// const dbHelpers = require('./helpers/dbHelpers')(db);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const tracksRouter = require('./routes/tracks');
const playlistsRouter = require('./routes/playlists');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/auth', authRouter);
app.use('/tracks', tracksRouter);
app.use('/playlists', playlistsRouter);

app.listen(9000, () => {
  console.log(`server listening on port 9000`);
});
