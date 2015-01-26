var itemApp = angular.module('itemApp', ['ngRoute', 'ngAnimate', 'infinite-scroll', 'ngStorage', 'azureBlobUpload']); 

itemApp.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'partials/login.html'
	}).when('/signup', {
		templateUrl : 'partials/signup.html'
	}).when('/signup/:inviteKey', {
		templateUrl : 'partials/signup.html'
	}).when('/invite', {
		templateUrl : 'partials/create_invite_key.html'
	}).when('/list', {
		templateUrl : 'partials/list.html'
	}).when('/detail/:item_id', {
		templateUrl : 'partials/detail.html'
	}).when('/user_profile/:userId', {
		templateUrl : 'partials/user_profile.html'
	}).when('/test', {
		templateUrl : 'partials/test.html'
	}).otherwise({
		redirectTo : '/'
	});
});