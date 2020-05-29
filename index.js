var unshift = Array.prototype.unshift
var hasOwnProperty = Object.prototype.hasOwnProperty

function chainifyObject(obj, opts) {
  opts = opts || {}

  var init = typeof obj == 'function' ? obj : identity

  var get = opts.get || identity
  var set = opts.set || identity
  var exits = lookup(opts.exits || [])

  function _chained_() {
    var curr

    var _chain_ = function _chain_(v) {
      if (!arguments.length) return get(curr)
      curr = set(v)
      return _chain_
    }

    _chain_._chain_ = true

    _chain_ = extend(_chain_, obj, function (fn, name) {
      if (typeof fn != 'function') return

      return function () {
        unshift.call(arguments, curr)
        _chain_(fn.apply(this, arguments))
        if (name in exits) return _chain_()
        return _chain_
      }
    })

    _chain_(init.apply(_chain_, arguments))
    return _chain_
  }

  return extend(_chained_, obj)
}

function extend(target, source, fn) {
  var result
  fn = fn || identity

  for (var k in source) {
    if (!hasOwnProperty.call(source, k)) return
    result = fn.call(this, source[k], k)
    if (typeof result != 'undefined') target[k] = result
  }

  return target
}

function lookup(arr) {
  var result = {}
  var i = arr.length
  while (i--) result[arr[i]] = 1
  return result
}

function identity(v) {
  return v
}
module.exports = chainifyObject
