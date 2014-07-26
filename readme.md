# chaingun

make an object's functions chainable.


```javascript
var chaingun = require('chaingun');

var chain = chaingun({
  add: function(a, b) { return a + b; },
  multiply: function(a, b) { return a * b; }
});

chain(2)
  .add(3)
  .multiply(5)
  .add(5)
  .multiply(2)
  ();  // 60
```


## install

node:

```
$ npm install chaingun
```

browser:

```
$ bower install chaingun
```

```html
<script src="/bower_components/chaingun/chaingun.js"></script>
```


## api


### `chaingun(obj)`

Returns a chainable version of the given object.

When the chainable is invoked, a chain is started. A chain consists of 'curried' versions of the original object's enumerable function properties. Each function invoked in the chain will be curried with the chain's current value, and its result used as the chain's new value. The given value will be used as the starting value for the chain. When the chain is invoked directly, its value is returned:


```javascript
var chain = chaingun({add: function(a, b) { return a + b; }});

chain(2)
  .add(3)
  .add(5);
  () // 10
```

If `obj` is a function, it will be invoked at the start of the chain. Its return value will be used as the starting value of the chain:


```javascript
function thing(a, b) { return a + b; }
thing.multiply = function(a, b) { return a * b; };

var chain = chaingun(thing);

chain(2, 3)
  .multiply(4)
  ();  // 20
```

`obj`'s properties can be accessed directly from the chainable:

```javascript
var obj = {
  foo: 2,
  bar: 3,
  baz: {},
  quux: function() {}
};

var chain = chaingun(obj);
chain.foo === obj.foo;  // true
chain.bar === obj.bar;  // true
chain.baz === obj.baz;  // true
chain.quux === obj.quux;  // true
```
