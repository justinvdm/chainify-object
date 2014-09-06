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


### `chaingun(obj[, opts])`

Returns a chainable version of the given object.

When the chainable is invoked, a chain is started. A chain consists of 'curried' versions of the original object's enumerable function properties. Each function invoked in the chain will be curried with the chain's current value, and its result used as the chain's new value. The given value will be used as the starting value for the chain. When the chain is invoked directly, its value is returned:


```javascript
var chained = chaingun({add: function(a, b) { return a + b; }});

chained(2)
  .add(3)
  .add(5);
  () // 10
```

The chain's value can be reset explicitly by invoking the chain directly with a value:

```javascript
var chained = chaingun({});
var chain = chain(2);
chain();  // 2
chain(3);
chain();  // 3
```

If `obj` is a function, it will be invoked at the start of the chain. Its return value will be used as the starting value of the chain:


```javascript
function thing(a, b) { return a + b; }
thing.multiply = function(a, b) { return a * b; };

var chained = chaingun(thing);

chained(2, 3)
  .multiply(4)
  ();  // 20
```

if `'exits'` is provided as an option, the functions with the given names will return the chain's current value instead of returning the chain:

```javascript
var chained = chaingun(
  {foo: function(v) { return v * 10; }},
  {exits: ['foo']});

chained(2).foo();  // 20
```

if `'get'` is provided as an option, it will be used as a hook whenever the chain's value is requested:

```javascript
var chained = chaingun({}, {get: function(v) { return v * 10; }})
var chain = chained(2);
chain();  // 20
```

if `'set'` is provided as an option, it will be used as a hook whenever the chain's value is changed:

```javascript
var chained = chaingun({}, {set: function(v) { return v * 10; }})
var chain = thing(2);
chain();  // 20

chain(3);
chain();  // 30
```

`obj`'s properties can be accessed directly from the chainable:

```javascript
var obj = {
  foo: 2,
  bar: 3,
  baz: {},
  quux: function() {}
};

var chained = chaingun(obj);
chained.foo === obj.foo;  // true
chained.bar === obj.bar;  // true
chained.baz === obj.baz;  // true
chained.quux === obj.quux;  // true
```

