var it = require('ava')
var chainify = require('..')

it("should copy across the given object's properties", assert => {
  var thing = {
    foo: 2,
    bar: 3,
    baz: {},
    quux: function () {}
  }

  var chain = chainify(thing)
  assert.is(chain.foo, thing.foo)
  assert.is(chain.bar, thing.bar)
  assert.is(chain.baz, thing.baz)
  assert.is(chain.quux, thing.quux)
})

it('should not copy across non-function properties when chaining', assert => {
  assert.truthy(!('foo' in chainify({ foo: 2 })()))
})

it("should support chaining of the object's function properties", assert => {
  var thing = chainify({
    add: function (a, b) {
      return a + b
    },
    multiply: function (a, b) {
      return a * b
    }
  })

  var result = thing(2).add(3).multiply(5).add(5).multiply(2)()

  assert.is(result, 60)
})

it('should start chaining with an invoke if the object is a function', assert => {
  function thing(a, b) {
    return a + b
  }
  thing.multiply = function (a, b) {
    return a * b
  }

  var result = chainify(thing)(2, 3).multiply(4)()

  assert.is(result, 20)
})

it('should allow its current value to be settable', assert => {
  var thing = chainify({})
  var t = thing(2)
  assert.is(t(), 2)

  t(3)
  assert.is(t(), 3)
})

it('should support a get hook', assert => {
  var thing = chainify(
    {},
    {
      get: function (v) {
        return v * 10
      }
    }
  )
  var t = thing(2)
  assert.is(t(), 20)
})

it('should support a set hook', assert => {
  var thing = chainify(
    {},
    {
      set: function (v) {
        return v * 10
      }
    }
  )
  var t = thing(2)
  assert.is(t(), 20)
})

it('should support custom exits', assert => {
  var thing = chainify(
    {
      add: function (a, b) {
        return a + b
      },
      multiply: function (a, b) {
        return a * b
      }
    },
    {
      exits: ['add', 'multiply']
    }
  )

  var t = thing(2)
  assert.is(t.add(3), 5)
  assert.is(t.multiply(2), 10)
})
