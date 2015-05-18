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

abServices.service('BookContent', function() {
  var myList = [];
  var customNarratives = [];
  var currentPage = 1;

  var findCustomNarratives = function(animalName) {
    var temp = undefined;
    customNarratives.forEach(function (nar) {
      //console.log("current item is", item);
      if (nar["name"].toLowerCase() == animalName.toLowerCase()) {
        temp = nar.narrative;
      }
    });
    return temp;
  }

  var findCustomAnimal = function(animalName) {
    var temp = undefined;
    customNarratives.forEach(function (nar) {
      //console.log("current item is", item);
      if (nar["name"].toLowerCase() == animalName.toLowerCase()) {
        temp = nar;
      }
    });
    return temp;
  }

  var addNarrative = function(animalName, newNarrative) {
    var found = findCustomAnimal(animalName);

    if(found === undefined){
      var animalContent = {
        name: animalName,
        narrative: []
      };
      found = animalContent;
      customNarratives.push(animalContent);
    }

    var narContent = {
      narrative: newNarrative,
    };

    found.narrative.push(narContent);
  }

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
    findCustomAnimal: findCustomAnimal,
    findCustomNarratives: findCustomNarratives,
    addNarrative: addNarrative,
    setCurrentPage: setCurrentPage,
    getCurrentPage: getCurrentPage,
    clearBook: clearBook,
    pageCount: pageCount,
    addPage: addPage,
    getPage: getPage,
    getBook: getBook
  };
});