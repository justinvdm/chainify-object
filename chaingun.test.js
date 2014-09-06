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
    var thing = chaingun({
      add: function(a, b) { return a + b; },
      multiply: function(a, b) { return a * b; }
    });

    var result = thing(2)
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

  it("should allow its current value to be settable", function() {
    var thing = chaingun({});
    var t = thing(2);
    assert.equal(t(), 2);

    t(3);
    assert.equal(t(), 3);
  });

  it("should support a get hook", function() {
    var thing = chaingun({}, {get: function(v) { return v * 10; }});
    var t = thing(2);
    assert.equal(t(), 20);
  });

  it("should support a set hook", function() {
    var thing = chaingun({}, {set: function(v) { return v * 10; }});
    var t = thing(2);
    assert.equal(t(), 20);
  });

  it("should support custom exits", function() {
    var thing = chaingun({
      add: function(a, b) { return a + b; },
      multiply: function(a, b) { return a * b; }
    }, {
      exits: ['add', 'multiply']
    });

    var t = thing(2);
    assert.equal(t.add(3), 5);
    assert.equal(t.multiply(2), 10);
  });
});
