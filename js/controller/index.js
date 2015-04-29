itemApp.controller('indexController', function($rootScope, $location, $rootScope, $scope, itService) {

	$scope.isLogin = function() {
		// return itService.prefHelper.get("ItUser") != undefined;
		return true;
	};

	$scope.isLoginClass = function() {
		return $scope.isLogin() ? "main-bg" : "splash-bg";
	};

	var windowWidth = $(window).width();
	var numOfCol = 2;
	if (windowWidth < 760) {
		numOfCol = 2;
	} else if (windowWidth < 960) {
		numOfCol = 3;
	} else {
		numOfCol = 4;
	}
	itService.prefHelper.put("numOfCol", numOfCol);

	var bannerHeight = $('#item_banner').height();
	var padding_top_val = ($("#mynavbar").height() + parseInt($("#mynavbar").css('margin-bottom')));
	var state = 0;
	$(window).scroll(function() {
		if (state == 0) {
			if ($(this).scrollTop() > bannerHeight) {
				$("#mynavbar").addClass("navbar-fixed-top");
				$("#mysection").css('padding-top', padding_top_val);
				state = 1;
			}
		} else {
			if ($(this).scrollTop() < bannerHeight) {
				$("#mynavbar").removeClass("navbar-fixed-top");
				$("#mysection").css('padding-top', '');
				state = 0;
			}
		}

	});

	$('#item_banner').on('hide', function() {
		console.log('#foo is hidden');
	});

	// $('#loginDialog').modal();

	$rootScope.logout = function() {
		// $localStorage.$reset("session");
		// $rootScope.isLogin = false;
		// $location.path("/");
		FB.logout(function(response) {
			// Person is now logged out
			$rootScope.$apply(function() {
				itService.prefHelper.remove("ItUser");
				itService.prefHelper.remove("ItDevice");
				$location.path("/");
			});
		});
	};

	$scope.real = function() {
		itService.azureService.switchServer(itService.azureService.SERVER.REAL);
	};

	$scope.test = function() {
		itService.azureService.switchServer(itService.azureService.SERVER.TEST);
	};

	$scope.loginPage = function() {
		$location.path("/list/home");
	};

	$scope.logoutPage = function() {
		$location.path("/");
	};
});
