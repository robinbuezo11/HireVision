const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const host = process.env.API_HOST || 'localhost';
const port = process.env.API_PORT || 3000;

const indexRouter = require('./routes/index');

app.use(cors());
app.use(express.json( { limit: '50mb' } ));

app.use('/', indexRouter);

app.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});