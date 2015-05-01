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

	$scope.showProductTagDialog = function(item) {
		$scope.selected = item;
		itService.aimHelper.list('ProductTag', item.id, {
			success : function(tags) {
				$scope.tags = tags;
				$('#productTagDialog').modal('show');
			},
			error : function(err) {
				console.log(err);
				itService.viewService.showError(err);
			}
		});
	};

	$scope.productTagOpts = [{
		val : 0,
		kor : "아우터"
	}, {
		val : 1,
		kor : "셔츠"
	}, {
		val : 2,
		kor : "니트"
	}, {
		val : 3,
		kor : "맨투맨"
	}, {
		val : 4,
		kor : "후드"
	}, {
		val : 5,
		kor : "티셔츠"
	}, {
		val : 6,
		kor : "팬츠"
	}, {
		val : 7,
		kor : "원피스"
	}, {
		val : 8,
		kor : "스커트"
	}, {
		val : 9,
		kor : "신발"
	}, {
		val : 10,
		kor : "양말"
	}, {
		val : 11,
		kor : "가방"
	}, {
		val : 12,
		kor : "악세사리"
	}, {
		val : 13,
		kor : "모자"
	}, {
		val : 14,
		kor : "아이템"
	}];
});
