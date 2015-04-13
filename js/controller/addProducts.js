itemApp.controller('addProductController', function($scope, $location, $rootScope, itService) {
	$scope.createInvite = function() {
		var type = $scope.type;
		itService.azureService.createInviteKey(type, {
			success: function(result) {
				$scope.screen = result.response;
				$scope.inviteUrl = location.protocol + '//' + location.host + '/item_website/#/signup/' + result.response;
			}, error: function(err) {
				$scope.screen = err;
				console.log(err);
				itService.viewService.showError(err);
			}
		});
	};
});