itemApp.factory("prefHelper", function($localStorage) {

	return {
		put : function(key, value) {
			$localStorage[key] = value;
		},
		get : function(key) {
			return $localStorage[key];
		},
		remove : function(key) {
			$localStorage.$reset(key);
		}
	};
});
