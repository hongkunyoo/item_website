itemApp.controller('detailController', function($rootScope, $scope, $location, $filter, $state, $stateParams, itService) {
	var item = {};
	item.uploader = "hello";
	$scope.item = item;
	
	
	
	var itemId = $stateParams.itemId;
	$scope.itemImageUrls = [];
	
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
			$.merge($scope.itemImageUrls, imgUrls);
			
		}, error: function(err) {
			console.log(err);
		}	
	});	
	
	$scope.onImgLoad = function() {
		$('#carousel_inner_id div:first').addClass('active');
		$("#carousel_inner_id").css("height", $("#carousel_inner_id div:first img").css("height"));
	};
}); 
