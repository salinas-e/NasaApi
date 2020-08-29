const express = require('express');
require('dotenv/config');

const app = express();

const apiGetRoute = require('./routes/api');

app.use('/api', apiGetRoute);

app.listen(3000);
