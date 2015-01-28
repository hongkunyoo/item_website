// var url = "https://it-emtest.azure-mobile.net/";
// var key = "yHCLhyMsjiaLSbcMKeUdUOoZkbYXfK52";

var url = "https://it-em.azure-mobile.net/";
var key = "TnmDvNkgfghvrcXjoQhRjEdcyFCEzd99";

var mobileClient = new WindowsAzure.MobileServiceClient(url, key);

itemApp.factory("itService", function(azureService, viewService, imageService, asyncChainer, azureBlob) {
	return {
		azureService: azureService,
		viewService: viewService,
		imageService: imageService,
		asyncChainer: asyncChainer,
		// eventService: eventService,
		azureBlob: azureBlob
	};
});

itemApp.factory("azureService", function($rootScope) {
	return {
		page : 0,
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
				if (callback.success != undefined)
					$rootScope.$apply(function(){callback.success(results.result);});
					
			}, function(err) {
				if (callback.error != undefined)
					callback.error(err);
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
		}, add : function(tableName, data, callback) {
			mobileClient.invokeApi("aim_add", {
				body : {
					table : tableName,
					data : data
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

itemApp.factory("viewService", function($rootScope) {
	return {
		showProgress : function() {
			$('#waiting-overlay').show();
			
		}, hideProgress : function() {
			$('#waiting-overlay').hide();
		}, showError: function(title, msg) {
			if (msg == undefined) {
				msg = title;
				title = "Error Message";
			}
			$rootScope.errTitle = title;
			$rootScope.errContent = msg;
			$('#progressModal').modal('show');
			console.log(title, msg);			
		}, blockingError: function(msg) {
			$('#error-overlay').show();
			$rootScope.errorMessage = msg;
			console.log(msg);
		}
	};
});

// itemApp.factory("eventService", function() {
	// return {
		// isCalledFuncs : {},
		// waitingFuncs : {},
		// init : function(func) {
			// if (this.isCalledFuncs[func] == undefined) {
				// this.isCalledFuncs[func] = true;
				// func();
			// }
		// },
		// applyAndWait : function(func) {
			// if (this.waitingFuncs[func] == undefined || this.waitingFuncs[func] == false) {
				// this.waitingFuncs[func] = true;
				// func(func);
			// }
		// },
		// notify : function(func) {
			// this.waitingFuncs[func] = false;
		// }
	// };
// }); 

itemApp.factory("imageService", function() {
	return new ItImageUtil();
});


itemApp.factory("asyncChainer", function() {
	return new AsyncChainer();
});
