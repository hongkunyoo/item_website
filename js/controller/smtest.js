itemApp.controller('smtestController', function($rootScope, $scope, $location, $localStorage, $filter, $state, itService, $stateParams) {

	// instance variables
	$scope.page = 0;
	$scope.addMoreLock = false;
	$scope.isEmpty = false;

	$scope.itemEmpty = function() {
		return $scope.isEmpty;
	};

	$scope.addMore = function() {
		if ($scope.addMoreLock) {
			return;
		}
		
		$scope.addMoreLock = true;
		
		var userId = '10001';
		itService.aimHelper.listItem($scope.page, userId, {
			success : function(results) {
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
				$scope.addMoreLock = false;
			},
			error : function(err) {
				console.log(err);
				itService.viewService.showError(err);
			}
		});
	};
	$scope.addMore();

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
});
