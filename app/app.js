angular.module('accountApp', []);

angular.module('accountApp').service("AccountListService",function($http) {
	var self=this;
	this.accounts=[];
	this.selectedIndex=0;
	this.updateAccounts=function () {
		$http.get('/data/accounts.json').then(
			function(res){
				self.accounts = res.data;                
			}
		);
	}
	this.moveUp=function() {
		this.selectedIndex=(this.accounts.length+this.selectedIndex-1)%this.accounts.length;
	}

	this.moveDown=function() {
		this.selectedIndex=(this.selectedIndex+1)%this.accounts.length;
	}


	this.updateAccounts();

	return this;


});

angular.module('accountApp').controller("MainListController",function ($scope,$http,AccountListService) {
	var self=this;

	//self.accounts=[{"id":1,"name":"asdasd"}];

	//$http.get('/data/accounts.json').then(
	//	function(res){
	//		self.accounts = res.data;                
	//	}
	//);
	//this.accounts=AccountListService.accounts;
	//this.selectedIndex=0;
	//this.display=false;


	$scope.moveUp=function() {
		if(self.display==true)
			return;

		AccountListService.moveUp();
		/*
		self.selectedIndex-=1;
		if(self.selectedIndex<0) {
			self.selectedIndex=self.accounts.length+self.selectedIndex;
		}

		$scope.scrollToPosition();
		*/
	}

	$scope.moveDown=function() {
		if(self.display==true)
			return;
		AccountListService.moveDown();
		//self.selectedIndex=(self.selectedIndex+1)%self.accounts.length;
		//$scope.scrollToPosition();
	}

	$scope.selectItem=function() {
		if(self.display==true)
			return;
		self.display=true;

		setTimeout(function() {
			$scope.$apply(function() {
				self.display=false;
			});

		},5000);
	}

	$scope.$watch("AccountListService.selectedIndex",function() {
		$scope.scrollToPosition();
	});


	$scope.scrollToPosition=function() {
		if(AccountListService.accounts.length==0)
			return;
		var itemElement=document.getElementById("account-"+AccountListService.accounts[AccountListService.selectedIndex].id);
		var listElement=document.getElementsByClassName("item-list")[0];
		
		var viewPortHeight=listElement.clientHeight;
		var viewPortScroll=listElement.scrollTop;
		var itemPosition=itemElement.offsetTop;
		var itemHeight=itemElement.clientHeight;

		var shownBottom=viewPortScroll+viewPortHeight;

		if(itemPosition<viewPortScroll) {
			listElement.scrollTop=itemPosition;
		} else if((itemPosition+itemHeight)>shownBottom) {
			listElement.scrollTop=(itemPosition+itemHeight)-viewPortHeight;
		}

	}

});


angular.module('accountApp').directive("keypressDirective",function() {
	return {
		link: function(scope,element,attrs) {
			document.onkeydown=function(e) {
				console.log(e.keyCode);				
				if(e.keyCode==85) { // Press U
					scope.moveUp();
				}else if(e.keyCode==68) { // Press D
					scope.moveDown();
				}else if(e.keyCode==83) { // Press S
					scope.selectItem();
				}
				scope.$apply(function() {}); //refresh ui
			}
		}
	}
});

//var accountApp = angular.module('accountApp', []);
/*
accountApp.controller("MainListController",function MainListController($scope){

});


accountApp.controller("AccountListController",function AccountListController($scope,$rootScope,$http) {
	$http.get('/data/accounts.json').then(
		function(res){
			$scope.accounts = res.data;                
	});
*/
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
/*
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
*/


