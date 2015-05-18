'use strict';

/* jasmine specs for controllers go here */
describe('ab controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('abApp'));
  beforeEach(module('abServices'));

  describe('PhoneListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('letters/letters.json').
          respond([{animalName: 'African Elephant'}, {animalName: 'Bear'}]);

      scope = $rootScope.$new();
      ctrl = $controller('PhoneListCtrl', {$scope: scope});
    }));


    it('should create "animals" model with 2 letters fetched from xhr', function() {
      expect(scope.alphabet).toEqualData([]);
      $httpBackend.flush();

      expect(scope.alphabet).toEqualData(
          [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });
  });


  describe('PhoneDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
        xyzPhoneData = function() {
          return {
            name: 'letter xyz',
                images: ['image/url1.png', 'image/url2.png']
          }
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('letters/xyz.json').respond(xyzPhoneData());

      $routeParams.letterId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('PhoneDetailCtrl', {$scope: scope});
    }));


    it('should fetch letter detail', function() {
      expect(scope.letter).toEqualData({});
      $httpBackend.flush();

      expect(scope.letter).toEqualData(xyzPhoneData());
    });
  });
});
