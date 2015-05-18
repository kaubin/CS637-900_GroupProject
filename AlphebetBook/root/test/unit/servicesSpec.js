'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('abApp'));

  // Test service availability
  it('check the existence of Phone factory', inject(function(Letter) {
      expect(Letter).toBeDefined();
    }));
});