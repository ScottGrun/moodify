const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRouter = require('./routes/auth');
const dataRouter = require('./routes/data');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/auth', authRouter);
app.use('/data', dataRouter);

app.get('/', (req, res) => {
  res.send('hi');
});

app.listen(9000, () => {
  console.log(`server listening on port 9000`);
});
