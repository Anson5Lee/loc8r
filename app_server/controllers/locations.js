// GET Home page
module.exports.homelist = function(req, res) {
	
/*	The second parameter is a data object being sent
	to the view (the locations-list.jade file).		*/
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
		locations: [{
			name: 'Starcups',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 3,
			facilities: ['Hot Drinks', 'Food', 'Premium Wifi'],
			distance: '100m'
		},{
			name: 'Cafe Hero',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 4,
			facilities: ['Hot Drinks', 'Food', 'Premium Wifi'],
			distance: '220m'
		},{
			name: 'Burger Queen',
			address: '125 High Street, Reading, RG6 1PS',
			rating: 2,
			facilities: ['Hot Drinks', 'Food'],
			distance: '350m'
		}]

	});
};
// GET Location Info page
module.exports.locationInfo = function(req, res) {
	res.render('location-info', { 
		title: 'Starcups Info',
		address: "125 High Street, Reading, RG6 1PS",
		rating: 3,
		facilities: ['Hot Drinks', 'Food', 'Premium Wifi'],
		coords: {lat: 51.455041, lng: -0.9690884},
		openingTimes: [{
			days: 'Monday - Friday',
			opening: '7:00am',
			closing: '7:00pm',
			closed: false
		},{
			days: 'Saturday',
			opening: '8:00am',
			closing: '5:00pm',
			closed: false
		},{
			days: 'Sunday',
			closed: true
		}],
		addReviewURL: '/location/review/new',
		reviews: [{
			author: 'Simon Holmes',
			rating: 5,	
			createdOn: '16 July 2013',
			content: "What a great place. I can't say "
				   + "enough good things about it."
		},{
			author: "Charlie Chaplin",
			rating: 3,	
			createdOn: "16 June 2013",
			content: 
				"it was okay.. coffee wasn't great, " 
			  + "but the wifi was fast."
		}],
		description: 
			"Simon's cafe is on Loc8r because it has " 
		  + "accessible wifi and space to sit down " 
		  + "with your laptop and get some work done.",
		endNote: 
			"If you've been here and you like it--or " 
		  + "if you don't-- please leave a review to " 
		  + "help other people just like you."


	});
};

// GET Add Review page
module.exports.addReview = function(req, res) {
	res.render('location-review-form', { title: 'Add Review' });
};