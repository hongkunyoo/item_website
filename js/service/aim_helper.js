itemApp.factory("aimHelper", function($rootScope, azureService) {
	var mClient = azureService.getMobileClient();

	var AIM_ADD = "aim_add";
	var AIM_ADD_UNIQUE = "aim_add_unique";
	var AIM_DELETE = "aim_delete";
	var AIM_DELETE_ITEM = "aim_delete_item";
	var AIM_GET_ITEM = "aim_get_item";
	var AIM_LIST = "aim_list";
	var AIM_LIST_ITEM = "aim_list_item";
	var AIM_LIST_MY_ITEM = "aim_list_my_item";
	var AIM_LIST_IT_ITEM = "aim_list_it_item";
	var AIM_LIST_MY_NOTI = "aim_list_my_noti";

	return {
		setMobileClient : function(_mClient) {
			mClient = _mClient;
		},
		add : function(tableName, item, noti, callback) {
			mClient.invokeApi("aim_add", {
				body : {
					item : {
						table : tableName,
						data : item
					},
					noti : {
						data : noti
					}
				},
				method : "post"
			}).done(function(addedItem) {
				if (callback.success != undefined) {
					$rootScope.$apply(function() {
						callback.success(addedItem.result);
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
		addItem : function(item, tagList, callback) {
			mClient.invokeApi(AIM_ADD_UNIQUE, {
				body : {
					item : {
						data : item
					},
					tagList : tagList
				},
				method : "post"
			}).done(function(addedItem) {
				if (callback.success != undefined) {
					$rootScope.$apply(function() {
						callback.success(addedItem.result);
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
		addUnique : function(tableName, item, noti, callback) {
			mClient.invokeApi(AIM_ADD_UNIQUE, {
				body : {
					item : {
						table : tableName,
						data : item
					},
					noti : {
						data : noti
					}
				},
				method : "post"
			}).done(function(addedItem) {
				if (callback.success != undefined) {
					$rootScope.$apply(function() {
						callback.success(addedItem.result);
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
		del : function(tableName, item, callback) {
			mClient.invokeApi("aim_delete", {
				body : {
					table : tableName,
					data : item
				},
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined) {
					$rootScope.$apply(function() {
						callback.success(results.result);
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
		deleteItem : function(item, callback) {
			mClient.invokeApi(AIM_DELETE_ITEM, {
				body : {
					data : item
				},
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined) {
					$rootScope.$apply(function() {
						callback.success(results,result);
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
		getItem : function(item, userId, callback) {
			mClient.invokeApi(AIM_GET_ITEM, {
				body : {
					item : {
						data : item
					},
					userId : userId
				},
				method : "post"
			}).done(function(item) {
				if (callback.success != undefined) {
					$rootScope.$apply(function() {
						callback.success(item.result);
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
		list : function(tableName, refId, callback) {
			mClient.invokeApi("aim_list", {
				body : {
					table : tableName,
					refId : refId
				},
				method : "post"
			}).done(function(items) {
				if (callback.success != undefined) {
					callback.success(items.result);
				}
			}, function(err) {
				if (callback.error != undefined) {
					$rootScope.$apply(function() {
						callback.error(err);
					});
				}
			});
		},
		listItem : function(page, userId, callback) {
			mClient.invokeApi(AIM_LIST_ITEM, {
				body : {
					page : page,
					userId : userId
				},
				method : "post"
			}).done(function(items) {
				if (callback.success != undefined) {
					callback.success(items.result);
				}
			}, function(err) {
				if (callback.error != undefined) {
					$rootScope.$apply(function() {
						callback.error(err);
					});
				}
			});
		},
		listMyItem : function(userId, callback) {
			mClient.invokeApi(AIM_LIST_MY_ITEM, {
				body : {
					userId : userId
				},
				method : "post"
			}).done(function(items) {
				if (callback.success != undefined) {
					callback.success(items.result);
				}
			}, function(err) {
				if (callback.error != undefined) {
					$rootScope.$apply(function() {
						callback.error(err);
					});
				}
			});
		},
		listItItem : function(userId, callback) {
			mClient.invokeApi(AIM_LIST_IT_ITEM, {
				body : {
					userId : userId
				},
				method : "post"
			}).done(function(items) {
				if (callback.success != undefined) {
					callback.success(items.result);
				}
			}, function(err) {
				if (callback.error != undefined) {
					$rootScope.$apply(function() {
						callback.error(err);
					});
				}
			});
		},
		listMyNoti : function(page, userId, callback) {
			mClient.invokeApi(AIM_LIST_MY_NOTI, {
				body : {
					page : page,
					userId : userId
				},
				method : "post"
			}).done(function(notis) {
				if (callback.success != undefined) {
					callback.success(notis.result);
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
