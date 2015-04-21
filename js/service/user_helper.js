itemApp.factory("userHelper", function($rootScope, azureService) {
	var mClient = azureService.getMobileClient();
	var table = mClient.getTable('ItUser');

	var UPDATE_USER = "update_user";

	return {
		setMobileClient : function(_mClient) {
			mClient = _mClient;
			table = mClient.getTable('ItUser');
		},
		signin : function(user, device, callback) {
			mClient.invokeApi("signin", {
				body : {
					user : user,
					device : device
				},
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined) {
					$rootScope.$apply(function() {
						callback.success(results);
					});
				}
			}, function(err) {
				if (callback.error != undefined) {
					$rootScope.$apply(function() {
						callback.error(err);
					});
				}
			});
		},
		add : function(user, callback) {
			table.insert(user).done(function(addedUser) {
				if (callback.success != undefined) {
					$rootScope.$apply(function() {
						callback.success(addedUser);
					});
				}
			}, function(err) {
				if (callback.error != undefined) {
					$rootScope.$apply(function() {
						callback.error(err);
					});
				}
			});
		},
		getUser : function(id, callback) {
			table.where({
				id : id
			}).read().done(function(user) {
				if (callback.success != undefined) {
					$rootScope.$apply(function() {
						callback.success(user);
					});
				}
			}, function(err) {
				if (callback.error != undefined) {
					$rootScope.$apply(function() {
						callback.error(err);
					});
				}
			});
		},
		update : function(user, callback) {
			table.update(user).done(function(updatedUser) {
				if (callback.success != undefined) {
					$rootScope.$apply(function() {
						callback.success(updatedUser);
					});
				}
			}, function(err) {
				if (callback.error != undefined) {
					$rootScope.$apply(function() {
						callback.error(err);
					});
				}
			});
		},
		updateUser : function(user, callback) {
			mClient.invokeApi(UPDATE_USER, {
				body : {
					user : user
				},
				method : "post"
			}).done(function(resutls) {
				if (callback.success != undefined) {
					$rootScope.$apply(function() {
						callback.success(resutls);
					});
				}
			}, function(err) {
				if (callback.error != undefined) {
					$rootScope.$apply(function() {
						callback.error(err);
					});
				}
			});
		}
	};
}); 