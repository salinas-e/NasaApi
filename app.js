const express = require('express');
const bodyParser = require('body-parser');

require('dotenv/config');

const app = express();

const apiGetRoute = require('./routes/api');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use('/', apiGetRoute);

app.listen(3000);
