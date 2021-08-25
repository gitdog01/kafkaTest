const express = require('express');
const { shot } = require('../loader/kafka');
const router = express.Router();

/* GET home page. */
router.get('/shot', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
