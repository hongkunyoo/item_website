itemApp.controller('itemDetailController', function($rootScope, $scope, $location, $filter, $state, $stateParams, itService) {

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
	ga('send', 'item_detail');

	var itemId = $stateParams.itemId;
	var user = itService.prefHelper.get('ItUser');
	var userId = "default";
	if (user != null && user != undefined) {
		userId = user.id;
	}

	itService.aimHelper.getItem({
		id : itemId
	}, userId, {
		success : function(result) {
			var imgUrls = [];
			for (var i = 0; i < result.imageNumber; i++) {
				var imageId = (i == 0 ? itemId : itemId + "_" + i);
				var url = itService.blobStorageHelper.getItemImgUrl(imageId);
				imgUrls.push(url);
			}

			if (result.replyList != null && result.replyList.length > 0) {
				result.replyList = result.replyList.map(function(reply) {
					reply.rawCreateDateTime = new ItDateTime(reply.rawCreateDateTime).toPrettyDateTime();
					reply.userProfileUrl = itService.blobStorageHelper.getUserProfileImgUrl(reply.whoMadeId + itService.imageService.ITEM_THUMBNAIL_IMAGE_POSTFIX);
					return reply;
				});
			}

			result.itemImageUrls = imgUrls;
			result.userProfileUrl = itService.blobStorageHelper.getUserProfileImgUrl(result.whoMadeId + itService.imageService.ITEM_THUMBNAIL_IMAGE_POSTFIX);
			$scope.item = result;
		},
		error : function(err) {
			console.log(err);
			itService.viewService.showError(err);
		}
	});

	$scope.onImgLoad = function() {
		// $('#carousel_inner_id div:first').addClass('active');
		// $("#carousel_inner_id").css("height", $("#carousel_inner_id div:first img").css("height"));
		$('.your-class').slick({
			accessibility : true,
			arrows : false,
			dots : true
		});
	};

	$scope.like = function() {
		$('#loginDialog').modal();
	};

	$scope.addReply = function() {
		$('#loginDialog').modal();

		var content = $scope.replyContent;
		if (content == "") {
			return;
		}

		// var myUser = itService.prefHelper.get("ItUser");
		// var data = {
		// content : content,
		// refId : item.id,
		// whoMade : myUser.nickName,
		// whoMadeId : myUser.id
		// };
		//
		// item.replyContent = "";
		// var noti = {
		// whoMade : myUser.nickName,
		// whoMadeId : myUser.id,
		// refId : item.id,
		// refWhoMade : item.whoMade,
		// refWhoMadeId : item.whoMadeId,
		// content : content,
		// type : "Reply",
		// imageWidth : item.imageWidth,
		// imageHeight : item.imageHeight,
		// };
		// itService.aimHelper.add('Reply', data, noti, {
		// success : function(results) {
		// if (item.replys == null || item.replys == undefined)
		// item.replys = [];
		// item.replys.push(results.result);
		// },
		// error : function(err) {
		// itService.viewService.showError(err);
		// }
		// });
	};
});
