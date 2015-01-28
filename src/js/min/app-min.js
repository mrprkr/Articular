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
    }).when("/design/:id", {
        templateUrl: "src/html/design.html",
        controller: "designController"
    }).otherwise({
        redirectTo: "/"
    });
    contentfulClientProvider.setSpaceId("qj4662rfubip");
    contentfulClientProvider.setAccessToken("c35b82ea8c5dad62950fa76f7a3c05459a8c4166b4d1ecdf7e52048757d6a50c");
});

app.controller("mainController", function($scope, contentfulClient) {
    contentfulClient.entries().then(function(entries) {
        $scope.entries = entries;
    });
    $scope.listFilter = "";
    $scope.filterList = function(filter) {
        $scope.listFilter = filter;
    };
    $scope.indexOf = function(item) {
        var x = $scope.entries.indexOf(item);
        return x;
    };
});

app.controller("designController", function($scope, contentfulClient, $routeParams) {
    $scope.params = $routeParams;
    contentfulClient.entries().then(function(entries) {
        $scope.entries = entries;
        $scope.params = $routeParams.id;
        $scope.pageLoaded = $scope.entries[$scope.params];
        $scope.clientApproved = $scope.pageLoaded.fields.clientApproved;
    });
});

app.controller("documentationController", function($scope) {
    $scope.designTest = "scope works in Design";
});

app.controller("styleguideController", function($scope) {
    $scope.designTest = "scope works in Design";
});