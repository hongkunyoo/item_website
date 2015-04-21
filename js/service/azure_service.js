itemApp.factory("azureService", function($rootScope) {
	var real_url = "https://it-em.azure-mobile.net/";
	var real_key = "TnmDvNkgfghvrcXjoQhRjEdcyFCEzd99";

	var test_url = "https://it-em-test.azure-mobile.net/";
	var test_key = "jidjLSdrpbivsOXwsQStSSHGIKxhKa66";

	var realClient = new WindowsAzure.MobileServiceClient(real_url, real_key);
	var testClient = new WindowsAzure.MobileServiceClient(test_url, test_key);
	var mobileClient = testClient;

	return {
		getMobileClient : function() {
			return mobileClient;
		},
		SERVER : {
			REAL : 0,
			TEST : 1
		},
		switchServer : function(type) {
			if (type == this.SERVER.REAL) {
				mobileClient = realClient;
			} else if (type == this.SERVER.TEST) {
				mobileClient = testClient;
			}
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
					$rootScope.$apply(function() {
						callback.success(results);
					});
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
					$rootScope.$apply(function() {
						callback.success(results.result);
					});
			}, function(err) {
				if (callback.error != undefined)
					callback.error(err);
			});
		},
		getSasQuery : function(fileName, callback) {
			mobileClient.invokeApi("get_sas_query", {
				method : "post",
				body : {
					fileName : fileName,
					containerName : "item-user-profile"
				}
			}).done(function(results) {
				if (callback.success != undefined)
					$rootScope.$apply(function() {
						callback.success(results.result.sasQueryString);
					});
			}, function(err) {
				if (callback.error != undefined)
					callback.error(err);
			});
		}
	};
});
