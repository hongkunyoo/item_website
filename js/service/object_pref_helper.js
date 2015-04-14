itemApp.factory("prefHelper", function($rootScope, $localStorage) {
	
	return {
		put: function(obj) {
			$localStorage.$default(obj);
		}, get: function(key) {
			return $localStorage[key];
		}, remove: function(key) {
			$localStorage.$reset(key);	
		}
	};
});