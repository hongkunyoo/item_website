// client = new WindowsAzure.MobileServiceClient('https://athere.azure-mobile.net/', 'AyHtUuHXEwDSTuuLvvSYZtVSQZxtnT17');

function MobileClient(url, key) {
	this.client = new WindowsAzure.MobileServiceClient(url, key);
}

MobileClient.prototype.getClient = function () {
	return this.client;
};

MobileClient.prototype.login = function (info, callback) {
    this.client.invokeApi("user_login", {
        body: info,
        method: "post"
    }).done(function (results) {
        if (callback.success != null && callback.success != undefined)
            callback.success(results);
    }, function(err) {
        if (callback.error != null && callback.error != undefined)
            callback.error(err);
    });
};

