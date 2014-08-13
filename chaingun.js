(function() {
  function chaingun(obj) {
    function _chained_(v) {
      function _chain_() { return curr; }

      var curr = v;
      if (typeof obj == 'function') curr = obj.apply(this, arguments);

      return extend(_chain_, obj, function(fn) {
        if (typeof fn != 'function') return;

        return function() {
          Array.prototype.unshift.call(arguments, curr);
          curr = fn.apply(this, arguments);
          return this;
        };
      });
    }

    return extend(_chained_, obj);
  }


  function extend(target, source, fn) {
    var result;
    fn = fn || identity;

    for (var k in source) {
      if (!source.hasOwnProperty(k)) return;
      result = fn.call(this, source[k]);
      if (typeof result != 'undefined') target[k] = result;
    }

    return target;
  }


  function identity(v) { return v; }

  if (typeof module != 'undefined')
    module.exports = chaingun;
  else if (typeof define == 'function' && define.amd)
    define(function() { return chaingun; });
  else
    this.chaingun = chaingun;
}).call(this);
