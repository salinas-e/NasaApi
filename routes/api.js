const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

const nasaApi = `https://api.nasa.gov/planetary/earth/imagery?date=2020-08-15&`;

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/render', (req, res) => {
	const coord = req.query.coord.split(',');

	const longitude = parseFloat(coord[1]);
	const latitude = parseFloat(coord[0]);

	const dim = 0.25;

	const nasaApiMainUrl = nasaApi + `lon=${longitude}&lat=${latitude}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiUpUrl =
		nasaApi + `lon=${longitude}&lat=${latitude + dim}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiDownUrl =
		nasaApi + `lon=${longitude}&lat=${latitude - dim}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiLeftUrl =
		nasaApi + `lon=${longitude - dim}&lat=${latitude}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiRightUrl =
		nasaApi + `lon=${longitude - dim}&lat=${latitude}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiUpLeftUrl =
		nasaApi + `lon=${longitude - dim}&lat=${latitude + dim}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiUpRightUrl =
		nasaApi + `lon=${longitude + dim}&lat=${latitude + dim}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiDownLeftUrl =
		nasaApi + `lon=${longitude - dim}&lat=${latitude - dim}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiDownRightUrl =
		nasaApi + `lon=${longitude + dim}&lat=${latitude - dim}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;

	let nasaUrls = [];

	nasaUrls.push(nasaApiUpLeftUrl);
	nasaUrls.push(nasaApiUpUrl);
	nasaUrls.push(nasaApiUpRightUrl);

	nasaUrls.push(nasaApiLeftUrl);
	nasaUrls.push(nasaApiMainUrl);
	nasaUrls.push(nasaApiRightUrl);

	nasaUrls.push(nasaApiDownLeftUrl);
	nasaUrls.push(nasaApiDownUrl);
	nasaUrls.push(nasaApiDownRightUrl);

	res.render('earth', { nasaUrls: nasaUrls });
});

module.exports = router;
