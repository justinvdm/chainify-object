(function() {
  function chaingun(obj, opts) {
    opts = opts || {};

    var init = typeof obj == 'function'
      ? obj
      : identity;

    var get = opts.get || identity;
    var set = opts.set || identity;

    function _chained_(v) {
      function _chain_(v) {
        if (!arguments.length) return get(curr);
        curr = set(v)
        return _chain_;
      };

      _chain_ = extend(_chain_, obj, function(fn) {
        if (typeof fn != 'function') return;

        return function() {
          Array.prototype.unshift.call(arguments, curr);
          _chain_(fn.apply(this, arguments));
          return _chain_;
        };
      });

      _chain_(init.apply(_chain_, arguments));
      return _chain_;
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
