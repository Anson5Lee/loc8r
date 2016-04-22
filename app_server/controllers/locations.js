var request = require('request');
var apiOptions = {
	server : "http://localhost:3000"
};
if (process.env.NODE_ENV === 'production') {
	apiOptions.server = "https://agile-plains-60437.herokuapp.com/"
}

var renderHomepage = function (req, res, responseBody) {
	var message;
	if ( !(responseBody instanceof Array) ) {
		message = "API lookup error";
		responseBody = [];
	} else {
		if (!responseBody.length) {
			message = "No places found nearby";
		}
	}
	res.render('locations-list', {
		title: 'Loc8r - find a place to work with wifi',
		pageHeader: {
			title: 'Loc8r',
			strapline: "Find places to work with wifi near you!"
		},
		sidebar:
			  "Looking for wifi and a seat? Loc8r helps you "
		  + "find places to work when out and about. Perhaps with "
		  + "coffee, cake or a pint? Let Loc8r help you find the "
		  + "place you're looking for.",
		locations: responseBody,
		message: message
	});
};
var renderDetailPage = function (req, res, locDetail) {
	res.render('location-info', {
		title: locDetail.name,
		pageHeader: {title: locDetail.name},
		sidebar: {
			context:
				"is on Loc8r because it has "
			+ "accessible wifi and space to sit down "
			+ "with your laptop and get some work done.",
			callToAction:
				"If you've been here and you like it--or "
			+ "if you don't-- please leave a review to "
			+ "help other people just like you."
		},
		location: locDetail
	});
};

var _showError = function (req, res, status) {
	var title, content;
	if (status === 404) {
		title = "404, page not found";
		content = "Houston........ uh..... we have a problem."
	} else {
		title = status + ", something went wrong.";
		content = "What have you done.... Why are you doing this to me? :'(";
	}
	res.status(status);
	res.render('generic-text', {
		title : title,
		content : content
	});
};

// GET Home page
module.exports.homelist = function(req, res) {
	var requestOptions, path;
	path = '/api/locations';
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {},
		qs : {
			lng : -86.15674960000001,
			lat : 40.0406897,
			maxDistance : 10	// miles
		}
	};
	request(
		requestOptions,
		function(err, response, body) {
			if (err) {
				console.log("Error: " + err);
			}
			var i, data;
			data = body;
			if (response.statusCode === 200 && data.length) {
				for (i = 0; i < data.length; i++) {
					data[i].distance = _formatDistance(data[i].distance);
				}
			}
			renderHomepage(req, res, data);
		}
	);

	var _formatDistance = function (distance) {
		if ( distance && !isNaN(parseFloat(distance) && isFinite(distance)) ) {
			var numDistance, unit;
			numDistance = parseFloat(distance).toFixed(1);
			if (distance > 1) {
				unit = 'miles';
			} else {
				unit = 'mile';
			}
			return numDistance + ' ' + unit;
		} else {
			return "NaN";
		}
	};
};

var getLocationInfo = function (req, res, callback) {
	var requestOptions, path;
	path = "/api/locations/" + req.params.locationid;
	requestOptions = {
		url : apiOptions.server + path,
		method : "GET",
		json : {}
	};
	request(
		requestOptions,
		function(err, response, body) {
			var data = body;
			if (response.statusCode === 200) {
				data.coords = {
					lng : body.coords[0],
					lat : body.coords[1]
				};
				callback(req, res, data);
			} else {
				_showError(req, res, response.statusCode);
			}
		}
	);
};

var renderReviewForm = function (req, res, locDetail) {
	res.render('location-review-form', {
		title: 'Review ' + locDetail.name + ' on Loc8r',
		pageHeader: { title: 'Review ' + locDetail.name }
	});
};
/* GET Location Info page */
module.exports.locationInfo = function(req, res) {
	getLocationInfo(req, res, function (req, res, responseData) {
		renderDetailPage(req, res, responseData);
	});
};
/* GET 'Add Review' page */
module.exports.addReview = function(req, res) {
	getLocationInfo(req, res, function (req, res, responseData) {
		renderReviewForm(req, res, responseData);
	});
};

// POST Review
module.exports.doAddReview = function(req, res) {
	var requestOptions, path, locationid, postdata;
	locationid = req.params.locationid;
	path = '/api/locations/' + locationid + '/reviews';
	postdata = {
		author : req.body.name,
		rating : parseInt(req.body.rating),
		content : req.body.review
	};
	requestOptions = {
		url : apiOptions.server + path,
		method : "POST",
		json : postdata
	};
	request(
		requestOptions,
		function (err, response, body) {
			if (response.statusCode === 201) {
				res.redirect('/location/' + locationid);
			} else {
				_showError(req, res, response.statusCode);
			}
		}
	);
};
