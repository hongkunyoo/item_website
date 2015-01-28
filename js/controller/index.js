itemApp.controller('indexController', function($rootScope, $location, $rootScope, $localStorage) {
	
	$rootScope.logout = function(){
		$localStorage.$reset("session");
		$location.path("/");	
	};
	
});