var express = require('express');
var router = express.Router();
var mainController = require('../controllers/main');

var homepageController = function (req, res) {
	res.render('index', { title: 'Express' });
};

/* GET home page. */
router.get('/', mainController.index);

module.exports = router;