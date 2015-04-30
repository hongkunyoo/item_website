itemApp.factory("blobStorageHelper", function($rootScope, azureBlob, imageService) {
	var CONTAINER_REAL_ITEM_IMAGE = "item-image";
	var CONTAINER_REAL_USER_PROFILE = "item-user-profile";
	var CONTAINER_TEST_ITEM_IMAGE = "item-test-image";
	var CONTAINER_TEST_USER_PROFILE = "item-test-user-profile";

	var GET_SAS_QUERY = "get_sas_query";

	return {
		getHostUrl : function() {
			return "https://item.blob.core.windows.net/";
		},
		getHostContainerUrl : function(container) {
			return this.getHostUrl() + container + "/";
		},
		getUserProfileHostUrl : function() {
			return this.getHostContainerUrl(CONTAINER_REAL_USER_PROFILE);
		},
		getUserProfileImgUrl : function(id) {
			return this.getUserProfileHostUrl() + id + imageService.JPG;
		},
		getItemImgHostUrl : function() {
			return this.getHostContainerUrl(CONTAINER_REAL_ITEM_IMAGE);
		},
		getItemImgUrl : function(id) {
			return this.getItemImgHostUrl() + id + imageService.JPG;
		},
		upload : function(container, id, sasQueryString, file, callback) {
			azureBlob.upload({
				baseUrl : this.getHostContainerUrl(container) + id + "?",
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
