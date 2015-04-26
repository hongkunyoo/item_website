itemApp.controller('detailController', function($rootScope, $scope, $location, $filter, $state, $stateParams, itService) {
	var itemId = $stateParams.itemId;
	
	itService.aimHelper.getItem({id : itemId}, "userId", {
		success: function(result) {
			var imgUrls = [];
			for (var i = 0 ; i < result.imageNumber ; i++) {
				var url = null;
				if (i == 0) {
					url = "https://athere.blob.core.windows.net/item-image-container/" + itemId;		
				} else {
					url = "https://athere.blob.core.windows.net/item-image-container/" + itemId + "_" + i;
				}
				imgUrls.push(url);	
			}
			// $.merge($scope.item.itemImageUrls, imgUrls);
			$scope.item = result;
			result.replyList = result.replyList.map(function(reply){
				reply.rawCreateDateTime = new ItDateTime(reply.rawCreateDateTime).toPrettyDateTime();
				return reply;
			});
			$scope.item.itemImageUrls = imgUrls;
			
			
			
		}, error: function(err) {
			console.log(err);
		}	
	});	
	
	$scope.onImgLoad = function() {
		$('#carousel_inner_id div:first').addClass('active');
		$("#carousel_inner_id").css("height", $("#carousel_inner_id div:first img").css("height"));
	};
}); 
