itemApp.controller('loginController', function($scope, $location, $rootScope, itService) {
	// $localStorage.$reset("session");

	// var session = $localStorage.session;
	// if (session != undefined) {
	// itService.azureService.sessionHelper('open', session, {
	// success : function(result) {
	// itService.azureService.page = 0;
	// $location.path("/list");
	// },
	// error : function() {
	// $scope.alerMessageValue = true;
	// }
	// });
	// return;
	// }

	// $scope.login = function() {
	// itService.viewService.showProgress();
	// $scope.user = {
	// id: $("#user_id").val(),
	// password: $("#user_password").val()
	// };
	// itService.azureService.signin({
	// userId : $scope.user.id,
	// password : $scope.user.password
	// }, {
	// success : function(result) {
	// itService.viewService.hideProgress();
	// if (result.result.isValid) {
	// $localStorage.$default({
	// session: result.result.session,
	// user : result.result.user
	// });
	// $location.path("/list");
	// } else {
	// $scope.alerMessageValue = true;
	// }
	//
	// },
	// error : function(err) {
	// console.log(err);
	// itService.viewService.showError(e);
	// }
	// });
	// };
	//

	if ($scope.isLogin()) {
		$location.path("/list/home");
		$location.replace();
	}

	$scope.onFacebookLogin = function() {
		FB.login(function(response) {
			if (response.status === 'connected') {
				// Logged into your app and Facebook.
				FB.api('/me', function(facebook_user) {
					var user = {};
					user.itUserId = facebook_user.id;
					user.platform = "FACEBOOK";
					user.nickName = facebook_user.first_name;
					user.selfIntro = "";
					user.webPage = "";
					user.type = "VIEWER";
					user.password = "";
					user.registrationId = "";
					user.mobileId = "";

					itemLogin(user, "https://graph.facebook.com/" + user.itUserId + "/picture?type=large");
				});
			} else if (response.status === 'not_authorized') {
				// The person is logged into Facebook, but not your app.
			} else {
				// The person is not logged into Facebook, so we're not sure if
				// they are logged into this app or not.
			}
		}, {
			scope : 'public_profile,email'
		});
	};

	function itemLogin(user, imageUrl) {
		itService.viewService.showProgress();
		var asyncChainer = itService.asyncChainerBuilder.build();
		asyncChainer.async([
		function() {

			// add User to Mobile Service server
			// itService.userHelper.add(user, {
			// success: function(result) {
			// console.log('add user');
			// itService.prefHelper.put({"ItUser" : result});
			// asyncChainer.executeAsync(result.id);
			// }, error: function(err) {
			// if (err.message == "Forbidden") {
			// var alreadyUser = JSON.parse(err.request.response);
			// itService.prefHelper.put({"ItUser" : alreadyUser});
			// gotoNextPage();
			// } else {
			// console.log(err);
			// itService.viewService.showError(err);
			// }
			// }
			// });

			var device = {
				mobileId : "",
				registrationId : "",
				mobileOs : "WEB"
			};

			itService.userHelper.signin(user, device, {
				success : function(result) {
					result = result.result;
					itService.prefHelper.put({
						"ItUser" : result.user
					});
					itService.prefHelper.put({
						"ItDevice" : result.device
					});
					asyncChainer.executeAsync(result.user.id);
				},
				error : function(err) {
					console.log(err);
					itService.viewService.showError(err);
				}
			});
		},
		function(id) {
			// get Image From WebSite
			var image = new Image();

			image.onload = function() {
				var myCanvas = document.createElement('canvas');
				var ctx = myCanvas.getContext('2d');
				ctx.drawImage(image, 0, 0);
				// Or at whatever offset you like
				var dataURL = myCanvas.toDataURL();

				console.log(dataURL);
				itService.imageService._dataURLToImage(dataURL, function(image) {
					asyncChainer.executeAsync(id, image);
				});
			};
			image.setAttribute('crossOrigin', 'anonymous');
			image.src = imageUrl;
			// image.width = 100;
			// image.height = 100;
		},
		function(id, image) {
			asyncChainer.wait(2);
			itService.imageService.cropSquare(image, function(cropped_image) {
				itService.imageService.degradeResol(cropped_image, itService.imageService.MAX_SIZE, function(degraded) {
					var file = itService.imageService.imageToBlob(degraded);
					uploadImage(id, file, {
						success : function(result) {
							asyncChainer.executeAsync();
						},
						error : function(err) {
							console.log(err);
							itService.viewService.showError(err);
						}
					});
				});
				itService.imageService.degradeResol(cropped_image, itService.imageService.THUMB_NAIL_SIZE, function(thumbnail) {
					var file_thumbnail = itService.imageService.imageToBlob(thumbnail);
					uploadImage(id + "_thumbnail", file_thumbnail, {
						success : function(result) {
							asyncChainer.executeAsync();
						},
						error : function(err) {
							console.log(err);
							itService.viewService.showError(err);
						}
					});
				});
			});
		},
		function() {
			// Move to List page
			gotoNextPage();
		}]);
	}

	// get Sas Query String from Azure Mobile Service & upload to blob storage
	function uploadImage(name, file, callback) {
		itService.azureService.getSasQuery(name, {
			success : function(sasQueryString) {
				itService.blobStorageHelper.upload("item-user-profile", name, sasQueryString, file, callback);
			},
			error : function(err) {
				console.log(err);
				itService.viewService.showError(err);
			}
		});
	}

	function gotoNextPage() {
		console.log((itService.prefHelper.get("ItUser")));
		itService.viewService.hideProgress();
		$location.path("/list");
	}

});
