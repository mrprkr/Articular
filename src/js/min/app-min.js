var angular = angular;

var app = angular.module("app", [ "ngRoute" ]);

app.config(function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "src/html/home.html",
        controller: "mainController"
    }).when("/styleguide", {
        templateUrl: "src/html/styleguide.html",
        controller: "styleguideController"
    }).when("/documentation", {
        templateUrl: "src/html/documentation.html",
        controller: "documentationController"
    }).when("/design", {
        templateUrl: "src/html/design.html",
        controller: "designController"
    });
});

app.controller("mainController", function($scope) {
    $scope.test = "angular actually works!";
});

app.controller("designController", function($scope) {
    $scope.designTest = "scope works in Design";
});

app.controller("documentationController", function($scope) {
    $scope.designTest = "scope works in Design";
});

app.controller("styleguideController", function($scope) {
    $scope.designTest = "scope works in Design";
});