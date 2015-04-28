itemApp.factory("azureService", function($rootScope) {
	var real_url = "https://ptc-item.azure-mobile.net/";
	var real_key = "jThOaSNNMAcOhFJZmkRQSWLtgbZjzF34";
	var test_url = "https://ptc-item-test.azure-mobile.net/";
	var test_key = "GDjfJuqepoEfWkCTEqOcnGMfXPwIHk67";

	var realClient = new WindowsAzure.MobileServiceClient(real_url, real_key);
	var testClient = new WindowsAzure.MobileServiceClient(test_url, test_key);
	var mobileClient = realClient;

	var CONTAINER_REAL_USER_PROFILE = "item-user-profile";
	var SESSION_HELPER = "aim_add";
	var GET_SAS_QUERY = "aim_add_item";

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
		sessionHelper : function(action, session, callback) {
			mobileClient.invokeApi(SESSION_HELPER, {
				body : {
					session : session,
					action : action
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
					callback.error(err);
				}
			});
		},
		getSasQuery : function(fileName, callback) {
			mobileClient.invokeApi(GET_SAS_QUERY, {
				method : "post",
				body : {
					fileName : fileName,
					containerName : CONTAINER_REAL_USER_PROFILE
				}
			}).done(function(results) {
				if (callback.success != undefined) {
					$rootScope.$apply(function() {
						callback.success(results.result.sasQueryString);
					});
				}
			}, function(err) {
				if (callback.error != undefined) {
					callback.error(err);
				}
			});
		}
	};
});
