angular.module('loc8rApp', []);

var locationListCtrl = function ($scope) {
  $scope.data = {
    locations: [{
      name: 'Starbucks',
      address: '318 W 161st St, Westfield, IN 46074',
      rating: 5,
      facilities: [ 'Hot Drinks', 'Food', 'Premium Wifi', 'Chess' ],
      distance: '0.522115 miles',
      _id: '570c1dc6dbe80bcd6ba2630e'
    },{
      name: 'Panera Bread',
      address: '2001 E Greyhound Pass #4E, Carmel, IN 46033',
      rating: 4,
      facilities: [ 'Hot Drinks', 'Food', 'Premium Wifi' ],
      distance: '2.5632 miles',
      _id: '57022276c944227d05dc95de'
    }]
  };
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

angular
  .module('loc8rApp')
  .controller('locationListCtrl', locationListCtrl)
  .filter('formatDistance', formatDistance)
  .directive('ratingStars', ratingStars);
