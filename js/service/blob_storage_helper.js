itemApp.factory("blobStorageHelper", function($rootScope, azureService, blobStorage) {
	var USER_PROFILE = "item-user-profile";
	var ITEM_IMAGE = "item-image-container";

	return {
		getHostUrl : function(uri) {
			if (uri == undefined) {
				uri = "";
			}
			return "https://athere.blob.core.windows.net/" + uri;
		},
		getUserProfileHostUrl : function() {
			return this.getHostUrl(USER_PROFILE);
		},
		getUserProfileImgUrl : function(id) {
			return getHostUrl(USER_PROFILE) + id;
		},
		getItemImgHostUrl : function() {
			return getHostUrl(ITEM_IMAGE);
		},
		getItemImgUrl : function(id) {
			return getHostUrl(ITEM_IMAGE) + id;
		},
		upload : function(container, id, sasQueryString, file, callback) {
			blobStorage.upload({
				baseUrl : "http://athere.blob.core.windows.net/" + container + "/" + id + "?",
				sasToken : sasQueryString,
				file : file,
				// blockSize: $scope.size,
				progress : function(e) {
				},
				complete : function(e) {
					if (callback.success != undefined) {
						callback.success(e);
					}
					// $rootScope.$apply(function(){callback.success(e);});
				},
				error : function(err) {
					if (callback.error != undefined) {
						callback.error(err);
					}
					// $rootScope.$apply(function(){callback.error(err);});
				}
			});
		}
	};
});
