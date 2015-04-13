itemApp.controller('indexController', function($rootScope, $location, $rootScope, $scope, itService) {
	
	$scope.isLogin = function() {
		return itService.prefHelper.get("ItUser") != undefined;
	};
	
	$scope.isLoginClass = function() {
		if ($scope.isLogin()) return "main-bg";
		else return "splash-bg";
	};
	
	$rootScope.logout = function(){
		// $localStorage.$reset("session");
		// $rootScope.isLogin = false;
		// $location.path("/");	
		FB.logout(function(response) {
	        // Person is now logged out
	        $rootScope.$apply(function(){
	        	itService.prefHelper.remove("ItUser");
	        	itService.prefHelper.remove("ItDevice");
	        	$location.path("/");	
	        });
	    });
	};
	
	$scope.real = function(){
		itService.azureService.switchServer(itService.azureService.SERVER.REAL);
	};
	
	$scope.test = function(){
		itService.azureService.switchServer(itService.azureService.SERVER.TEST);
	};
	
	$scope.loginPage = function() {
		$location.path("/list/home");
	};
	
	$scope.logoutPage = function() {
		$location.path("/");
	};
	
	// if ($scope.isLogin()) {
		// $location.path("/list/home");
		// $location.replace();
	// }
});