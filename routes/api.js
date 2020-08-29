const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

const nasaApi = `https://api.nasa.gov/planetary/earth/imagery`;

router.get('/get', async (req, res) => {
	const longitude = parseFloat(req.query.longitude);
	const latitude = parseFloat(req.query.latitude);

	const dim = 0.25;

	const nasaApiMainUrl = nasaApi + `?lon=${longitude}&lat=${latitude}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiUpUrl =
		nasaApi + `?lon=${longitude}&lat=${latitude + dim}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiDownUrl =
		nasaApi + `?lon=${longitude}&lat=${latitude - dim}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiLeftUrl =
		nasaApi + `?lon=${longitude - dim}&lat=${latitude}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiRightUrl =
		nasaApi + `?lon=${longitude - dim}&lat=${latitude}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiUpLeftUrl =
		nasaApi + `?lon=${longitude - dim}&lat=${latitude + dim}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiUpRightUrl =
		nasaApi + `?lon=${longitude + dim}&lat=${latitude + dim}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiDownLeftUrl =
		nasaApi + `?lon=${longitude - dim}&lat=${latitude - dim}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;
	const nasaApiDownRightUrl =
		nasaApi + `?lon=${longitude + dim}&lat=${latitude - dim}&api_key=${process.env.NASA_API_KEY}&dim=${dim}`;

	const nasaUrls = {
		main: nasaApiMainUrl,
		up: nasaApiUpUrl,
		down: nasaApiDownUrl,
		left: nasaApiLeftUrl,
		right: nasaApiRightUrl,
		upLeft: nasaApiUpLeftUrl,
		upRight: nasaApiUpRightUrl,
		downLeft: nasaApiDownLeftUrl,
		downRight: nasaApiDownRightUrl
	};

	res.send(nasaUrls);
});

module.exports = router;
