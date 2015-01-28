itemApp.controller('listController', function($rootScope, $scope, $location, $localStorage, $filter, $state, itService) {
	
	if ($localStorage.session == undefined) {
		$location.path("/");
		console.log('in if');
		return;
	}
	
	itService.azureService.sessionHelper('open', $localStorage.session, {
		success: function(result) {
			if (!result) {
				console.log('session failed');
				$localStorage.$reset("session");
				$location.path("/");				
			} else console.log('session connect');
		}, error: function(err) {
			console.log(err);
			itService.viewService.showError(err);
		}			
	});
	
	$scope.list_active = $state.current.name;
	$state.go('list.home');
	
	// $scope.addMore = function() {
    	// itService.eventService.applyAndWait(function(_this){
	        // itService.azureService.listItem(itService.azureService.page, $localStorage.user.id, {
				// success: function(results) {
					// itService.eventService.notify(_this);
					// console.log('addMore page : ', itService.azureService.page, " count : ",results.length);
					// if (results.length == 0) return;
// 					
					// if ($scope.items == null || $scope.items == undefined) $scope.items = [];
					// $.merge($scope.items, (results.map(function(item){
						// item['uploaderImg']	= $scope.makeUserImage(item.whoMadeId);
						// item['imageUrl']	= $scope.makeContentImage(item.id);
						// item['uploadTime'] = $scope.makePrettyTime(item.rawCreateDateTime);
// 						
						// if (item.prevLikeId == null) {
							// item.likeImage = "img/general_it_btn.png";
							// // item.likeImage = "img/general_it_highlight_btn.png";
						// } else {
							// item.likeImage = "img/general_it_highlight_btn.png";
						// }
						// return item;
					// })));
// 					
					// itService.azureService.page++;
				// }, error: function(err) {
					// console.log(err);
					// itService.viewService.showError(err);
				// }
			// });
    	// });
    // };
    // $scope.addMore();
// 
	// $scope.showReply = function(item) {
		// itService.azureService.list('Reply', item.id, {
			// success: function(results) {
				// item.replys = results;
				// item.replyShowValue = true;		
			// }, error: function(err) {
				// console.log(err);
				// itService.viewService.showError(err);
			// }
		// });
// 		
	// };
// 	
	// $scope.showDetails = function(item) {
		// $scope.selected = item;
		// itService.azureService.list('ProductTag', item.id, {
			// success: function(results) {
				// $scope.tags = results;
				// $('#myModal').modal('show');
			// }, error: function(err) {
				// console.log(err);
				// itService.viewService.showError(err);
			// }
		// });
// 		
//         
	// };
// 	
    // $scope.addReply = function(item, entered) {
    	// if (!entered) return;
    	// var content = item.replyContent;
    	// if (content == "") return;
    	// var data = {
    		// content: content,
    		// refId: item.id,
    		// whoMade: $localStorage.user.nickName,
    		// whoMadeId: $localStorage.user.id
    	// };
//     	
//     	
    	// item.replyContent = "";
    	// itService.azureService.add('Reply', data, {
			// success: function(results) {
				// if (item.replys == null || item.replys == undefined) item.replys = [];
				// item.replys.push(results.result);
			// }, error: function(err) {
				// itService.viewService.showError(err);
			// }
		// });
    // };
//     
    // $scope.likeIt = function(item) {
    	// var prevLikeId = item.prevLikeId;
    	// if (prevLikeId == null) {
    		// var data = {
	    		// refId: item.id,
	    		// whoMade: $localStorage.user.nickName,
	    		// whoMadeId: $localStorage.user.id
	    	// };
    		// itService.azureService.add('LikeIt', data, {
				// success: function(result) {
					// item.prevLikeId = result.result.id;
					// item.likeItCount++;
					// item.likeImage = "img/general_it_highlight_btn.png";
				// }, error: function(err) {
					// itService.viewService.showError(err);
				// }
			// });
    	// } else {
    		// var data = {
	    		// id: prevLikeId
	    	// };
    		// itService.azureService.del('LikeIt', data, {
				// success: function(result) {
					// item.prevLikeId = null;
					// item.likeItCount--;
					// item.likeImage = "img/general_it_btn.png";
				// }, error: function(err) {
					// itService.viewService.showError(err);
				// }
			// });
    	// }
    // };
//     
    // $scope.test = function(e) {
    	// console.log('here', e);
    // };
//     
    // $scope.gotoWhomade = function(whoMadeId) {
    	// $location.path("/user_profile/"+whoMadeId);
    // };
//     
    // $scope.productTagOpts = [
	    // {val : 0, kor: "아우터"},
	    // {val : 1, kor: "셔츠"},
	    // {val : 2, kor: "니트"},
	    // {val : 3, kor: "맨투맨"},
	    // {val : 4, kor: "후드"},
	    // {val : 5, kor: "티셔츠"},
	    // {val : 6, kor: "팬츠"},
	    // {val : 7, kor: "원피스"},
	    // {val : 8, kor: "스커트"},
	    // {val : 9, kor: "신발"},
	    // {val : 10, kor: "양말"},
	    // {val : 11, kor: "가방"},
	    // {val : 12, kor: "악세사리"},
	    // {val : 13, kor: "모자"},
	    // {val : 14, kor: "아이템"}
    // ];
//     
    // $scope.priceChange = function(){
    	// if ($scope.productTag.price == undefined) return;
    	// var toNum = $scope.productTag.price.split(",").join("");
    	// $scope.productTag.price = $filter('number')(toNum);
    // };
//     
    // $scope.validProductTag = function() {
    	// var enable = ($scope.productTagForm.category.$dirty && $scope.productTagForm.shopName.$dirty && $scope.productTagForm.webPage.$dirty && $scope.productTagForm.price.$dirty);
    	// enable &= !$scope.productTagForm.shopName.$error.required && !$scope.productTagForm.webPage.$error.url && !$scope.productTagForm.webPage.$error.required && !$scope.productTagForm.price.$error.required;
//     	
    	// return !enable;
    // };
// 	 
// 
//     
// 	
	// $scope.addProductTag = function(item){
// 		
		// var refId = $scope.selected.id;
		// var data = $scope.productTag;
// 		
		// data['price'] = parseFloat($scope.productTag.price.split(",").join(""));
		// data['refId'] = refId;
		// data['whoMade'] = $localStorage.user.nickName;
		// data['whoMadeId'] = $localStorage.user.id;
// 		
		// itService.azureService.add('ProductTag', data, {
			// success: function(results) {
				// if ($scope.tags == null || $scope.tags == undefined) $scope.tags = [];
				// $scope.tags.push(results.result);
				// $scope.productTag = {};
			// }, error: function(err) {
				// console.log(err);
				// itService.viewService.showError(err);
			// }
		// });
	// };
// 	
	// $scope.deleteTag = function(tag){
// 		
		// itService.azureService.del('ProductTag', tag, {
			// success: function(results) {
				// if ($scope.tags == null || $scope.tags == undefined) $scope.tags = [];
				// $scope.tags = $filter('filter')($scope.tags, {id: "!"+tag.id});
			// }, error: function(err) {
				// console.log(err);
				// itService.viewService.showError(err);
			// }
		// });
	// };
// 	
	// $scope.isMineTag = function(tag){
		// // return tag.whoMadeId == $localStorage.user.id;
		// return true;
	// };
// 	
	// $scope.enterProductTag=function(item, e){
		// if (e.keyCode==13) {
			// $scope.addProductTag(item);
		// }
	// };
// 		
	// $scope.makeUserImage = function(id) {
		// return "https://athere.blob.core.windows.net/item-user-profile/" + id;	
	// };
	// $scope.makeContentImage = function(id) {
		// return "https://athere.blob.core.windows.net/item-image-container/" + id;
	// };
	// $scope.makePrettyTime = function(datetime) {
		// return new ItDateTime(datetime).toPrettyDateTime();
	// };
}); 