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

//abServices.factory('LetterTwo', ['$resource',
//  function($resource){
//    return $resource('test/:letterId.json', {}, {
//      query: {method:'GET', isArray:true}
//    });
//  }]);

//abServices.factory('LetterTwo', function($resource){
//  return $resource('/test/:id')
//});

abServices.service('BookContent', function() {
  var myList = [];
  var currentPage = 1;

  var getCurrentPage = function() {
    return currentPage;
  }

  var setCurrentPage = function(page) {
    currentPage = page;
  }

  var clearBook = function() {
    myList = [];
  }

  var pageCount = function() {
    return myList.length;
  }

  var addPage = function(newObj) {
    myList.push(newObj);
  }

  var getPage = function(page){
    return myList[page];
  }

  var getBook = function(){
    return myList;
  }

  return {
    setCurrentPage: setCurrentPage,
    getCurrentPage: getCurrentPage,
    clearBook: clearBook,
    pageCount: pageCount,
    addPage: addPage,
    getPage: getPage,
    getBook: getBook
  };
});