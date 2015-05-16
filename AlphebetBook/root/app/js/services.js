'use strict';

/* Services */

var abServices = angular.module('abServices', ['ngResource']);

abServices.factory('Phone', ['$resource',
  function($resource){
    return $resource('phones/:phoneId.json', {}, {
      query: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
  }]);

abServices.factory('Letter', ['$resource',
  function($resource){
    return $resource('letters/:letterId.json', {}, {
      query: {method:'GET', params:{letterId:'letters'}, isArray:true}
    });
  }]);
