const express = require('express');

const router = express.Router();

router.get('/get', (req, res) => {
	res.send('api get');
});

module.exports = router;
