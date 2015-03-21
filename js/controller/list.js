itemApp.controller('listController', function($rootScope, $scope, $location, $localStorage, $filter, $state, itService, $stateParams) {
	
	// if ($localStorage.session == undefined) {
		// $location.path("/");
		// $rootScope.isLogin = false;
		// return;
	// }
	
	// itService.azureService.sessionHelper('open', $localStorage.session, {
		// success: function(result) {
			// if (!result) {
				// console.log('session failed');
				// $localStorage.$reset("session");
				// $location.path("/");				
			// } else {
				// $scope.list_active = $state.current.name;
				// $state.go('list.home');
				// $scope.user = $localStorage.user;
				// $rootScope.isLogin = true;				
			// }
		// }, error: function(err) {
			// console.log(err);
			// itService.viewService.showError(err);
		// }			
	// });
	// $scope.list_active = $state.current.name;
	// $state.go('list.home');
	// $scope.user = itService.prefHelper.get("ItUser");
	// $rootScope.isLogin = true;
	
	// $scope.logout = function() {
// 		
	// };
}); 