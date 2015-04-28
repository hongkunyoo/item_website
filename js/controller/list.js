itemApp.controller('listController', function($rootScope, $scope, $location, $localStorage, $filter, $state, itService, $stateParams) {

	// instance variables
	$scope.page = 0;
	$scope.addMoreLock = false;
	$scope.isEmpty = false;

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
				if (results.length == 0) {
					$scope.$apply(function() {
						$scope.isEmpty = true;
					});
					return;
				}
				
				if ($scope.items == null || $scope.items == undefined) $scope.items = [];
				var newItems = (results.map(function(item){
					item['uploaderImg']	= itService.imageService.makeUserImage(item.whoMadeId);
					item['imageUrl']	= itService.imageService.makeItemImage(item.id);
					item['uploadTime'] = itService.imageService.makePrettyTime(item.rawCreateDateTime);
					item.isLoaded = false;
					if (item.prevLikeId == null) {
						item.likeImage = "img/feed_card_like_ic_off.png";
					} else {
						item.likeImage = "img/feed_card_like_ic_on.png";
					}
					// item.mainImageHeight
					return item;
				}));
				$scope.$apply(function(){
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
		$scope.$apply(function(){
			item.isLoaded = true;
		});
	};
	
	$scope.$watch('items', function() {
		$(window).resize();

	}, true);

	var lastScrollTop = 0;

	$(window).scroll(function() {
		if ($scope.itemEmpty())
			return;
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


	$scope.itemEmpty = function() {
		return $scope.isEmpty;
	};

	$scope.showReply = function(item) {
		itService.aimHelper.list('Reply', item.id, {
			success : function(results) {
				item.replys = results.map(function(reply) {
					reply.userImg = itService.imageService.makeUserImage(reply.whoMadeId);
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

	$scope.showDetails = function(item) {
		$scope.selected = item;
		itService.aimHelper.list('ProductTag', item.id, {
			success : function(results) {
				$scope.tags = results;
				$('#myModal').modal('show');
			},
			error : function(err) {
				console.log(err);
				itService.viewService.showError(err);
			}
		});

	};

	$scope.addReply = function(item, entered) {
		if (!entered)
			return;
		var content = item.replyContent;
		if (content == "")
			return;
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
				if (item.replys == null || item.replys == undefined)
					item.replys = [];
				item.replys.push(results.result);
			},
			error : function(err) {
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

	$scope.priceChange = function() {
		if ($scope.productTag.price == undefined)
			return;
		var toNum = $scope.productTag.price.split(",").join("");
		$scope.productTag.price = $filter('number')(toNum);
	};

	$scope.validProductTag = function() {
		var enable = ($scope.productTagForm.category.$dirty && $scope.productTagForm.shopName.$dirty && $scope.productTagForm.webPage.$dirty && $scope.productTagForm.price.$dirty);
		enable &= !$scope.productTagForm.shopName.$error.required && !$scope.productTagForm.webPage.$error.url && !$scope.productTagForm.webPage.$error.required && !$scope.productTagForm.price.$error.required;

		return !enable;
	};

	$scope.addProductTag = function(item) {

		var refId = $scope.selected.id;
		var data = $scope.productTag;

		data['price'] = parseFloat($scope.productTag.price.split(",").join(""));
		data['refId'] = refId;

		var myUser = itService.prefHelper.get("ItUser");

		data['whoMade'] = myUser.nickName;
		data['whoMadeId'] = myUser.id;

		var noti = {
			whoMade : myUser.nickName,
			whoMadeId : myUser.id,
			refId : item.id,
			refWhoMade : item.whoMade,
			refWhoMadeId : item.whoMadeId,
			content : "",
			type : "ProductTag",
			imageWidth : item.imageWidth,
			imageHeight : item.imageHeight,
		};

		itService.aimHelper.add('ProductTag', data, noti, {
			success : function(results) {
				if ($scope.tags == null || $scope.tags == undefined)
					$scope.tags = [];
				$scope.tags.push(results.result);
				$scope.productTag = {};
			},
			error : function(err) {
				console.log(err);
				itService.viewService.showError(err);
			}
		});
	};

	$scope.deleteTag = function(tag) {

		itService.aimHelper.del('ProductTag', tag, {
			success : function(results) {
				if ($scope.tags == null || $scope.tags == undefined)
					$scope.tags = [];
				$scope.tags = $filter('filter')($scope.tags, {
					id : "!" + tag.id
				});
			},
			error : function(err) {
				console.log(err);
				itService.viewService.showError(err);
			}
		});
	};

	$scope.isMineTag = function(tag) {
		// return tag.whoMadeId == $localStorage.user.id;
		return true;
	};

	$scope.enterProductTag = function(item, e) {
		if (e.keyCode == 13) {
			$scope.addProductTag(item);
		}
	};
});
