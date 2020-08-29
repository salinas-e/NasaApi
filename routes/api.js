const express = require('express');

const DIM = 0.251;
const NASA_API = `https://api.nasa.gov/planetary/earth/imagery?date=2020-08-15&`;
const COORD_REGEX = '-?[0-9]{1,3}[.][0-9]+';

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
	let error = 'Input valid coordinates';
	const coord = req.query.coord.split(',');

	const strLat = coord[0];
	const strLong = coord[1];

	if (strLat && strLong) {
		const resultRegexLat = strLat.match(COORD_REGEX);
		const resultRegexLong = strLong.match(COORD_REGEX);

		if (resultRegexLat[0] === strLat) error = '';

		if (resultRegexLong[0] === strLong) error = '';
	}

	if (error === '') {
		const latitude = parseFloat(coord[0]);
		const longitude = parseFloat(coord[1]);

		res.render('earth', { nasaUrls: getUrl(latitude, longitude) });
	} else {
		res.render('index', { error: error });
	}
});

module.exports = router;
