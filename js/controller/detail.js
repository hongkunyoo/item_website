itemApp.controller('detailController', function($rootScope, $scope, $location, $filter, $state, $stateParams, itService) {
	var itemId = $stateParams.itemId;
	
	itService.aimHelper.getItem({id : itemId}, "userId", {
		success: function(result) {
			var imgUrls = [];
			for (var i = 0 ; i < result.imageNumber ; i++) {
				var url = null;
				if (i == 0) {
					url = "https://item.blob.core.windows.net/item-image/" + itemId;		
				} else {
					url = "https://item.blob.core.windows.net/item-image/" + itemId + "_" + i;
				}
				imgUrls.push(url);	
			}

			$scope.item = result;
			if (result.replyList != null && result.replyList.length > 0) {
				result.replyList = result.replyList.map(function(reply){
					reply.rawCreateDateTime = new ItDateTime(reply.rawCreateDateTime).toPrettyDateTime();
					return reply;
				});	
			}
			
			$scope.item.itemImageUrls = imgUrls;
			
		}, error: function(err) {
			console.log(err);
		}	
	});	
	
	$scope.onImgLoad = function() {
		// $('#carousel_inner_id div:first').addClass('active');
		// $("#carousel_inner_id").css("height", $("#carousel_inner_id div:first img").css("height"));
		$('.your-class').slick({
			accessibility: true,
			arrows: false,
			dots: true
			
		}); 
	};
	
	$scope.like = function() {
		$('#loginDialog').modal();
	};
	
	$scope.addReply = function() {
		$('#loginDialog').modal();
		
		var content = $scope.replyContent;
		if (content == "")
			return;
			
		
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
