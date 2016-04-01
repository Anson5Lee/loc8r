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
		rating: 3,
		address: "125 High Street, Reading, RG6 1PS",
		openingHours: [
			"Sunday	6AM–9PM",
			"Monday	5:30AM–9PM",
			"Tuesday 5:30AM–9PM",
			"Wednesday 5:30AM–9PM",
			"Thursday 5:30AM–9PM",
			"Friday	5:30AM–9PM",
			"Saturday 6AM–9PM"
		],
		facilities: ['Hot Drinks', 'Food', 'Premium Wifi'],
		locationMap: 'http://maps.googleapis.com/maps/api/staticmap?center=51.455041,-0.9690884&zoom=17&size=400x350&sensor=false&markers=51.455041,-0.9690884&scale=2',
		addReviewURL: '/location/review/new',
		custReviews: [{
			rating: 5,
			author: "Simon Holmes",
			timestamp: "16 July 2013",
			content: "What a great place. I can't say "
				   + "enough good things about it."
		},{
			rating: 3,
			author: "Charlie Chaplin",
			timestamp: "16 June 2013",
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