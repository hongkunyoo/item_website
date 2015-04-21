itemApp.factory("userHelper", function($rootScope, azureService) {
	var mClient = azureService.getMobileClient();
	var table = mClient.getTable('ItUser');

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
					callback.error(err);
				}
			});
		},
		add : function(user, callback) {
			table.insert(user).done(function(addedUser) {
				if (callback.success != undefined) {
					$rootScope.$apply(callback.success(addedUser));
				}
			}, function(err) {
				if (callback.error != undefined) {
					$rootScope.$apply(callback.error(err));
				}
			});
		},
		get : function(id, callback) {
			table.where({
				id : id
			}).read().done(function(user) {
				if (callback.success != undefined) {
					$rootScope.$apply(callback.success(user));
				}
			}, function(err) {
				if (callback.error != undefined) {
					$rootScope.$apply(callback.error(err));
				}
			});
		},
		update : function(user, callback) {
			table.update(user).done(function(updatedUser) {
				if (callback.success != undefined) {
					$rootScope.$apply(callback.success(updatedUser));
				}
			}, function(err) {
				if (callback.error != undefined) {
					$rootScope.$apply(callback.error(err));
				}
			});
		}
	};
});
