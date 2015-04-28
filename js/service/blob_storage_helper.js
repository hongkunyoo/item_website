itemApp.factory("blobStorageHelper", function($rootScope, azureService, azureBlob) {
	var CONTAINER_REAL_ITEM_IMAGE = "item-image";
	var CONTAINER_REAL_USER_PROFILE = "item-user-profile";
	var CONTAINER_TEST_ITEM_IMAGE = "item-test-image";
	var CONTAINER_TEST_USER_PROFILE = "item-test-user-profile";
	
	return {
		getHostUrl : function(uri) {
			if (uri == undefined) {
				uri = "";
			}
			return "https://item.blob.core.windows.net/" + uri;
		},
		getUserProfileHostUrl : function() {
			return this.getHostUrl(CONTAINER_REAL_USER_PROFILE);
		},
		getUserProfileImgUrl : function(id) {
			return getHostUrl(CONTAINER_REAL_USER_PROFILE) + id;
		},
		getItemImgHostUrl : function() {
			return getHostUrl(CONTAINER_REAL_ITEM_IMAGE);
		},
		getItemImgUrl : function(id) {
			return getHostUrl(CONTAINER_REAL_ITEM_IMAGE) + id;
		},
		upload : function(container, id, sasQueryString, file, callback) {
			azureBlob.upload({
				baseUrl : "https://item.blob.core.windows.net/" + container + "/" + id + "?",
				sasToken : sasQueryString,
				file : file,
				// blockSize: $scope.size,
				progress : function(e) {
				},
				complete : function(e) {
					if (callback.success != undefined) {
						callback.success(e);
					}
				},
				error : function(err) {
					if (callback.error != undefined) {
						callback.error(err);
					}
				}
			});
		}
	};
});
