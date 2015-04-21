itemApp.controller('homeController', function($rootScope, $scope, $location, $filter, $state, itService) {

	// instance variables
	$scope.page = 0;
	$scope.addMoreLock = true;

	$scope.addMore = function() {
		if (!$scope.addMoreLock) {
			return;
		}

		var user = itService.prefHelper.get('ItUser');
		$scope.addMoreLock = false;
		itService.azureService.listItem($scope.page, user.id, {
			success : function(results) {
				if (results.length == 0) {
					return;
				}

				if ($scope.items == null || $scope.items == undefined) {
					$scope.items = [];
				}

				var newItems = (results.map(function(item) {
						item['uploaderImg'] = itService.imageService.makeUserImage(item.whoMadeId);
						item['imageUrl'] = itService.imageService.makeItemImage(item.id);
						item['uploadTime'] = itService.imageService.makePrettyTime(item.rawCreateDateTime);
						if (item.prevLikeId == null) {
							item.likeImage = "img/general_it_btn.png";
						} else {
							item.likeImage = "img/general_it_highlight_btn.png";
						}
						return item;
					}));

				$scope.$apply(function() {
					$.merge($scope.items, newItems);
				});

				var windowWidth = $(window).width();
				var numOfCol = 2;
				if (windowWidth < 760) {
					numOfCol = 2;
				} else if (windowWidth < 960) {
					numOfCol = 3;
				} else {
					numOfCol = 4;
				}

				$("#block_container").BlocksIt({
					numOfCol : numOfCol,
					offsetX : 4,
					offsetY : 1,
					blockElement : '.block'
				});
				$scope.page++;
				$scope.addMoreLock = true;
			},
			error : function(err) {
				console.log(err);
				itService.viewService.showError(err);
			}
		});
	};
	$scope.addMore();

	// $scope.$watch('items', function(newValue, oldValue) {
	// console.log("in watch");
	// console.log(newValue, oldValue);
	// });

	$scope.showReply = function(item) {
		itService.azureService.list('Reply', item.id, {
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
		itService.azureService.list('ProductTag', item.id, {
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
		itService.azureService.add('Reply', data, noti, {
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

	$scope.likeIt = function(item) {
		var prevLikeId = item.prevLikeId;
		if (prevLikeId == null) {
			var myUser = itService.prefHelper.get("ItUser");
			var data = {
				refId : item.id,
				whoMade : myUser.nickName,
				whoMadeId : myUser.id
			};
			var noti = {
				whoMade : myUser.nickName,
				whoMadeId : myUser.id,
				refId : item.id,
				refWhoMade : item.whoMade,
				refWhoMadeId : item.whoMadeId,
				content : "",
				type : "LikeIt",
				imageWidth : item.imageWidth,
				imageHeight : item.imageHeight,
			};
			itService.azureService.add('LikeIt', data, noti, {
				success : function(result) {
					item.prevLikeId = result.result.id;
					item.likeItCount++;
					item.likeImage = "img/general_it_highlight_btn.png";
				},
				error : function(err) {
					itService.viewService.showError(err);
				}
			});
		} else {
			var data = {
				id : prevLikeId
			};
			itService.azureService.del('LikeIt', data, {
				success : function(result) {
					item.prevLikeId = null;
					item.likeItCount--;
					item.likeImage = "img/general_it_btn.png";
				},
				error : function(err) {
					itService.viewService.showError(err);
				}
			});
		}
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

		itService.azureService.add('ProductTag', data, noti, {
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

		itService.azureService.del('ProductTag', tag, {
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
