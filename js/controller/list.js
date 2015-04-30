itemApp.controller('listController', function($rootScope, $scope, $location, $localStorage, $filter, $state, itService, $stateParams) {

	// Google Analystics
	(function(i, s, o, g, r, a, m) {
		i['GoogleAnalyticsObject'] = r;
		i[r] = i[r] ||
		function() {
			(i[r].q = i[r].q || []).push(arguments)
		}, i[r].l = 1 * new Date();
		a = s.createElement(o),
		m = s.getElementsByTagName(o)[0];
		a.async = 1;
		a.src = g;
		m.parentNode.insertBefore(a, m)
	})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

	ga('create', 'UA-53944359-4', 'auto');
	ga('send', 'list');

	// instance variables
	$scope.page = 0;
	$scope.addMoreLock = false;

	$('#block_container').pinterest_grid({
		no_columns : itService.prefHelper.get("numOfCol"),
		padding_x : 10,
		padding_y : 10,
		margin_bottom : 100,
		single_column_breakpoint : 100
	});

	$scope.addMore = function() {
		if ($scope.addMoreLock) {
			return;
		}

		$scope.addMoreLock = true;
		var user = itService.prefHelper.get('ItUser');
		var userId = "default";
		if (user != null && user != undefined) {
			userId = user.id;
		}

		itService.aimHelper.listItem($scope.page, userId, {
			success : function(results) {
				if ($scope.items == null || $scope.items == undefined) {
					$scope.items = [];
				}

				var newItems = (results.map(function(item) {
						item.isLoaded = false;
						item.userProfileUrl = itService.blobStorageHelper.getUserProfileImgUrl(item.whoMadeId) + itService.imageService.ITEM_THUMBNAIL_IMAGE_POSTFIX;
						item.itemImageUrl = itService.blobStorageHelper.getItemImgUrl(item.id);
						item.uploadTime = itService.imageService.makePrettyTime(item.rawCreateDateTime);
						item.likeImage = (item.prevLikeId == null ? "img/feed_card_like_ic_off.png" : "img/feed_card_like_ic_on.png");
						return item;
					})
				);
				$scope.$apply(function() {
					$.merge($scope.items, results);
				});

				$(window).resize();
				$scope.page++;
				$scope.addMoreLock = false;
			},
			error : function(err) {
				console.log(err);
				itService.viewService.showError(err);
			}
		});
	};
	$scope.addMore();

	$scope.onImgLoad = function(item) {
		doResize();
		$scope.$apply(function() {
			item.isLoaded = true;
		});
	};

	$scope.$watch('items', function() {
		$(window).resize();
	}, true);

	var lastScrollTop = 0;
	$(window).scroll(function() {
		var st = $(this).scrollTop();
		if (st > lastScrollTop) {
			doResize();
		}
		lastScrollTop = st;

	});

	var resize_finish;
	function doResize() {
		clearTimeout(resize_finish);
		resize_finish = setTimeout(function() {
			$(window).resize();
		}, 500);
	}


	$scope.showReply = function(item) {
		itService.aimHelper.list('Reply', item.id, {
			success : function(results) {
				item.replys = results.map(function(reply) {
					reply.userImg = itService.blobStorageHelper.getUserProfileImgUrl(reply.whoMadeId) + itService.imageService.ITEM_THUMBNAIL_IMAGE_POSTFIX;
					reply.dateTime = itService.imageService.makePrettyTime(reply.rawCreateDateTime);
					return reply;
				});
				item.replyShowValue = true;
			},
			error : function(err) {
				console.log(err);
				itService.viewService.showError(err);
			}
		});

	};

	$scope.addReply = function(item, entered) {
		if (!entered) {
			return;
		}

		var content = item.replyContent;
		if (content == "") {
			return;
		}

		var myUser = itService.prefHelper.get("ItUser");
		var data = {
			content : content,
			refId : item.id,
			whoMade : myUser.nickName,
			whoMadeId : myUser.id
		};

		item.replyContent = "";
		var noti = {
			whoMade : myUser.nickName,
			whoMadeId : myUser.id,
			refId : item.id,
			refWhoMade : item.whoMade,
			refWhoMadeId : item.whoMadeId,
			content : content,
			type : "Reply",
			imageWidth : item.imageWidth,
			imageHeight : item.imageHeight,
		};

		itService.aimHelper.add('Reply', data, noti, {
			success : function(results) {
				if (item.replys == null || item.replys == undefined) {
					item.replys = [];
				}
				item.replys.push(results.result);
			},
			error : function(err) {
				console.log(err);
				itService.viewService.showError(err);
			}
		});
	};

	$scope.like = function(item) {
		$('#loginDialog').modal();
		// var prevLikeId = item.prevLikeId;
		// if (prevLikeId == null) {
		// var myUser = itService.prefHelper.get("ItUser");
		// var data = {
		// refId : item.id,
		// whoMade : myUser.nickName,
		// whoMadeId : myUser.id
		// };
		// var noti = {
		// whoMade : myUser.nickName,
		// whoMadeId : myUser.id,
		// refId : item.id,
		// refWhoMade : item.whoMade,
		// refWhoMadeId : item.whoMadeId,
		// content : "",
		// type : "LikeIt",
		// imageWidth : item.imageWidth,
		// imageHeight : item.imageHeight,
		// };
		// itService.aimHelper.add('LikeIt', data, noti, {
		// success : function(result) {
		// item.prevLikeId = result.result.id;
		// item.likeItCount++;
		// item.likeImage = "img/general_it_highlight_btn.png";
		// },
		// error : function(err) {
		// itService.viewService.showError(err);
		// }
		// });
		// } else {
		// var data = {
		// id : prevLikeId
		// };
		// itService.aimHelper.del('LikeIt', data, {
		// success : function(result) {
		// item.prevLikeId = null;
		// item.likeItCount--;
		// item.likeImage = "img/general_it_btn.png";
		// },
		// error : function(err) {
		// itService.viewService.showError(err);
		// }
		// });
		// }
	};

	$scope.gotoWhomade = function(whoMadeId) {
		$location.path("/list/users/" + whoMadeId);
	};
});
