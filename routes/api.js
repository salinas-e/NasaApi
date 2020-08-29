const express = require('express');
const fetch = require('node-fetch');
const { url } = require('inspector');

const DIM = 0.251;
const NASA_API = `https://api.nasa.gov/planetary/earth/imagery?date=2020-08-15&`;

const router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});

const buildUrl = (longitude, latitude) => {
	return (
		NASA_API +
		`lon=${longitude.toFixed(3)}&lat=${latitude.toFixed(3)}&api_key=${process.env.NASA_API_KEY ||
			'DEMO_KEY'}&dim=${DIM}`
	);
};

const getUrl = (latitude, longitude) => {
	let urls = [];
	for (let r = 1; r >= -1; r--) {
		for (let c = -1; c <= 1; c++) {
			urls.push(buildUrl(longitude + c * DIM, latitude + r * DIM));
		}
	}

	return urls;
};

router.get('/render', (req, res) => {
	const coord = req.query.coord.split(',');

	const latitude = parseFloat(coord[0]);
	const longitude = parseFloat(coord[1]);

	res.render('earth', { nasaUrls: getUrl(latitude, longitude) });
});

module.exports = router;
