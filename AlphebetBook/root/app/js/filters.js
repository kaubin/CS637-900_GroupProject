'use strict';

/* Filters */

angular.module('abFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});

//angular.module('abFilters')
//    .filter('firstLetter', function () {
//      return function (input) {
//        input = input || [];
//        var out = [];
//        input.forEach(function (item) {
//          //console.log("current item is", item, item.charAt(0));
//          if (item.charAt(0).toLowerCase() == letter) {
//            out.push(item);
//          }
//        });
//        return out;
//      }
//    });