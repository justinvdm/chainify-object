var assert = require('assert');
var chaingun = require('./chaingun');


describe("chaingun", function() {
  it("should copy across the given object's properties", function() {
    var thing = {
      foo: 2,
      bar: 3,
      baz: {},
      quux: function() {}
    };

    var chain = chaingun(thing);
    assert.strictEqual(chain.foo, thing.foo);
    assert.strictEqual(chain.bar, thing.bar);
    assert.strictEqual(chain.baz, thing.baz);
    assert.strictEqual(chain.quux, thing.quux);
  });

  it("should not copy across non-function properties when chaining", function() {
    assert(!('foo' in chaingun({foo: 2})()));
  });

  it("should support chaining of the object's function properties", function() {
    var chain = chaingun({
      add: function(a, b) { return a + b; },
      multiply: function(a, b) { return a * b; }
    });

    var result = chain(2)
      .add(3)
      .multiply(5)
      .add(5)
      .multiply(2)
      ();

    assert.equal(result, 60);
  });

  it("should start chaining with an invoke if the object is a function", function() {
    function thing(a, b) { return a + b; }
    thing.multiply = function(a, b) { return a * b; };

    var result = chaingun(thing)
      (2, 3)
      .multiply(4)
      ();

    assert.equal(result, 20);
  });
});
