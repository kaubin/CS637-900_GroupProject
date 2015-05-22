'use strict';

/* Services */

var abServices = angular.module('abServices', ['ngResource']);

abServices.factory('Letter', ['$resource',
  function($resource){
    return $resource('letters/:letterId.json', {}, {
      query: {method:'GET', params:{letterId:'letters'}, isArray:true}
    });
  }]);

// Service holding current book pages, selected image, selected narrative and custom narratives.
abServices.service('BookContent', function() {
  var myList = [];
  var customNarratives = [];
  var currentPage = 1;
  var child_name = "";

  // Returns sample narratives for animal.
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

  // Returns custom narratives for animal.
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

  // Add custom narrative for an animal.
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

  // Get child name.
  var getName = function() {
    return child_name;
  }

  // Set child name.
  var setName = function(name) {
    child_name = name;
  }

  // Get child's date of birth.
  var getDOB = function() {
    return child_name;
  }

  // Set child's date of birth.
  var setDOB = function(name) {
    child_name = name;
  }

  // Get current page with application focus.
  var getCurrentPage = function() {
    return currentPage;
  }

  // Set current page with application focus.
  var setCurrentPage = function(page) {
    currentPage = page;
  }

  // Clear the book pages.
  var clearBook = function() {
    myList = [];
  }

  var pageCount = function() {
    return myList.length;
  }

  // Add a page.
  var addPage = function(newObj) {
    myList.push(newObj);
  }

  // Get a single page.
  var getPage = function(page){
    return myList[page];
  }

  // Gets entire book.
  var getBook = function(){
    return myList;
  }

  return {
    getDOB: getDOB,
    setDOB: setDOB,
    getName: getName,
    setName: setName,
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