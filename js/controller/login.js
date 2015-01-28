itemApp.controller('loginController', function($scope, $location, $localStorage, $rootScope, itService) {
   // $localStorage.$reset("session");
   
   var session = $localStorage.session;
   if (session != undefined) {
   		itService.azureService.sessionHelper('open', session, {
			success : function(result) {
				itService.azureService.page = 0;
				$location.path("/list");
			},
			error : function() {
				$scope.alerMessageValue = true;
			}
		});
		return;
   }
   
	$scope.login = function() {
		itService.viewService.showProgress();
		$scope.user = {
			id: $("#user_id").val(),
			password: $("#user_password").val()
		};
		itService.azureService.signin({
			userId : $scope.user.id,
			password : $scope.user.password
		}, {
			success : function(result) {
				itService.viewService.hideProgress();
				if (result.result.isValid) {
					$localStorage.$default({
						session: result.result.session,
						user : result.result.user
					});
					$location.path("/list");	
				} else {
					$scope.alerMessageValue = true;		
				}
					
			},
			error : function(err) {
				console.log(err);
				itService.viewService.showError(e);
			}
		});
	};
	
	$scope.signUp = function() {
		$location.path("/signup");
	};
	
});