var angular = angular;

var app = angular.module("app", [ "ngRoute", "ng-contentful", "angular-images-loaded", "UserApp" ]);

app.run(function(user) {
    user.init({
        appId: "54cf58a9d625c"
    });
});

app.config(function($routeProvider, contentfulClientProvider) {
    $routeProvider.when("/", {
        templateUrl: "src/html/home.html",
        controller: "mainController",
        "public": true
    }).when("/login", {
        templateUrl: "src/html/login.html",
        controller: "loginController",
        login: true
    }).when("/pages", {
        templateUrl: "src/html/pages.html",
        controller: "mainController"
    }).when("/styleguide", {
        templateUrl: "src/html/styleguide.html",
        controller: "styleguideController",
        hasPermission: "admin"
    }).when("/journeys", {
        templateUrl: "src/html/journeys.html",
        controller: "journeysController"
    }).when("/journey/:id", {
        templateUrl: "src/html/show_journey.html",
        controller: "journeysController"
    }).when("/design/:id", {
        templateUrl: "src/html/design.html",
        controller: "designController"
    }).otherwise({
        redirectTo: "/"
    });
    contentfulClientProvider.setSpaceId("qj4662rfubip");
    contentfulClientProvider.setAccessToken("c35b82ea8c5dad62950fa76f7a3c05459a8c4166b4d1ecdf7e52048757d6a50c");
});

app.controller("loginController", function($scope) {});

app.controller("mainController", function($scope, contentfulClient) {
    contentfulClient.entries({
        content_type: "3P0nCdvt7200MEOKUYge8e"
    }).then(function(entries) {
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
    $scope.pageItems = [ {
        name: "Homepage",
        value: "Homepage"
    }, {
        name: "Education",
        value: "Education"
    }, {
        name: "Events",
        value: "Events"
    }, {
        name: "Membership",
        value: "Membership"
    }, {
        name: "About",
        value: "About"
    }, {
        name: "Error",
        value: "Error Page"
    }, {
        name: "Global",
        value: "Global"
    }, {
        name: "Search",
        value: "Search"
    }, {
        name: "Shop",
        value: "Shop"
    } ];
    $scope.statusItems = [ {
        name: "Approved"
    }, {
        name: "Conditionally Approved"
    }, {
        name: "Awaiting Approval"
    }, {
        name: "Design in Progress"
    } ];
});

app.controller("designController", function($scope, contentfulClient, $routeParams, $sce) {
    contentfulClient.entries({
        content_type: "3P0nCdvt7200MEOKUYge8e"
    }).then(function(entries) {
        $scope.entries = entries;
        $scope.showRelated = false;
        for (var x in $scope.entries) {
            if (entries[x].sys.id === $routeParams.id) {
                $scope.pageLoaded = $scope.entries[x];
                $scope.relatedFilter = $scope.pageLoaded.fields.name;
                $scope.showRelated = true;
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

app.controller("journeysController", function($scope, contentfulClient, $routeParams, $sce) {
    contentfulClient.entries({
        content_type: "3EoQ2epw1OcM8YYGwqiKa0"
    }).then(function(entries) {
        $scope.journeys = entries;
        for (var x in $scope.journeys) {
            if ($scope.journeys[x].sys.id === $routeParams.id) {
                $scope.journeyLoaded = $scope.journeys[x];
            }
        }
        $scope.showingPage = 0;
        $scope.nextPage = function() {
            if ($scope.showingPage + 1 < $scope.journeyLoaded.fields.pages.length) {
                $scope.showingPage += 1;
            }
        };
        $scope.previousPage = function() {
            if ($scope.showingPage > 0) {
                $scope.showingPage -= 1;
            }
        };
        $scope.hasComments = function() {
            if ($scope.journeyLoaded.fields.comments !== undefined) {
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