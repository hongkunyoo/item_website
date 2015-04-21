itemApp.factory("aimHelper", function($rootScope, azureService) {
	var client = azureService.getMobileClient();
	
	var AIM_ADD = "aim_add";
	var AIM_ADD_UNIQUE = "aim_add_unique";
	var AIM_GET_ITEM = "aim_get_item";
	var AIM_UPDATE = "aim_update";
	var AIM_DELETE = "aim_delete";	
	var AIM_DELETE_ITEM = "aim_delete_item";
	var AIM_LIST = "aim_list";
	var AIM_LIST_RECENT = "aim_list_recent";
	var AIM_LIST_ITEM = "aim_list_item";
	var AIM_LIST_MY_ITEM = "aim_list_my_item";
	var AIM_LIST_IT_ITEM = "aim_list_it_item";
	var IS_VALID = "is_valid";
	var INVALIDATE_INVITE_KEY = "invalidate_invitekey";
	
	return {
		setMobileClient: function(_mClient) {
			client = _mClient;
		}, listItem: function(page, userId, callback) {
			client.invokeApi(AIM_LIST_ITEM, {
		        body: {
		        	page: page,
		        	userId: userId
	        	},
		        method: "post"
		    }).done(function (results) {
		        if (callback.success != undefined)
		    		$rootScope.$apply(function(){callback.success(results);});
		    }, function(err) {
		        if (callback.error != undefined)
		    		$rootScope.$apply(function(){callback.error(err);});
		    });
	    }, getItem: function(itemId, userId, callback) {
	    	client.invokeApi(AIM_GET_ITEM, {
		        body: {
		        	itemId: itemId,
		        	userId: userId
	        	},
		        method: "post"
		    }).done(function (results) {
		        if (callback.success != undefined)
		    		$rootScope.$apply(function(){callback.success(results);});
		    }, function(err) {
		        if (callback.error != undefined)
		    		$rootScope.$apply(function(){callback.error(err);});
		    });
	    }, listMyItem: function(userId, callback) {
			client.invokeApi(AIM_LIST_MY_ITEM, {
		        body: {
		        	userId: userId
	        	},
		        method: "post"
		    }).done(function (results) {
		        if (callback.success != undefined)
		    		$rootScope.$apply(function(){callback.success(results);});
		    }, function(err) {
		        if (callback.error != undefined)
		    		$rootScope.$apply(function(){callback.error(err);});
		    });
	    }, listItItem: function(userId, callback) {
	    	client.invokeApi(AIM_LIST_IT_ITEM, {
		        body: {
		        	userId: userId
	        	},
		        method: "post"
		    }).done(function (results) {
		        if (callback.success != undefined)
		    		$rootScope.$apply(function(){callback.success(results);});
		    }, function(err) {
		        if (callback.error != undefined)
		    		$rootScope.$apply(function(){callback.error(err);});
		    });
	    }, list: function(table, itemId, callback) {
	    	client.invokeApi(AIM_LIST, {
		        body: {
		        	table: table,
		        	refId: itemId
	        	},
		        method: "post"
		    }).done(function (results) {
		        if (callback.success != undefined)
		    		$rootScope.$apply(function(){callback.success(results);});
		    }, function(err) {
		        if (callback.error != undefined)
		    		$rootScope.$apply(function(){callback.error(err);});
		    });
	    }, listRecent: function() {
	    	client.invokeApi(AIM_LIST_RECENT, {
		        body: {
		        	table: table,
		        	refId: itemId
	        	},
		        method: "post"
		    }).done(function (results) {
		        if (callback.success != undefined)
		    		$rootScope.$apply(function(){callback.success(results);});
		    }, function(err) {
		        if (callback.error != undefined)
		    		$rootScope.$apply(function(){callback.error(err);});
		    });
	    }, add: function(table, item, callback) {
	    	client.invokeApi(AIM_ADD, {
		        body: {
		        	table: table,
		        	data: item
	        	},
		        method: "post"
		    }).done(function (results) {
		        if (callback.success != undefined)
		    		$rootScope.$apply(function(){callback.success(results);});
		    }, function(err) {
		        if (callback.error != undefined)
		    		$rootScope.$apply(function(){callback.error(err);});
		    });
	    }, addUnique: function(table, item, callback) {
    		client.invokeApi(AIM_ADD_UNIQUE, {
		        body: {
		        	table: table,
		        	data: item
	        	},
		        method: "post"
		    }).done(function (results) {
		        if (callback.success != undefined)
		    		$rootScope.$apply(function(){callback.success(results);});
		    }, function(err) {
		        if (callback.error != undefined)
		    		$rootScope.$apply(function(){callback.error(err);});
		    });
	    }, del: function(table, item, callback) {
	    	client.invokeApi(AIM_DELETE, {
		        body: {
		        	table: table,
		        	data: item
	        	},
		        method: "post"
		    }).done(function (results) {
		        if (callback.success != undefined)
		    		$rootScope.$apply(function(){callback.success(results);});
		    }, function(err) {
		        if (callback.error != undefined)
		    		$rootScope.$apply(function(){callback.error(err);});
		    });
	    }, delItem: function(table, item, callback) {
	    	client.invokeApi(AIM_DELETE_ITEM, {
		        body: {
		        	table: table,
		        	data: item
	        	},
		        method: "post"
		    }).done(function (results) {
		        if (callback.success != undefined)
		    		$rootScope.$apply(function(){callback.success(results);});
		    }, function(err) {
		        if (callback.error != undefined)
		    		$rootScope.$apply(function(){callback.error(err);});
		    });
	    }, update: function(item, callback) {
	    	client.invokeApi(AIM_UPDATE, {
		        body: {
		        	table: table,
		        	data: item
	        	},
		        method: "post"
		    }).done(function (results) {
		        if (callback.success != undefined)
		    		$rootScope.$apply(function(){callback.success(results);});
		    }, function(err) {
		        if (callback.error != undefined)
		    		$rootScope.$apply(function(){callback.error(err);});
		    });
	    }, isValid : function(key, validType, callback) {
			client.invokeApi(IS_VALID, {
				body : {
					key : key,
					validType : validType
				},
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined)
					$rootScope.$apply(function(){callback.success(results);});
			}, function(err) {
				if (callback.error != undefined)
					$rootScope.$apply(function(){callback.error(err);});
			});
		}, invalidateInviteky: function(inviteKey, callback) {
			client.invokeApi(INVALIDATE_INVITE_KEY, {
				body : {
					inviteKey : inviteKey
				},
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined)
					$rootScope.$apply(function(){callback.success(results);});
			}, function(err) {
				if (callback.error != undefined)
					$rootScope.$apply(function(){callback.error(err);});
			});
		}
	};
});