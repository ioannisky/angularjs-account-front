
angular.module('accountApp').component(
	'accountList',
	{
		templateUrl: 'account-list.template.html',
		controller: function AccountListController($scope,AccountListService) {
			//this.selectedIndex=0;
			
			//alert("Init Controller");
			$scope.ad=AccountListService;
			//$scope.$watch('AccountListService',function(val) {
				//$scope.$apply(function(){});
			//	alert(val);
			//});
			//this.accounts=[{"id":1,"name":12}];
		}

	}

);
/*
angular.module('accountApp').component(
	'controllButton',{
		templateUrl: 'controllButton.template.html',
		controller: function UpButtonController() {
			//this.buttonName="UP";
		},
	}
);*/
