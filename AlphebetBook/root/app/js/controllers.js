'use strict';

/* Controllers */

var abControllers = angular.module('abControllers', []);

// Define controller for 'partials/book-pages.html'.
// This controller parses a name and generates pages with an animal image and narrative.
abControllers.controller('BookPagesCtrl', ['$scope', 'Letter', 'BookContent',
  function($scope, Letter, BookContent) {
    // Accesses Letter service to retrieve alphebet index '\app\letters\letters.JSON'
    $scope.alphabet = Letter.query();
    // Service holding current book pages, selected image, selected narrative and custom narratives.
    $scope.bookContent = BookContent.getBook();
    // Child Name entered into home page.
    $scope.childName = BookContent.getName();

    // Set current page number.
    $scope.setPage = function(page) {
      BookContent.setCurrentPage(page);
    }

    // Get current page number
    $scope.getLetter = function(id) {
      $scope.letter = Letter.get({letterId: id}, function(letter) {
        $scope.mainImageUrl = letter.images[0].file;
      });
    }

    // Process each letter in $scope.childName. Create a page for each letter.
    $scope.enumerateLetters = function( ) {

      // First, reset the book page contents.
      $scope.bookContent = [];
      BookContent.setName($scope.childName);
      BookContent.clearBook();

      for ( var i = 0 ; i < $scope.childName.length ; i++ ) {

        // Current letter for processing
        var cLetter = $scope.childName[i];

        // Retrieve letter JSON meta data (example: a.JSON or b.JSON).
        $scope.getLetter(cLetter);

        // Find letter and add page content.
        $scope.alphabet.forEach(function (item) {
          //console.log("current item is", item);
          if (item["lowercase"] == cLetter.toLowerCase()) {

            // Create a page object.
            var pageContent = {
              label: cLetter,
              pageNumber: i,
              meta: item
            };

            // Add page to book
            BookContent.addPage(pageContent);
          }
        });

        // Set local variable visible to site template for display.
        $scope.bookContent = BookContent.getBook();

      }
    };
  }]);

// Define controller for 'partials/letter-detail.html'.
abControllers.controller('LetterDetailCtrl', ['$scope', '$routeParams', 'Letter', 'BookContent',
  function($scope, $routeParams, Letter, BookContent) {
    $scope.letter = Letter.get({letterId: $routeParams.letterId}, function(letter) {

      // Get current page with focus. Focus determined by what animal
      // thumb was selected on bookPages.html.
      var pageNum = BookContent.getCurrentPage();
      // Get page from BookContent service.
      var page = BookContent.getPage(pageNum);

      // Assign local variables visible to site template for display.
      $scope.mainImageUrl = page.meta.imageUrl; // Currently selected image for page.
      $scope.mainNarrative = page.meta.narrative; // Currently selected narrative for page.
      $scope.mainAnimal = page.meta.animalName; // Currently selected animal name for page.

      // Get narratives for current animal from JSON letter meta data (i.e. a.JSON or b.JSON)
      $scope.narrativeList = [];
      letter.images.forEach(function (img) {
        //console.log("current item is", item);
        if (img["name"].toLowerCase() == $scope.mainAnimal.toLowerCase()) {
          $scope.narrativeList = img.narratives;
        }
      });

      // Retrieve any custom narratives for this animal name from the BookContent Service.
      var cNarratives = BookContent.findCustomNarratives($scope.mainAnimal);
      if(cNarratives !== undefined){
        $scope.narrativeList.push(cNarratives[0]);
      }
    });

    // Modify page image using BookContent Service.
    $scope.setImage = function(thumb) {
      $scope.mainImageUrl = thumb.file;
      $scope.mainAnimal = thumb.name;
      $scope.narrativeList = thumb.narratives;
      var pageNum = BookContent.getCurrentPage();
      var page = BookContent.getPage(pageNum);
      page.meta.imageUrl = thumb.file;
    }

    // Modify page narrative using BookContent Service.
    $scope.setNarrative = function(narrative) {
      var pageNum = BookContent.getCurrentPage();
      var page = BookContent.getPage(pageNum);
      page.meta.narrative = narrative;
      $scope.mainNarrative = narrative;
    }

    // Save custom narrative to BookContent Service.
    $scope.addNarrative = function(narrative) {

      $scope.letter = Letter.get({letterId: $routeParams.letterId}, function(letter) {
        // Get narratives for current animal from JSON letter meta data (i.e. a.JSON or b.JSON)
        $scope.narrativeList = [];
        letter.images.forEach(function (img) {
          //console.log("current item is", item);
          if (img["name"].toLowerCase() == $scope.mainAnimal.toLowerCase()) {
            $scope.narrativeList = img.narratives;
          }
        });

        // Add new narrative to the BookContent Service.
        BookContent.addNarrative($scope.mainAnimal, narrative);

        // Retrieve any custom narratives for this animal name from the BookContent Service.
        var cNarratives = BookContent.findCustomNarratives($scope.mainAnimal);
        if(cNarratives !== undefined){
          cNarratives.forEach(function (nar) {
            $scope.narrativeList.push(nar);
          });
        }
      });
    }

  }]);