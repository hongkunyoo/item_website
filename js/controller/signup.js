itemApp.controller('signupController', function($scope, $location, $controller, $rootScope, $stateParams, itService) {
	var _canvas = document.getElementById("myCanvas");
	var base_image = new Image();
	// $scope.image = base_image;
  	base_image.onload = function(){
  		itService.imageService.drawToCanvas(_canvas, base_image);
  	};
  	base_image.width = 212;
  	base_image.height = 212;
  	base_image.src = 'img/default-user-image.png';
  	
	$("#uploader").change(function (e){
		var file = this.files[0];
		
		itService.imageService.loadImgData(file, function(image){
			itService.imageService.cropSquare(image, function(cropped_image){
				itService.imageService.degradeResol(cropped_image, itService.imageService.MAX_SIZE, function(degraded){
					var canvas = document.getElementById("myCanvas");
					itService.imageService.drawToCanvas(canvas, degraded);
					$scope.image = itService.imageService.imageToBlob(degraded);		
				});
				itService.imageService.degradeResol(cropped_image, itService.imageService.THUMB_NAIL_SIZE, function(thumbnail){
					$scope.image_thumbnail = itService.imageService.imageToBlob(thumbnail);		
				});
				
			});
			
		});
	});
	
	
	$scope.blur = function(key){
		var keyValue = $scope[key];
		if (keyValue == undefined) return;
		
		$scope['class_feedback_'+key] = 'glyphicon-refresh glyphicon-refresh-animate';
		
		var validType = "userId";
		if (key == 'userId') {
			validType = "userId";
			var state = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test((keyValue));
			if (!state) {
				$scope['class_group_'+key] = 'has-error';
				$scope['class_feedback_'+key] = 'glyphicon-remove';
				return;
			}
		} else if (key == 'inviteKey') {
			validType = "SELLER";
		}
			
		// glyphicon-refresh-animate
		itService.azureService.isValid(keyValue, validType, {
			success: function(result) {
				$scope[key+'Value'] = result;
				if (result) {
					$scope['class_group_'+key] = 'has-success';
					$scope['class_feedback_'+key] = 'glyphicon-ok';
					// $scope.$apply();
					
				} else {
					$scope['class_group_'+key] = 'has-error';
					$scope['class_feedback_'+key] = 'glyphicon-remove';
					// $scope.$apply();
				}
			}, error: function(err) {
				$scope.key = false;
				$scope['class_group_'+key] = 'has-error';
				$scope['class_feedback_'+key] = 'glyphicon-remove';
				// $scope.$apply();
			}
		});
		
		
	};
	
	var inviteKey = $stateParams.inviteKey;
	if (inviteKey != undefined) {
		$scope.inviteKey = inviteKey;
		$scope.blur('inviteKey');
	}
	
	$scope.checkPwd = function() {
		if ($scope.pwd1 == $scope.pwd2) {
			$scope.pwd = true;
			$scope.class_group_pwd = 'has-success';
			$scope.class_feedback_pwd = 'glyphicon-ok';
		} else {
			$scope.pwd = false;
			$scope.class_group_pwd = 'has-error';
			$scope.class_feedback_pwd = 'glyphicon-remove';
		}
	};
	
	$scope.signup = function() {
		// if (!($scope.inviteKeyValue && $scope.userIdValue && $scope.pwd)) {
			// itService.viewService.showError('Invalid', "Checkout your ID, password, Invite key");
			// return;
		// }
		// if ($scope.nickName == undefined) {
			// itService.viewService.showError('UserName', "UserName Required");
			// return;
		// }
		// if ($scope.image == undefined) {
			// itService.viewService.showError('Profile', "Upload your profile");
			// return;
		// }
		
		if ($scope.webPage == null) $scope.webPage = "";
		var regx = new RegExp("(http|https):\/\/.*");
		var isValid = regx.test($scope.webPage);
		if (!isValid) {
			$scope.webPage = "http://" + $scope.webPage;
		} 
		
		console.log($scope.webPage);
		// return;
		var payload = {
			user : {
				userId : $scope.userId,
				password : $scope.pwd1,
				nickName : $scope.nickName,
				webPage : ($scope.webPage==null) ? "" : $scope.webPage,
				selfIntro: ($scope.selfIntro==null) ? "" : $scope.selfIntro,
				platform : "WEB",
				email : $scope.userId,
			},
			invite: {
				inviteKey : $scope.inviteKey,
				type : "SELLER"	
			}
		};
		$('#reg').button('loading');
		itService.viewService.showProgress();
		var asyncChainer = itService.asyncChainer;
		asyncChainer.async([
			function() {
				itService.azureService.signup(payload, {
					success: function(result) {
						if (result.result.isValid) {
							var id = result.result.user.id;
							asyncChainer.executeAsync(id);
						} else {
							console.log('signup failed');
							itService.viewService.showError('signup failed');
						}
					}, error: function(err) {
						console.log(err);
						itService.viewService.showError(err);
					}
				});
			}, function(fileName) {
				itService.azureService.invalidateInviteky($scope.inviteKey, {
					success: function(result) {
						asyncChainer.executeAsync(fileName);
					}, error: function(err) {
						itService.viewService.showError('invalidate invite key failed'+ err);
					}
				});
								 
			}, function(fileName) {
				itService.azureService.getSasQuery(fileName, {
					success: function(sasQueryString) {
						asyncChainer.executeAsync(fileName, sasQueryString);
					}, error: function(err) {
						console.log(err);
						itService.viewService.showError(err);
					}
				});
			}, function(fileName, sasQueryString) {
				var config = {
					baseUrl: "http://athere.blob.core.windows.net/item-user-profile/" + fileName + "?",
					sasToken: sasQueryString,
					file: $scope.image,
					// blockSize: $scope.size,
					progress: function(e){
						// console.log('progress' + e);
					},
					complete: function(e){
						console.log('complete' + e);
						asyncChainer.executeAsync(fileName);
					},
					error: function(err){
						console.log(err);
						itService.viewService.showError(err);
					}
				};
		
				itService.azureBlob.upload(config);
				
			}, function(fileName) {
				fileName = fileName+"_thumbnail";
				itService.azureService.getSasQuery(fileName, {
					success: function(sasQueryString) {
						asyncChainer.executeAsync(fileName, sasQueryString);
					}, error: function(err) {
						console.log(err);
						itService.viewService.showError(err);
					}
				});
			}, function(fileName, sasQueryString) {
				var config = {
					baseUrl: "http://athere.blob.core.windows.net/item-user-profile/" + fileName + "?",
					sasToken: sasQueryString,
					file: $scope.image_thumbnail,
					// blockSize: $scope.size,
					progress: function(e){
						// console.log('progress' + e);
					},
					complete: function(e){
						console.log('complete' + e);
						itService.viewService.hideProgress();
						$location.path("/");
					},
					error: function(err){
						console.log(err);
						itService.viewService.showError(err);
					}
				};
		
				itService.azureBlob.upload(config);
			}
		]);
		
	};
});