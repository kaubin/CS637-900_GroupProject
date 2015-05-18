'use strict';

/* Filters */

// Future expansion... not use for the moment.
angular.module('abFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});