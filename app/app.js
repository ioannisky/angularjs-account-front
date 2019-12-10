var accountApp = angular.module('accountApp', []);

accountApp.controller("MainListController",function MainListController($scope){

});


accountApp.controller("AccountListController",function AccountListController($scope,$rootScope,$http) {
	$http.get('/data/accounts.json').then(
		function(res){
			$scope.accounts = res.data;                
	});
/*
	$scope.accounts=[
{"id":1,"name":"test-account1"},
{"id":2,"name":"test-account2"},
{"id":3,"name":"test-account3"},
{"id":4,"name":"test-account4"},
{"id":5,"name":"test-account5"},
{"id":6,"name":"test-account6"}
];
*/
	$scope.selectedIndex=0;

	$rootScope.$on("moveUp",function (event, args) {
		$scope.selectedIndex-=1;
		if($scope.selectedIndex<0) {
			$scope.selectedIndex=$scope.accounts.length+$scope.selectedIndex;
		}
	});

	$rootScope.$on("moveDown",function(event, args) {
		$scope.selectedIndex=($scope.selectedIndex+1)%$scope.accounts.length;
	});

	$rootScope.$on("selectClicked",function(event, args) {
		$rootScope.$emit("displayDetails",$scope.accounts[$scope.selectedIndex]);
	});

});


accountApp.controller("UpButtonController",function UpButtonController($scope,$rootScope) {
	
	$scope.clickHandler=function () {
		if($rootScope.showAccountDetails==true) {
			return false;
		}
		$rootScope.$emit("moveUp",{});
	}
});

accountApp.controller("DownButtonController",function DownButtonController($scope,$rootScope) {
	
	$scope.clickHandler=function () {
		if($rootScope.showAccountDetails==true) {
			return false;
		}
		$rootScope.$emit("moveDown",{});
	}
});

accountApp.controller("SelectButtonController",function DownButtonController($scope,$rootScope) {
	
	$scope.clickHandler=function () {
		if($rootScope.showAccountDetails==true) {
			return false;
		}

		$rootScope.$emit("selectClicked",{});
	}

});

accountApp.controller("DetailsDisplayController",function DetailsDisplayController($scope,$rootScope) {
	$scope.showAccountDetails=false;
	$rootScope.showAccountDetails=false;
	$scope.id="";
	$scope.name="";

	$rootScope.$on("displayDetails",function(event,args) {
		$scope.showAccountDetails=true;
		$rootScope.showAccountDetails=true;
		$scope.id=args.id;
		$scope.name=args.name;
		setTimeout(function() {
			$scope.$apply(function() {
				$scope.showAccountDetails=false;
				$rootScope.showAccountDetails=false;
				$scope.id="";
				$scope.name="";

			});
			//$scope.showAccountDetails=false;
			//$rootScope.showAccountDetails=false;
			//$scope.id="";
			//$scope.name="";
		},5000);
	});
});



