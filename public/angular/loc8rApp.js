angular.module('loc8rApp', []);

var locationListCtrl = function ($scope, loc8rData) {
  $scope.message = "Searching for nearby places...";
  loc8rData
    .success(function (data) {
      $scope.message = data.length > 0 ? "" : "No locations found.";
      $scope.data = { locations: data };
  }).error(function (e) {
      $scope.message = "Sorry, something went wrong.";
      console.log(e);
  });
};


// var _isNumeric = function (n) {
//   return !isNaN(parseFloat(n)) && isFinite(n);
// };

var formatDistance = function () {
  return function (distance) {
    if ( distance && !isNaN(parseFloat(distance) && isFinite(distance)) ) {
  		var numDistance, unit;
  		numDistance = parseFloat(distance).toFixed(1);
  		if (numDistance > 1) {
  			unit = 'miles';
  		} else {
  			unit = 'mile';
  		}
  		return numDistance + ' ' + unit;
  	} else {
  		return "NaN";
  	}
  }
};

var ratingStars = function () {
  return {
    scope : {
      thisRating : '=rating'
    },
    templateUrl : "/angular/rating-stars.html"
  };
};

var loc8rData = function ($http) {
  return $http.get('/api/locations?lng=-86.14141&lat=40.04334&maxDistance=20');
};

angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars)
  .service('loc8rData', loc8rData);
