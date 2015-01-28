//Initilise angular app
var angular = angular;
var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
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
		});
});

//the main controller
app.controller('mainController', function($scope){
	$scope.test = "angular actually works!";

});

app.controller('designController', function($scope){
	//design scope
	$scope.sidebarItems = ["Global", "Home", "Events", "News"];

});

app.controller('documentationController', function($scope){
	//design scope
	$scope.designTest = "scope works in Design";

});

app.controller('styleguideController', function($scope){
	//design scope
	$scope.designTest = "scope works in Design";

});

