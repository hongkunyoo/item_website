// itemApp.controller('testController', function($scope, $location, $rootScope, $localStorage, itService) {
// 	
	// // https://it-emtest.azure-mobile.net/api/test_session
	// // itService.viewService.errorMessage('HELLO');
	// // itService.viewService.showError('Oh no!');
	// $scope.item = $location.search();
// 	
	// $scope.open = function() {
		// var session = $localStorage.session;
		// itService.azureService.sessionHelper('open', session, {
			// success: function(result) {
				// console.log(result);
				// $scope.screen = result;
				// // $scope.$apply();
			// }, error: function(err) {
				// console.log(err);
				// itService.viewService.showError(e);
			// }
		// });
	// };
// 	
	// $scope.test = function() {
		// var session = $localStorage.session;
		// itService.azureService.sessionHelper('test', session, {
			// success: function(result) {
				// console.log(result);
				// $scope.screen = result;
				// // $scope.$apply();
			// }, error: function(err) {
				// console.log(err);
				// itService.viewService.showError(e);
			// }
		// });
	// };
// 	
	// $scope.close = function() {
		// var session = $localStorage.session;
		// itService.azureService.sessionHelper('close', session, {
			// success: function(result) {
				// console.log(result);
				// $scope.screen = result;
				// // $scope.$apply();
			// }, error: function(err) {
				// console.log(err);
				// itService.viewService.showError(e);
			// }
		// });
	// };
	// $scope.upload = function(file, itemName, sasQueryString, callback) {
// 		
		// var config = {
			// baseUrl: "http://athere.blob.core.windows.net/item-user-profile/" + itemName + "?",
			// sasToken: sasQueryString,
			// file: file,
			// // blockSize: $scope.size,
			// progress: function(e){
				// console.log('progress' + e);
			// },
			// complete: function(e){
				// console.log('complete' + e);
				// callback.success(e);
			// },
			// error: function(e){
				// console.log('error' + e);
				// callback.error(e);
				// itService.viewService.showError(e);
			// }
		// };
// 
		// itService.azureBlob.upload(config);
	// };
// 
	// if (window.File && window.FileReader && window.FileList && window.Blob) {
		// // Great success! All the File APIs are supported.
	// } else {
		// alert('The File APIs are not fully supported in this browser.');
	// }
// 
// 	
	// $("#uploader").change(function (e){
		// var file = (this.files[0]);
		// $scope.size = this.files[0].size;
		// var reader = new FileReader();
// 		
		// // console.log(file);
// 		
		// reader.onload = function(e){
			// var buffer = e.target.result;
			// var retVal = parseString(buffer);
			// var blob = b64toBlob(retVal.str, retVal.type);
			// $scope.blob = blob;
		// };
		// reader.readAsDataURL(file);
// 		
		// itService.imageService.loadImgData(file, function(imageData){
			// itService.imageService.getImage(imageData, itService.imageService.MAX_SIZE, function(image){
				// var canvas = document.getElementById("myCanvas1");
				// var imgData = itService.imageService.cropSquare(image);
				// itService.imageService.getImage(imgData, itService.imageService.MAX_SIZE, function(_image){
					// itService.imageService.drawToCanvas(canvas, _image);
				// });
			// });
		// });
	// });
// 	
	// // parseString("data:image/jpeg;base64,/9j/4AAQSkZ");
// 	
	// $scope.testingSas = function() {
		// console.log('testSas click');
		// itService.azureService.testSession({
			// success: function(result) {
				// // console.log(result.result.sasQueryString);
				// var sasQueryString = (result.result.sasQueryString);
				// console.log($scope.blob);
				// $scope.upload($scope.blob, "plz_work", sasQueryString, {
					// success: function(result) {
						// console.log('done : '+result);	
					// }, error: function(err) {
						// console.log(err);
					// }
				// });
// 				
			// }, error: function(err) {
				// console.log('err'+err);
			// }
		// });
	// };
// 	
// 	
// });
// 
// itemApp.controller('indexController', function($rootScope, $location, $rootScope, $localStorage) {
// 	
	// $rootScope.logout = function(){
		// $localStorage.$reset("session");
		// $location.path("/");	
	// };
// 	
// }).controller('loginController', function($scope, $location, $localStorage, $rootScope, itService) {
   // // $localStorage.$reset("session");
//    
   // var session = $localStorage.session;
   // if (session != undefined) {
   		// itService.azureService.sessionHelper('open', session, {
			// success : function(result) {
				// itService.azureService.page = 0;
				// $location.path("/list");
			// },
			// error : function() {
				// $scope.alerMessageValue = true;
			// }
		// });
		// return;
   // }
