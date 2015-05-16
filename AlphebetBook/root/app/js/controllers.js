'use strict';

/* Controllers */

var abControllers = angular.module('abControllers', []);

abControllers.controller('PhoneListCtrl', ['$scope', 'Phone', 'Letter',
  function($scope, Phone, Letter) {
    $scope.phones = Phone.query();
    $scope.alphabet = Letter.query();
    $scope.orderProp = 'age';

    $scope.enumerateLetters = function( name ) {

      // First, reset the groups.
      $scope.groups = [];

      for ( var i = 0 ; i < name.length ; i++ ) {

        var cLetter = name[ i ];

        //$scope.phones.forEach(function (item) {
        //  //console.log("current item is", item);
        //  if (item["age"] == 17) {
        //    var group = {
        //      label: cLetter,
        //      selectedImg: 0,
        //      meta: item
        //    };
        //
        //    $scope.groups.push( group );
        //  }
        //});

        $scope.alphabet.forEach(function (item) {
          //console.log("current item is", item);
          if (item["lowercase"] == cLetter.toLowerCase()) {
            var group = {
              label: cLetter,
              selectedImg: 0,
              meta: item
            };

            $scope.groups.push( group );
          }
        });

        //var group = {
        //  label: letter,
        //  meta: []
        //};

        //$scope.groups.push( group );

      }
    };
  }]);

abControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
  function($scope, $routeParams, Phone) {
    $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
      $scope.mainImageUrl = phone.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);

abControllers.controller('LetterDetailCtrl', ['$scope', '$routeParams', 'Letter',
  function($scope, $routeParams, Letter) {
    $scope.letter = Letter.get({letterId: $routeParams.letterId}, function(letter) {
      $scope.mainImageUrl = letter.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);