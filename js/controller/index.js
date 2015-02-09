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
	
	console.log('in index controller');
	window.fbAsyncInit = function() {
		FB.init({
			appId : '734298746647918',
			cookie : true, // enable cookies to allow the server to access
			// the session
			xfbml : true, // parse social plugins on this page
			version : 'v2.1' // use version 2.1
		});
		FB.getLoginStatus(function(response) {
			// statusChangeCallback(response);
			console.log(JSON.stringify(response));
		});
	};
	
});