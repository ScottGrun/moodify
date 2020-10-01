require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const dataRouter = require('./routes/data');
const getTracksRouter = require('./routes/getTracks');
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
app.use(cors());

app.use('/auth', authRouter(db));
app.use('/data', dataRouter);
app.use('/getTracks', getTracksRouter);
app.use('/playlists', playlistsRouter);
app.use('/presets', presetsRouter(db));

app.get('/', (req, res) => {
  res.send('hi');
});

app.listen(9000, () => {
  console.log(`server listening on port 9000`);
});
