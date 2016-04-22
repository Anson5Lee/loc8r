var express = require('express');
var router = express.Router();
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

/* GET Locations pages. */
router.get('/', ctrlLocations.homelist);
router.get('/location/:locationid', ctrlLocations.locationInfo);

/* GET Add Review Page */
router.get('/location/:locationid/reviews/new', ctrlLocations.addReview);

/* POST Review */
router.post('/location/:locationid/reviews/new', ctrlLocations.doAddReview);

/* GET Otherg page */
router.get('/about', ctrlOthers.about);

module.exports = router;
