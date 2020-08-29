const express = require('express');
const bodyParser = require('body-parser');

require('dotenv/config');

const app = express();

const apiGetRoute = require('./routes/api');

app.use(bodyParser.json());
app.use('/api', apiGetRoute);

app.listen(3000);
