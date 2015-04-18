itemApp.factory("azureService", function($rootScope) {
	
	var real_url = "https://it-em.azure-mobile.net/";
	var real_key = "TnmDvNkgfghvrcXjoQhRjEdcyFCEzd99";
	
	var test_url = "https://it-em-test.azure-mobile.net/";
	var test_key = "jidjLSdrpbivsOXwsQStSSHGIKxhKa66";
	
	var realClient = new WindowsAzure.MobileServiceClient(real_url, real_key);
	
	var testClient = new WindowsAzure.MobileServiceClient(test_url, test_key);
	
	var mobileClient = realClient;
	
	
	return {
		
		getMobileClient: function() {
			return mobileClient;
		},
		SERVER : {
			REAL: 0,
			TEST: 1
		},
		switchServer: function(type) {
			if (type == this.SERVER.REAL) {
				mobileClient = realClient;
			} else if (type == this.SERVER.TEST) {
				mobileClient = testClient;
			} else {
				console.log(type);
			}
		},
		signin : function(userInfo, callback) {
			mobileClient.invokeApi("signin", {
				body : {
					"user" : userInfo
				},
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined)
					$rootScope.$apply(function(){callback.success(results);});
			}, function(err) {
				if (callback.error != undefined)
					callback.error(err);
			});
		},
		createInviteKey : function(type, callback) {
			mobileClient.invokeApi("create_invite_key", {
				body : {
					"type" : type
				},
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined)
					// callback.success(results);
					$rootScope.$apply(function(){callback.success(results);});
			}, function(err) {
				if (callback.error != undefined)
					callback.error(err);
			});
		},
		isValid : function(key, validType, callback) {
			mobileClient.invokeApi("is_valid", {
				body : {
					key : key,
					validType : validType
				},
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined)
					// callback.success(results.result);
					$rootScope.$apply(function(){callback.success(results.result);});
			}, function(err) {
				if (callback.error != undefined)
					callback.error(err);
			});
		},
		signup : function(payload, callback) {
			mobileClient.invokeApi("signup", {
				body : payload,
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined)
					// callback.success(results);
					$rootScope.$apply(function(){callback.success(results);});
			}, function(err) {
				if (callback.error != undefined)
					callback.error(err);
			});
		},
		invalidateInviteky: function(inviteKey, callback) {
			mobileClient.invokeApi("invalidate_invitekey", {
				body : {
					inviteKey : inviteKey
				},
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined)
					$rootScope.$apply(function(){callback.success(results.result);});
			}, function(err) {
				if (callback.error != undefined)
					callback.error(err);
			});
		},
		sessionHelper : function(action, session, callback) {
			mobileClient.invokeApi("session_helper", {
				body : {
					session : session,
					action : action
				},
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined)
					// callback.success(results.result);
					$rootScope.$apply(function(){callback.success(results.result);});
			}, function(err) {
				if (callback.error != undefined)
					callback.error(err);
			});
		},
		listItem : function(page, userId, callback) {
			mobileClient.invokeApi("aim_list_item", {
				body : {
					page : page,
					userId : userId
				},
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined) {
					// $rootScope.$apply(function(){callback.success(results.result);});
					callback.success(results.result);
				}
			}, function(err) {
				if (callback.error != undefined) {
					callback.error(err);
				}
			});
		},
		list : function(tableName, refId, callback) {
			mobileClient.invokeApi("aim_list", {
				body : {
					table : tableName,
					refId : refId
				},
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined)
					// callback.success(results.result);
					$rootScope.$apply(function(){callback.success(results.result);});
			}, function(err) {
				if (callback.error != undefined)
					callback.error(err);
			});
		}, add : function(tableName, data, noti, callback) {
			mobileClient.invokeApi("aim_add", {
				body : {
					item : {
						table : tableName,
						data : data	
					}, noti : noti
				},
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined)
					$rootScope.$apply(function(){callback.success(results);});
			}, function(err) {
				if (callback.error != undefined)
					callback.error(err);
			});
		}, del: function(tableName, data, callback) {
			 mobileClient.invokeApi("aim_delete", {
				method : "post",
				body: {
					table: tableName,
					data: data
				}
			}).done(function(results) {
				if (callback.success != undefined)
					$rootScope.$apply(function(){callback.success(results);});
			}, function(err) {
				if (callback.error != undefined)
					callback.error(err);
			});
		}, testSession: function(callback) {
			mobileClient.invokeApi("test_session", {
				method : "post"
			}).done(function(results) {
				if (callback.success != undefined)
					$rootScope.$apply(function(){callback.success(results);});
			}, function(err) {
				if (callback.error != undefined)
					callback.error(err);
			});
		}, getSasQuery: function(fileName, callback) {
			mobileClient.invokeApi("get_sas_query", {
				method : "post",
				body : {
					fileName: fileName,
					containerName : "item-user-profile"
				}
			}).done(function(results) {
				if (callback.success != undefined)
					$rootScope.$apply(function(){callback.success(results.result.sasQueryString);});
			}, function(err) {
				if (callback.error != undefined)
					callback.error(err);
			});
		}, getUser: function(id, callback) {
			mobileClient.getTable('ItUser')
				.where({id: id})
				.read()
			.done(function(results){
				if (results.length == 1) {
					if (callback.success != undefined)
						$rootScope.$apply(function(){callback.success(results[0]);});	
				} else {
					if (callback.error != undefined)
						callback.error(results);
				}
				
			}, function(err){
				if (callback.error != undefined)
					callback.error(err);
			});
		}
	};
});