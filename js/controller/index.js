itemApp.controller('indexController', function($rootScope, $location, $rootScope, $localStorage) {
	
	$rootScope.logout = function(){
		$localStorage.$reset("session");
		$rootScope.isLogin = false;
		$location.path("/");	
	};
	
});