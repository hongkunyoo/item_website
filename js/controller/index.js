itemApp.controller('indexController', function($rootScope, $location, $rootScope, $localStorage, $scope, itService) {
	
	$rootScope.logout = function(){
		$localStorage.$reset("session");
		$rootScope.isLogin = false;
		$location.path("/");	
	};
	
	$scope.real = function(){
		itService.azureService.switchServer(itService.azureService.SERVER.REAL);
	};
	
	$scope.test = function(){
		itService.azureService.switchServer(itService.azureService.SERVER.TEST);
	};
	
	
});