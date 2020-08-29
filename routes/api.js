const express = require('express');

const router = express.Router();

const nasaApi = `https://api.nasa.gov/planetary/earth/imagery?lon=
                    ${longitud}&lat=${latitude}&api_key=${process.env.NASA_API_KEY}`;

router.get('/get', (req, res) => {
	res.send('api get');
});

module.exports = router;
