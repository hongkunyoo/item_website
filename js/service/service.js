itemApp.factory("itService", function(azureService, viewService, imageService, asyncChainerBuilder, aimHelper, userHelper, blobStorageHelper, prefHelper) {
	return {
		azureService : azureService,
		viewService : viewService,
		imageService : imageService,
		asyncChainerBuilder : asyncChainerBuilder,
		blobStorageHelper : blobStorageHelper,
		aimHelper : aimHelper,
		userHelper : userHelper,
		prefHelper : prefHelper
	};
});

itemApp.factory("viewService", function($rootScope) {
	return {
		showProgress : function() {
			$('#waiting-overlay').show();

		},
		hideProgress : function() {
			$('#waiting-overlay').hide();
		},
		showError : function(title, msg) {
			this.hideProgress();
			if (title == undefined && msg == undefined) {
				title = "Error occurred";
				msg = "Please try again.";
			} else if (msg == undefined) {
				msg = title;
				title = "Error Message";
			}
			$rootScope.errTitle = JSON.stringify(title);
			$rootScope.errContent = JSON.stringify(msg);
			$('#progressModal').modal('show');
			console.log(title, msg);
		},
		blockingError : function(msg) {
			$('#error-overlay').show();
			$rootScope.errorMessage = JSON.stringify(msg);
			console.log(msg);
		}
	};
});

itemApp.factory("imageService", function() {
	return new ItImageService();
});

itemApp.factory("asyncChainerBuilder", function() {
	return {
		build : function() {
			return new AsyncChainer();
		}
	};
});
