'use strict';

/* App Module */

// Define module dependencies.
var abApp = angular.module('abApp', [
  'ngRoute',
  'abAnimations',

  'abControllers',
  'abFilters',
  'abServices'
]);

// Define site navigation an assign controllers.
abApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/bookPages', {
        templateUrl: 'partials/book-pages.html',
        controller: 'BookPagesCtrl'
      }).
      when('/letters/:letterId', {
        templateUrl: 'partials/letter-detail.html',
        controller: 'LetterDetailCtrl'
      }).
      otherwise({
        redirectTo: '/bookPages'
      });
  }]);
