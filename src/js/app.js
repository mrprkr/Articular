// var screenNameList = [
// 	'Example Item',
// 	'Events Detail Entry Closed',
// 	'Events Ratings',
// 	'Ratings Overview',
// 	'Ratigns Detail',
// 	'Shop Catagories',
// 	'Shop Item Detail',
// 	'Shop Item Listing',
// 	'Global SA Footer',
// 	'Global State Footer',
// 	'Global SA Navigation',
// 	'Global State Navigation',
// 	'News Listing',
// 	'News Article',
// 	'Education Coaching',
// 	'Education Judging',
// 	'Generic Content Page',
// 	'Surfing Australia Homepage',
// 	'New South Wales Homepage',
// 	'Queensland Homepage',
// 	'South Australia Homepage',
// 	'Victoria Homepage',
// 	'Events Detail Entry Open'
// ];

var pageData = pageData;

//Initilise angular app
var angular = angular;
var app = angular.module('app', ['ngRoute', 'ng-contentful']);

app.config(function($routeProvider, contentfulClientProvider){
	$routeProvider
		.when('/', {
			templateUrl: "src/html/home.html",
			controller: 'mainController'
		})

		.when('/styleguide', {
			templateUrl: "src/html/styleguide.html",
			controller: 'styleguideController'
		})

		.when('/documentation', {
			templateUrl: "src/html/documentation.html",
			controller: 'documentationController'
		})

		.when('/design', {
			templateUrl: "src/html/design.html",
			controller: 'designController'
		})

		.otherwise({
			redirectTo: '/'
		});

	 contentfulClientProvider.setSpaceId('qj4662rfubip');
	 contentfulClientProvider.setAccessToken('c35b82ea8c5dad62950fa76f7a3c05459a8c4166b4d1ecdf7e52048757d6a50c');
});

//the main controller
app.controller('mainController', function($scope){
	$scope.test = "angular actually works!";
	$scope.list = pageData;
	
	$scope.listFilter = "";
	$scope.filterList = function(filter){
		$scope.listFilter = filter;
	};
	// $scope.addClass = function(class){
	// 	this.
	// }

});

app.controller('designController', function($scope){
	//design scope
	$scope.test = "test";
	$scope.list = pageData;

});

app.controller('documentationController', function($scope){
	//design scope
	$scope.designTest = "scope works in Design";

});

app.controller('styleguideController', function($scope){
	//design scope
	$scope.designTest = "scope works in Design";

});


