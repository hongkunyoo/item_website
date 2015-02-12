itemApp.factory("userHelper", function($rootScope, azureService) {
	var mClient = azureService.getMobileClient();
	var table = mClient.getTable('ItUser');
	return {
		setMobileClient: function(_mClient) {
			mClient = _mClient;
			table = mClient.getTable('ItUser'); 
		}, add: function(user, callback) {
			table.insert(
		        user
		    ).done(function (results) {
		       if (callback.success != undefined)
		    		$rootScope.$apply(callback.success(results));
		    }, function(err) {
		        if (callback.error != undefined)
		        	$rootScope.$apply(callback.error(err));
		    });
		}, get: function(id, callback) {
			table.where({ id: id })
	        .read()
	        .done(function (results) {
	            if (callback.success != undefined)
	                $rootScope.$apply(callback.success(results));
	        }, function (err) {
	            if (callback.error != undefined)
	            	$rootScope.$apply(callback.error(err));
	        });
		}, getByNickName: function(nickName, callback) {
			table.where({ nickName: nickName })
	        .read()
	        .done(function (results) {
	            if (callback.success != undefined)
	                $rootScope.$apply(callback.success(results));
	        }, function (err) {
	            if (callback.error != undefined)
	                $rootScope.$apply(callback.error(err));
	        });
		}, getByItUserId: function(itUserId, callback) {
			table.where({ itUserId: itUserId })
	        .read()
	        .done(function (results) {
	            if (callback.success != undefined)
	                $rootScope.$apply(callback.success(results));
	        }, function (err) {
	            if (callback.error != undefined)
	                $rootScope.$apply(callback.error(err));
	        });
		}, update: function(user, callback) {
			table.update(user)
	        .done(function (results) {
	            if (callback.success != undefined)
	        		$rootScope.$apply(callback.success(results));
	        }, function (err) {
	            if (callback.error != undefined)
	            	$rootScope.$apply(callback.error(err));
	        });
		}
		
	};
});