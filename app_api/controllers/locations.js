var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function (res, status, content) {
	res.status(status);
	res.json(content);
};

module.exports.locationsListByDistance = function (req, res) {
	sendJsonResponse(res, 200, {"status" : "success"});
	console.log(req);
};
module.exports.locationsCreate = function (req, res) {
};
module.exports.locationsReadOne = function (req, res) {
	if (req.params && req.params.locationid) {
		Loc
			.findById(req.params.locationid)
			.exec(function (err, location) {
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
				sendJsonResponse(res, 200, location);
				console.log("All seemingly went well!");
			});	
	} else {
		sendJsonResponse(res, 404, {
			"message" : "No locationid in request."
		});
		console.log("Either the params object: " + req.params + "\nor the locationid: "
			+ req.params.locationid + "\nvalue isn't found.");
	}
};
	
module.exports.locationsUpdateOne = function (req, res) {};
module.exports.locationsDeleteOne = function (req, res) {};