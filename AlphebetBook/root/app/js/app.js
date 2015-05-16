'use strict';

/* App Module */

var abApp = angular.module('abApp', [
  'ngRoute',
  'abAnimations',

  'abControllers',
  'abFilters',
  'abServices'
]);

abApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/phones', {
        templateUrl: 'partials/phone-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/letters/:letterId', {
        templateUrl: 'partials/letter-detail.html',
        controller: 'LetterDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);
