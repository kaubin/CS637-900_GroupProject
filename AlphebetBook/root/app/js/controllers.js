'use strict';

/* Controllers */

var abControllers = angular.module('abControllers', []);

abControllers.controller('PhoneListCtrl', ['$scope', 'Phone', 'Letter', 'BookContent',
  function($scope, Phone, Letter, BookContent) {
    $scope.phones = Phone.query();
    $scope.alphabet = Letter.query();
    $scope.orderProp = 'age';
    $scope.pageWithFocus = 1;
    $scope.letterImages = [];

    $scope.setPage = function(page) {
      BookContent.setCurrentPage(page);
    }

    $scope.getLetter = function(id) {
      $scope.letter = Letter.get({letterId: id}, function(letter) {
        $scope.mainImageUrl = letter.images[0].file;
        $scope.letterImages = letter.images;
        console.log("in fuction letter images are", letter.images);
      });
    }

    $scope.enumerateLetters = function( name ) {

      // First, reset the book page contents.
      $scope.bookContent = [];
      BookContent.clearBook();

      for ( var i = 0 ; i < name.length ; i++ ) {

        var cLetter = name[ i ];

        $scope.getLetter(cLetter);

        console.log("letter images are", $scope.letterImages);

        $scope.alphabet.forEach(function (item) {
          //console.log("current item is", item);
          if (item["lowercase"] == cLetter.toLowerCase()) {

            var pageContent = {
              label: cLetter,
              pageNumber: i,
              meta: item
            };

            BookContent.addPage(pageContent);
          }
        });

        $scope.bookContent = BookContent.getBook();

      }
    };
  }]);

//abControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//  function($scope, $routeParams, Phone) {
//    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//      $scope.mainImageUrl = phone.images[0];
//    });
//
//    $scope.setImage = function(imageUrl) {
//      $scope.mainImageUrl = imageUrl;
//    }
//  }]);

abControllers.controller('LetterDetailCtrl', ['$scope', '$routeParams', 'Letter', 'BookContent',
  function($scope, $routeParams, Letter, BookContent) {
    $scope.letter = Letter.get({letterId: $routeParams.letterId}, function(letter) {
      $scope.mainImageUrl = letter.images[0].file;
    });

    $scope.setImage = function(thumb) {
      $scope.mainImageUrl = thumb.file;
      $scope.narrativeList = thumb.narratives;
      var pageNum = BookContent.getCurrentPage();
      var page = BookContent.getPage(pageNum);
      page.meta.imageUrl = thumb.file;
    }

    $scope.setNarrative = function(narrative) {
      var pageNum = BookContent.getCurrentPage();
      var page = BookContent.getPage(pageNum);
      page.meta.narrative = narrative;
    }
  }]);