//Initilise angular app
var angular = angular;
var app = angular.module('app', ['ngRoute', 'ng-contentful', 'angular-images-loaded', 'UserApp']);

app.run(function(user) {
	user.init({ appId: '54cf58a9d625c' });
});

app.config(function($routeProvider, contentfulClientProvider){
	$routeProvider
		.when('/', {
			templateUrl: "src/html/home.html",
			controller: 'mainController',
			public: true
		})

		.when('/login', {
			templateUrl: "src/html/login.html",
			controller: 'loginController',
			login: true
		})

		.when('/pages', {
			templateUrl: "src/html/pages.html",
			controller: 'mainController'
		})

		.when('/styleguide', {
			templateUrl: "src/html/styleguide.html",
			controller: 'styleguideController',
			hasPermission: 'admin'
		})

		.when('/journeys', {
			templateUrl: "src/html/journeys.html",
			controller: 'journeysController'
		})
		.when('/journey/:id', {
			templateUrl: "src/html/show_journey.html",
			controller: 'journeysController'
		})

		.when('/design/:id', {
			templateUrl: "src/html/design.html",
			controller: 'designController'
		})

		.otherwise({
			redirectTo: '/'
		});

	 contentfulClientProvider.setSpaceId('qj4662rfubip');
	 contentfulClientProvider.setAccessToken('c35b82ea8c5dad62950fa76f7a3c05459a8c4166b4d1ecdf7e52048757d6a50c');
});

app.controller('loginController', function($scope){

});

//the main controller
app.controller('mainController', function($scope, contentfulClient){
	//load list in from Contentful

	contentfulClient.entries({'content_type':'3P0nCdvt7200MEOKUYge8e'}).then(function(entries){
		  $scope.entries = entries;
		  // console.log($scope.entries[0].sys.id);
	});

	//filtering for the list
	$scope.listFilter = "";
	$scope.filterList = function(filter){
		$scope.listFilter = filter;
	};

	//return the index of an object
	$scope.indexOf = function(item){
		var x = $scope.entries.indexOf(item);
		return x;
	};

	$scope.whatColor = function(state){
		if(state === "Surfing Australia"){
			return "color: #444";
		}
		else if(state === "South Australia"){
			return "color: red";
		}
	};

	//filter by approved or not
	$scope.filterToNotApproved = false;
	$scope.filterApproval = function(value){
		$scope.filterToNotApproved = value;
	};

	//THIS IS SOME SERIOUS DATE BUSINESS ----Look away, it's magic----
	$scope.theDate = function(value){
		var date = new Date(value);
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		var dateSuffix = function(date){
			if(date === 1 || date === 21 || date === 31){
				return "st";
			}
			else if(date === 2 || date === 22){
				return "nd";
			}
			else if(date === 3){
				return "rd";
			}
			else {
				return "th";
			}
		};
		return days[date.getDay()]+", "+date.getDate()+dateSuffix(date.getDate())+" "+months[date.getMonth()];
	};

	$scope.pageItems = [
		// {'name': 'All Pages', 'value': ''}, 
		{'name': 'Homepage', 'value': 'Homepage'}, 
		{'name':'Education', 'value': 'Education'}, 
		{'name':'Events', 'value': 'Events'}, 
		{'name':'Membership', 'value': 'Membership'}, 
		{'name':'About', 'value': 'About'}, 
		{'name':'Error', 'value': 'Error Page'}, 
		{'name':'Global', 'value': 'Global'}, 
		{'name':'Search', 'value': 'Search'}, 
		{'name':'Shop', 'value': 'Shop'}
	];

	//overide default page filter
	// $scope.pageFilter = $scope.pageItems[8].value;

	$scope.statusItems = [
		{'name': 'Approved'}, {'name':'Conditionally Approved'}, {'name':'Awaiting Approval'}, {'name':'Design in Progress'}
	];

	//Spit out the date and time
	// $scope.dateUpdated = days[date.getDay()]+", "+date.getDate()+dateSuffix(date.getDate())+" "+months[date.getMonth()]+", "+date.getFullYear();
	// $scope.timeUpdated = date.getHours()+":"+date.getMinutes();

});

app.controller('designController', function($scope, contentfulClient, $routeParams, $sce){
	// $scope.params = $routeParams;

	contentfulClient.entries({'content_type':'3P0nCdvt7200MEOKUYge8e'}).then(function(entries){
		$scope.entries = entries;

		for(var x in $scope.entries){
			if(entries[x].sys.id === $routeParams.id){
				$scope.pageLoaded = $scope.entries[x];
			}
		}

		// $scope.params = $routeParams.id;
		// $scope.pageLoaded = $scope.entries[$scope.params];


		//THIS IS SOME SERIOUS DATE BUSINESS ----Look away, it's magic----
		var date = new Date($scope.pageLoaded.fields.image.sys.updatedAt);
		var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		
		var dateSuffix = function(date){
			if(date === 1 || date === 21 || date === 31){
				return "st";
			}
			else if(date === 2 || date === 22){
				return "nd";
			}
			else if(date === 3){
				return "rd";
			}
			else {
				return "th";
			}
		};

		//Spit out the date and time
		$scope.dateUpdated = days[date.getDay()]+", "+date.getDate()+dateSuffix(date.getDate())+" "+months[date.getMonth()]+", "+date.getFullYear();
		$scope.timeUpdated = date.getHours()+":"+date.getMinutes();
		
		//fix the grammar on revision(s)
		$scope.revision = function(){
			var r = $scope.pageLoaded.sys.revision;
			if(r > 1){
				r += " revisions";
			}
			else {
				r += " revision";
			}
			return r;
		};

		//assign a variable based on if the page is approved by client
		$scope.clientApproved = $scope.pageLoaded.fields.clientApproved;

		$scope.hasComments = function(){
			if($scope.pageLoaded.fields.comments !== undefined){
				return true;
			}
			else{
				return false;
			}
		};
		
		$scope.relatedFilter = $scope.pageLoaded.fields.name;
	});

	$scope.toTrusted = function(data){
		return $sce.trustAsHtml(data);
	};


});

app.controller('documentationController', function($scope){
	//design scope
	$scope.designTest = "scope works in Design";

});

app.controller('styleguideController', function($scope){
	//design scope
	$scope.designTest = "scope works in Design";

});


//JOURNEY DETAIL CONTROLLER
app.controller('journeysController', function($scope, contentfulClient, $routeParams, $sce){
	contentfulClient.entries({'content_type':'3EoQ2epw1OcM8YYGwqiKa0'}).then(function(entries){
		$scope.journeys = entries;

		//find the loaded journey in the array
		for (var x in $scope.journeys){
			if($scope.journeys[x].sys.id === $routeParams.id){
				$scope.journeyLoaded = $scope.journeys[x];
			}
		}

		//Pagenation helper functions
		$scope.showingPage = 0;
		$scope.nextPage = function(){
			if($scope.showingPage + 1 < $scope.journeyLoaded.fields.pages.length){
				$scope.showingPage += 1;
			}
		};
		$scope.previousPage = function(){
			if($scope.showingPage > 0){
				$scope.showingPage -= 1;
			}
		};

		$scope.hasComments = function(){
			if($scope.journeyLoaded.fields.comments !== undefined){
				return true;
			}
			else{
				return false;
			}
		};

    }); //end of CMS query

	$scope.toTrusted = function(data){
		return $sce.trustAsHtml(data);
	};


}); //end of controller