//    
	// $scope.login = function() {
		// itService.viewService.showProgress();
		// $scope.user = {
			// id: $("#user_id").val(),
			// password: $("#user_password").val()
		// };
		// itService.azureService.signin({
			// userId : $scope.user.id,
			// password : $scope.user.password
		// }, {
			// success : function(result) {
				// itService.viewService.hideProgress();
				// if (result.result.isValid) {
					// $localStorage.$default({
						// session: result.result.session,
						// user : result.result.user
					// });
					// $location.path("/list");	
				// } else {
					// $scope.alerMessageValue = true;		
				// }
// 					
			// },
			// error : function(err) {
				// console.log(err);
				// itService.viewService.showError(e);
			// }
		// });
	// };
// 	
	// $scope.signUp = function() {
		// $location.path("/signup");
	// };
// 	
// }).controller('signupController', function($scope, $location, $controller, $rootScope, $stateParams, itService) {
	// var _canvas = document.getElementById("myCanvas");
	// var base_image = new Image();
	// // $scope.image = base_image;
  	// base_image.onload = function(){
  		// itService.imageService.drawToCanvas(_canvas, base_image);
  	// };
  	// base_image.width = 212;
  	// base_image.height = 212;
  	// base_image.src = 'img/default-user-image.png';
//   	
	// $("#uploader").change(function (e){
		// var file = this.files[0];
// 		
		// itService.imageService.loadImgData(file, function(image){
			// itService.imageService.cropSquare(image, function(cropped_image){
				// itService.imageService.degradeResol(cropped_image, itService.imageService.MAX_SIZE, function(degraded){
					// var canvas = document.getElementById("myCanvas");
					// itService.imageService.drawToCanvas(canvas, degraded);
					// $scope.image = itService.imageService.imageToBlob(degraded);		
				// });
				// itService.imageService.degradeResol(cropped_image, itService.imageService.THUMB_NAIL_SIZE, function(thumbnail){
					// $scope.image_thumbnail = itService.imageService.imageToBlob(thumbnail);		
				// });
// 				
			// });
// 			
		// });
	// });
// 	
// 	
	// $scope.blur = function(key){
		// var keyValue = $scope[key];
		// if (keyValue == undefined) return;
// 		
		// $scope['class_feedback_'+key] = 'glyphicon-refresh glyphicon-refresh-animate';
// 		
		// var validType = "userId";
		// if (key == 'userId') {
			// validType = "userId";
			// var state = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test((keyValue));
			// if (!state) {
				// $scope['class_group_'+key] = 'has-error';
				// $scope['class_feedback_'+key] = 'glyphicon-remove';
				// return;
			// }
		// } else if (key == 'inviteKey') {
			// validType = "SELLER";
		// }
// 			
		// // glyphicon-refresh-animate
		// itService.azureService.isValid(keyValue, validType, {
			// success: function(result) {
				// $scope[key+'Value'] = result;
				// if (result) {
					// $scope['class_group_'+key] = 'has-success';
					// $scope['class_feedback_'+key] = 'glyphicon-ok';
					// // $scope.$apply();
// 					
				// } else {
					// $scope['class_group_'+key] = 'has-error';
					// $scope['class_feedback_'+key] = 'glyphicon-remove';
					// // $scope.$apply();
				// }
			// }, error: function(err) {
				// $scope.key = false;
				// $scope['class_group_'+key] = 'has-error';
				// $scope['class_feedback_'+key] = 'glyphicon-remove';
				// // $scope.$apply();
			// }
		// });
// 		
// 		
	// };
// 	
	// var inviteKey = $stateParams.inviteKey;
	// if (inviteKey != undefined) {
		// $scope.inviteKey = inviteKey;
		// $scope.blur('inviteKey');
	// }
// 	
	// $scope.checkPwd = function() {
		// if ($scope.pwd1 == $scope.pwd2) {
			// $scope.pwd = true;
			// $scope.class_group_pwd = 'has-success';
			// $scope.class_feedback_pwd = 'glyphicon-ok';
		// } else {
			// $scope.pwd = false;
			// $scope.class_group_pwd = 'has-error';
			// $scope.class_feedback_pwd = 'glyphicon-remove';
		// }
	// };
// 	
	// $scope.signup = function() {
		// if (!($scope.inviteKeyValue && $scope.userIdValue && $scope.pwd)) {
			// itService.viewService.showError('Invalid', "Checkout your ID, password, Invite key");
			// return;
		// }
		// if ($scope.nickName == undefined) {
			// itService.viewService.showError('UserName', "UserName Required");
			// return;
		// }
		// if ($scope.image == undefined) {
			// itService.viewService.showError('Profile', "Upload your profile");
			// return;
		// }
