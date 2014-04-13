var tsds;
(function(tsds) {
  var MultiSet = (function() {
    function MultiSet() {
      this.map = new Map();
    }
    Object.defineProperty(MultiSet.prototype, "size", {
      get: function() {
        return this.map.size;
      },
      enumerable: true,
      configurable: true
    });
    MultiSet.prototype.add = function(element) {
      this.map.set(element, this.count(element) + 1);
    };
    MultiSet.prototype.count = function(element) {
      var count = this.map.get(element);
      return count ? count: 0;
    };
    MultiSet.prototype.has = function(element) {
      return this.count(element) > 0;
    };
    MultiSet.prototype.clear = function() {
      this.map.clear();
    };
    MultiSet.prototype.delete = function(element) {
      return this.map.delete (element);
    };
    MultiSet.prototype.forEach = function(callback, thisArg) {
      this.map.forEach(callback, thisArg);
    };
    MultiSet.prototype.values = function() {
      return this.map.keys();
    };
    MultiSet.prototype.isEmpty = function() {
      return this.map.size === 0;
    };
    return MultiSet;
  })();
  tsds.MultiSet = MultiSet;
})(tsds || (tsds = {}));
