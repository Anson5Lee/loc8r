var mongoose = require('mongoose');
var Loc = mongoose.model('Location');
var sendJsonResponse = function (res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.reviewsCreate = function (req, res) {};

module.exports.reviewsReadOne = function (req, res) {
	if (req.params && req.params.locationid && req.params.reviewid) {
		Loc
			.findById(req.params.locationid)
			.select('name reviews')
			.exec(function (err, location) {
				var response, review;
				if (!location) {
					sendJsonResponse(res, 404, {
						"message" : "locationid not found"
					});
					console.log("The `if (!location) {}` block ran.");
					return;
				} else if (err) {
					sendJsonResponse(res, 404, err);
					console.log("The `else if (err) {}` block ran.");
					return;
				}
				if (location.reviews && location.reviews.length > 0) {
					thisReview = location.reviews.id(req.params.reviewid);
					if (!thisReview) {
						sendJsonResponse(res, 404, {
							"message" : "reviewid not found"
						});
						console.log(
							"\nThis error occurred the `if (!review) {}` block.\n" +
							"value of thisReview : " + thisReview + "\n" +
							"value of location.reviews.id(req.params.reviewid); : " +
							location.reviews.id(req.params.reviewid) + "\n" +
							"value of req.params.reviewid : " +
							req.params.reviewid
						);
					} else {
						response = {
							location: {
								name: location.name,
								id: req.params.locationid
							},
							review: thisReview
						};
						sendJsonResponse(res, 200, response);
					}
				} else {
					sendJsonResponse(res, 404, {
						"message" : "No reviews found"
					});
				}
			});
	} else {
		sendJsonResponse(res, 404, {
			"message" : "Not found: locationid and reviewid are required"
		});
		console.log("Not found.\nparams object: " + req.params + "\n locationid: "
			+ req.params.locationid + "\nvalue isn't found.");
	}
};
module.exports.reviewsUpdateOne = function (req, res) {};
module.exports.reviewsDeleteOne = function (req, res) {};
