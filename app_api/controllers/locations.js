var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

var sendJsonResponse = function (res, status, content) {
	res.status(status);
	res.json(content);
};

var theEarth = (function(){
	var earthRadius = 6371; //km

	var getDistanceFromRads = function(rads) {
		return parseFloat(rads * earthRadius);
	};
	var getRadsFromDistance = function(distance) {
		return parseFloat(distance / earthRadius);
	};
	return {
		getDistanceFromRads : getDistanceFromRads,
		getRadsFromDistance : getRadsFromDistance
	};
})();

/* GET list of locations */
module.exports.locationsListByDistance = function (req, res) {
	var lng = parseFloat(req.query.lng);
	var lat = parseFloat(req.query.lat);
	var maxDistance = parseFloat(req.query.maxDistance);
	var point = {
		type: "Point",
		coordinates: [lng, lat]
	};
	var geoOptions = {
		spherical: true,
		maxDistance: theEarth.getRadsFromDistance(maxDistance), // sets max distance: 20 km
		num: 10
	};
	if (!lng || !lat || !maxDistance) {
		console.log('locationsListByDistance missing params');
		sendJSONresponse(res, 404, {
			"message" : "lng, lat and maxDistance query parameters are all required"
		});
		return;
	}
	Loc.geoNear(point, geoOptions, function(err, results, stats) {
		var locations;
		console.log('Geo Results', results);
		console.log('Geo Stats', stats);
		if (err) {
			console.log('geoNear error:', err);
			sendJsonResponse(res, 404, err);
		} else {
			locations = buildLocationList(req, res, results, stats);
			sendJsonResponse(res, 200, locations);
		}
	});
};

var buildLocationList = function (req, res, results, stats) {
	var locations = [];
	results.forEach(function(doc) {
		locations.push({
			distance: theEarth.getDistanceFromRads(doc.dis),
			name: doc.obj.name,
			address: doc.obj.address,
			rating: doc.obj.rating,
			facilites: doc.obj.facilities,
			_id: doc.obj._id
		});
	});
	return locations;
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
