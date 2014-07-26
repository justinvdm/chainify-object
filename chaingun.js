(function() {
  function chaingun() {}

  if (typeof module != 'undefined')
    module.exports = chaingun;
  else if (typeof define == 'function' && define.amd)
    define(function() { return chaingun; });
  else
    this.chaingun = chaingun;
})();
