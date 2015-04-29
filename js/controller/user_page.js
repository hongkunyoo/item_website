itemApp.controller('userPageController', function($rootScope, $scope, $location, $localStorage, $filter, $state, itService, $stateParams) {
	
	var userId = $stateParams.user_id;
	itService.azureService.getUser(userId, {
		success: function(result) {
			$scope.user = {};
			$scope.user.imageUrl = itService.imageService.makeUserImage(result.id);
			$scope.user.nickName = result.nickName;
			$scope.user.webPage = result.webPage;
			$scope.user.selfIntro = result.selfIntro;			
		}, error: function(err) {
			console.log(err);
			itService.viewService.showError(err);
		}
	});
});