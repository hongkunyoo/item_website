var itemApp = angular.module('itemApp', ['ngRoute', 'ngAnimate', 'infinite-scroll', 'ngStorage', 'azureBlobUpload', 'ui.router', 'ngOnload']);

itemApp.config(function($stateProvider, $urlRouterProvider) {
	// $routeProvider
	// .when('/', {
	// templateUrl : 'partials/login.html'
	// }).when('/signup', {
	// templateUrl : 'partials/signup.html'
	// }).when('/signup/:inviteKey', {
	// templateUrl : 'partials/signup.html'
	// }).when('/invite', {
	// templateUrl : 'partials/create_invite_key.html'
	// }).when('/list', {
	// templateUrl : 'partials/list.html'
	// }).when('/detail/:item_id', {
	// templateUrl : 'partials/detail.html'
	// }).when('/user_profile/:userId', {
	// templateUrl : 'partials/user_profile.html'
	// }).when('/test', {
	// templateUrl : 'partials/test.html'
	// })
	// .otherwise({
	// redirectTo : '/login'
	// });

	$urlRouterProvider.otherwise('/list');

	$stateProvider
	// .state('login', {
	// url: '/login',
	// templateUrl: 'partials/login.html'
	// })
	// .state('signup', {
	// url: '/signup',
	// templateUrl: 'partials/signup.html'
	// })
	// .state('signup-with-key', {
	// url: '/signup/:inviteKey',
	// templateUrl: 'partials/signup.html'
	// })
	// .state('invite', {
	// url: '/invite',
	// templateUrl: 'partials/invite.html'
	// })
	.state('list', {
		url : '/list',
		templateUrl : 'partials/list.html'
	}).state('test', {
		url : '/test',
		templateUrl : 'partials/test.html'
	}).state('smtest', {
		url : '/smtest',
		templateUrl : 'partials/smtest.html'
	});
});
