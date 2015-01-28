var pageData = pageData;

var angular = angular;

var app = angular.module("app", [ "ngRoute", "ng-contentful" ]);

app.config(function($routeProvider, contentfulClientProvider) {
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
    }).otherwise({
        redirectTo: "/"
    });
    contentfulClientProvider.setSpaceId("qj4662rfubip");
    contentfulClientProvider.setAccessToken("c35b82ea8c5dad62950fa76f7a3c05459a8c4166b4d1ecdf7e52048757d6a50c");
});

app.controller("mainController", function($scope) {
    $scope.test = "angular actually works!";
    $scope.list = pageData;
    $scope.listFilter = "";
    $scope.filterList = function(filter) {
        $scope.listFilter = filter;
    };
});

app.controller("designController", function($scope) {
    $scope.test = "test";
    $scope.list = pageData;
});

app.controller("documentationController", function($scope) {
    $scope.designTest = "scope works in Design";
});

app.controller("styleguideController", function($scope) {
    $scope.designTest = "scope works in Design";
});