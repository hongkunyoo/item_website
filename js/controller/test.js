itemApp.controller('testController', function($rootScope, $scope, $location, $localStorage, $filter, $state, itService, $stateParams) {
	$('#blog-landing').pinterest_grid({
		no_columns : 4,
		padding_x : 10,
		padding_y : 10,
		margin_bottom : 50,
		single_column_breakpoint : 700
	});

	$scope.test = function() {

		var item = {
			id : "E5ED69CC-919E-4A50-AC9B-FAD5518AFA5F",
			whoMadeId : "3E078913-7520-42AD-995C-2C745AD054A5",
			content : "♡#♡*$♣$♣$*$*-$-$"
		};

		var reply = {
			content : "web test reply",
			whoMade : "채수",
			whoMadeId : "3EE75145-41AC-4B0B-84C7-4084FEA149B3",
			refId : "E5ED69CC-919E-4A50-AC9B-FAD5518AFA5F"
		};

		var type = "Reply";
		var noti = {
			whoMade : "채수",
			whoMadeId : "3EE75145-41AC-4B0B-84C7-4084FEA149B3",
			refWhoMade : "Hwa_Jeong",
			refWhoMadeId : "3E078913-7520-42AD-995C-2C745AD054A5",
			type : type
		};

		var userId = "default";

		// itService.aimHelper.add(type, reply, noti, {
		// success : function(results) {
		// console.log(results);
		// },
		// error : function(err) {
		// console.log(err);
		// }
		// });

		var delType = "Reply";
		var delReply = {
			id : "D4C12C0C-F5AD-4122-A3B3-3598CF3353AA",
		};

		// itService.aimHelper.del(delType, delReply, {
		// success : function(results) {
		// console.log(results);
		// },
		// error : function(err) {
		// console.log(err);
		// }
		// });

		// itService.aimHelper.listMyNoti(0, "3EE75145-41AC-4B0B-84C7-4084FEA149B3", {
		// success : function(results) {
		// console.log(results);
		// },
		// error : function(err) {
		// console.log(err);
		// }
		// });

		var user = {
			itUserId : "20175962",
			nickName : "test",
			platform : "test_platform",
			selfIntro : "self Intro"
		};
		var id = "D63FE66F-32DE-4ECA-B9D8-11365B6D3DD0";

		// itService.userHelper.updateUser(user, {
		// success : function(results) {
		// console.log(results);
		// },
		// error : function(err) {
		// console.log(err);
		// }
		// });

		// itService.userHelper.signin(user, {
		// success : function(results) {
		// console.log(results);
		// },
		// error : function(err) {
		// console.log(err);
		// }
		// });
	};
	$scope.test();
});