// 		
// 		
		// var payload = {
			// user : {
				// userId : $scope.userId,
				// password : $scope.pwd1,
				// nickName : $scope.nickName,
				// webPage : ($scope.webPage==null) ? "" : $scope.webPage,
				// selfIntro: ($scope.selfIntro==null) ? "" : $scope.selfIntro,
				// platform : "web",
				// email : $scope.userId,
			// },
			// invite: {
				// inviteKey : $scope.inviteKey,
				// type : "SELLER"	
			// }
		// };
		// $('#reg').button('loading');
		// itService.viewService.showProgress();
		// var asyncChainer = itService.asyncChainer;
		// asyncChainer.async([
			// function() {
				// itService.azureService.signup(payload, {
					// success: function(result) {
						// if (result.result.isValid) {
							// var id = result.result.user.id;
							// asyncChainer.executeAsync(id);
						// } else {
							// console.log('signup failed');
							// itService.viewService.showError('signup failed');
						// }
					// }, error: function(err) {
						// console.log(err);
						// itService.viewService.showError(err);
					// }
				// });
			// }, function(fileName) {
				// itService.azureService.invalidateInviteky($scope.inviteKey, {
					// success: function(result) {
						// asyncChainer.executeAsync(fileName);
					// }, error: function(err) {
						// itService.viewService.showError('invalidate invite key failed'+ err);
					// }
				// });
// 								 
			// }, function(fileName) {
				// itService.azureService.getSasQuery(fileName, {
					// success: function(sasQueryString) {
						// asyncChainer.executeAsync(fileName, sasQueryString);
					// }, error: function(err) {
						// console.log(err);
						// itService.viewService.showError(err);
					// }
				// });
			// }, function(fileName, sasQueryString) {
				// var config = {
					// baseUrl: "http://athere.blob.core.windows.net/item-user-profile/" + fileName + "?",
					// sasToken: sasQueryString,
					// file: $scope.image,
					// // blockSize: $scope.size,
					// progress: function(e){
						// // console.log('progress' + e);
					// },
					// complete: function(e){
						// console.log('complete' + e);
						// asyncChainer.executeAsync(fileName);
					// },
					// error: function(err){
						// console.log(err);
						// itService.viewService.showError(err);
					// }
				// };
// 		
				// itService.azureBlob.upload(config);
// 				
			// }, function(fileName) {
				// fileName = fileName+"_thumbnail";
				// itService.azureService.getSasQuery(fileName, {
					// success: function(sasQueryString) {
						// asyncChainer.executeAsync(fileName, sasQueryString);
					// }, error: function(err) {
						// console.log(err);
						// itService.viewService.showError(err);
					// }
				// });
			// }, function(fileName, sasQueryString) {
				// var config = {
					// baseUrl: "http://athere.blob.core.windows.net/item-user-profile/" + fileName + "?",
					// sasToken: sasQueryString,
					// file: $scope.image_thumbnail,
					// // blockSize: $scope.size,
					// progress: function(e){
						// // console.log('progress' + e);
					// },
					// complete: function(e){
						// console.log('complete' + e);
						// itService.viewService.hideProgress();
						// $location.path("/");
					// },
					// error: function(err){
						// console.log(err);
						// itService.viewService.showError(err);
					// }
				// };
// 		
				// itService.azureBlob.upload(config);
			// }
		// ]);
// 		
	// };
// }).controller('inviteController', function($scope, $location, $controller, $rootScope, itService) {
	// $scope.createInvite = function() {
		// var type = $scope.type;
		// itService.azureService.createInviteKey(type, {
			// success: function(result) {
				// $scope.screen = result.response;
				// $scope.inviteUrl = location.protocol + '//' + location.host + '/item_website/#/signup/' + result.response;
			// }, error: function(err) {
				// $scope.screen = err;
				// console.log(err);
				// itService.viewService.showError(err);
			// }
		// });
	// };
// }).controller('listController', function($rootScope, $scope, $location, $localStorage, $filter, $state, itService) {
// 	
	// if ($localStorage.session == undefined) {
		// $location.path("/");
		// console.log('in if');
		// return;
	// }
// 	
	// itService.azureService.sessionHelper('open', $localStorage.session, {
		// success: function(result) {
			// if (!result) {
				// console.log('session failed');
				// $localStorage.$reset("session");
				// $location.path("/");				
			// } else console.log('session connect');
		// }, error: function(err) {
			// console.log(err);
			// itService.viewService.showError(err);
		// }			
	// });
// 	
// 	
	// $scope.home = function() {
// 		
	// };
	// console.log($state.current);
// 	
	// $scope.list_active = $state.current.name;
	// $state.go('list.home');
// 	
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
// }); 