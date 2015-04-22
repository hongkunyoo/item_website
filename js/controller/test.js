itemApp.controller('testController', function($rootScope, $scope, $location, $localStorage, $filter, $state, itService, $stateParams) {
	$('#blog-landing').pinterest_grid({
		no_columns : 4,
		padding_x : 10,
		padding_y : 10,
		margin_bottom : 50,
		single_column_breakpoint : 700
	});
});
