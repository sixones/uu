var assert = require('assert');

describe('__', function() {

  describe('#register', function() {
    it('should register a global namespace', function() {
      __.register('__.tests.Foo', { });
    
      var global = (function(){
        return this;
      }).call(null);

      assert.ok(global.__);
      assert.ok(global.__.tests);
      assert.ok(global.__.tests.Foo);
    });
  });

  describe('#create', function() {
    it('should create a global class', function() {
      __.create('Foo', {
        bar: function() {
          return 1;
        }
      });

      assert.ok(Foo);
    });

    it('should create a global namespaced class', function() {
      __.create('__.tests.Foo', {
        bar: function() {
          return 1;
        }
      });

      assert.ok(__.tests.Foo);
    });

    it('should accept static method calls', function() {
      __.create('__.tests.Foo', {
        bar: function() {
          return 1;
        }
      });

      assert.equal(1, __.tests.Foo.bar());
    });

    it('should accept instanced method calls', function() {
      __.create('__.tests.Foo', {
        bar: function() {
          return 1;
        }
      });

      assert.equal(1, new __.tests.Foo().bar());
    });
  });

  describe('#extend', function() {
    it('should extend an existing class', function() {
      __.create('__.tests.Foo', {
        bar: function() {
          return 1;
        }
      });
        
      __.extend('__.tests.Bar', __.tests.Foo, {
        bar: function() {
          return 1;
        }
      });

      assert.ok(__.tests.Bar);
    });

    it('should allow overriding parent class methods', function() {
      __.create('__.tests.Foo', {
        bar: function() {
          return 1;
        }
      });
        
      __.extend('__.tests.Bar', __.tests.Foo, {
        bar: function() {
          return 2;
        }
      });

      assert.equal(2, __.tests.Bar.bar());
    });

    it('should allow overriding parent class method on static only', function() {
      __.create('__.tests.Foo', {
        bar: function() {
          return 1;
        }
      });
        
      __.extend('__.tests.Bar', __.tests.Foo, {
        bar: function() {
          return 2;
        }
      }, { });

      assert.equal(2, __.tests.Bar.bar());
      assert.equal(1, new __.tests.Bar().bar());
    });

    it('should allow overriding parent class method on instance only', function() {
      __.create('__.tests.Foo', {
        bar: function() {
          return 1;
        }
      });
        
      __.extend('__.tests.Bar', __.tests.Foo, { }, {
        bar: function() {
          return 2;
        }
      });

      assert.equal(1, __.tests.Bar.bar());
      assert.equal(2, new __.tests.Bar().bar());
    });
  });

});