<html ng-app="nameApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
    <script>
      var nameApp = angular.module('nameApp', []);
      nameApp.controller('NameCtrl', function ($scope){
        $scope.names = ['Larry', 'Curly', 'Moe'];

        $scope.addName = function() {
          $scope.names.push($scope.enteredName);
        };
      });
    </script>
  </head>
  <body ng-controller="NameCtrl">
    <ul>
      <li ng-repeat="name in names">{{name}}</li>
    </ul>
    <form ng-submit="addName()">
      <input type="text" ng-model="enteredName">
      <input type="submit" value="add">
    </form>
  </body>
</html>
===============================================================================================
<html ng-app="nameApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.1/angular.min.js"></script>
    <script>
      var nameApp = angular.module('nameApp', []);
      nameApp.controller('NameCtrl', function ($scope){
        $scope.names = ['Larry', 'Curly', 'Moe'];

        $scope.addName = function() {
          $scope.names.push($scope.enteredName);
          $scope.enteredName = '';
        };
      });
    </script>
  </head>
  <body ng-controller="NameCtrl">
    <ul>
      <li ng-repeat="name in names">{{name}}</li>
    </ul>
    <form ng-submit="addName()">
      <input type="text" ng-model="enteredName">
      <input type="submit" value="add">
    </form>
  </body>
</html>
===============================================================================================
<html ng-app="countryApp">
  <head>
    <meta charset="utf-8">
    <title>Angular.js Example</title>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.10/angular-route.min.js"></script>
    <script>
      var countryApp = angular.module('countryApp', ['ngRoute']);

      countryApp.config(function($routeProvider) {
        $routeProvider.
          when('/', {
            template: '<ul><li ng-repeat="country in countries">{{country.name}}</li><ul>',
            controller: 'CountryListCtrl'
          }).
          when('/:countryName', {
            template: '<h1>TODO create country detail view</h1>',
            controller: 'CountryDetailCtrl'
          }).
          otherwise({
            redirectTo: '/'
          });
      });
      
      countryApp.config(function($routeProvider) {
        $routeProvider.
          when('/', {
            templateUrl: 'country-list.html',
            controller: 'CountryListCtrl'
          }).
          when('/:countryName', {
            templateUrl: 'country-detail.html',
            controller: 'CountryDetailCtrl'
          }).
          otherwise({
            redirectTo: '/'
          });
      });

      countryApp.controller('CountryListCtrl', function ($scope, $http){
        $http.get('countries.json').success(function(data) {
          $scope.countries = data;
        });
      });

      countryApp.controller('CountryDetailCtrl', function ($scope, $routeParams){
        console.log($routeParams);
      });
    </script>
  </head>
  <body>
    <div ng-view></div>
  </body>
</html>