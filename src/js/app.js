//Initilise angular app
var angular = angular;
var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: "src/html/home.html",
			controller: 'mainController'
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
	$scope.designTest = "scope works in Design";

});