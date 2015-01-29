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
    $scope.whatColor = function(state) {
        if (state === "Surfing Australia") {
            return "color: #444";
        } else if (state === "South Australia") {
            return "color: red";
        }
    };
    $scope.filterToNotApproved = false;
    $scope.filterApproval = function(value) {
        $scope.filterToNotApproved = value;
    };
    $scope.theDate = function(value) {
        var date = new Date(value);
        var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
        var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var dateSuffix = function(date) {
            if (date === 1 || date === 21 || date === 31) {
                return "st";
            } else if (date === 2 || date === 22) {
                return "nd";
            } else if (date === 3) {
                return "rd";
            } else {
                return "th";
            }
        };
        return days[date.getDay()] + ", " + date.getDate() + dateSuffix(date.getDate()) + " " + months[date.getMonth()];
    };
});

app.controller("designController", function($scope, contentfulClient, $routeParams, $sce) {
    contentfulClient.entries().then(function(entries) {
        $scope.entries = entries;
        for (var x in $scope.entries) {
            if (entries[x].sys.id === $routeParams.id) {
                $scope.pageLoaded = $scope.entries[x];
            }
        }
        var date = new Date($scope.pageLoaded.fields.image.sys.updatedAt);
        var days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
        var months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
        var dateSuffix = function(date) {
            if (date === 1 || date === 21 || date === 31) {
                return "st";
            } else if (date === 2 || date === 22) {
                return "nd";
            } else if (date === 3) {
                return "rd";
            } else {
                return "th";
            }
        };
        $scope.dateUpdated = days[date.getDay()] + ", " + date.getDate() + dateSuffix(date.getDate()) + " " + months[date.getMonth()] + ", " + date.getFullYear();
        $scope.timeUpdated = date.getHours() + ":" + date.getMinutes();
        $scope.revision = function() {
            var r = $scope.pageLoaded.sys.revision;
            if (r > 1) {
                r += " revisions";
            } else {
                r += " revision";
            }
            return r;
        };
        $scope.clientApproved = $scope.pageLoaded.fields.clientApproved;
        $scope.hasComments = function() {
            if ($scope.pageLoaded.fields.comments !== undefined) {
                return true;
            } else {
                return false;
            }
        };
    });
    $scope.toTrusted = function(data) {
        return $sce.trustAsHtml(data);
    };
});

app.controller("documentationController", function($scope) {
    $scope.designTest = "scope works in Design";
});

app.controller("styleguideController", function($scope) {
    $scope.designTest = "scope works in Design";
});