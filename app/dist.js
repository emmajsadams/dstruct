var tsds;
(function(tsds) {
  var Validator = (function() {
    function Validator() {}
    Validator.null = function(element) {
      if (element) {
        throw new tsds.Exceptions.NullPointer("argument is null.");
      }
    };
    Validator.lessThanZero = function(num) {
      if (num < 0) {
        throw new tsds.Exceptions.IllegalArgument("argument is less than zero.");
      }
    };
    return Validator;
  })();
  tsds.Validator = Validator;
})(tsds || (tsds = {}));
var tsds;
(function(tsds) {
  (function(collections) {
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
        this.addMany(element, 1);
      };
      MultiSet.prototype.addMany = function(element, occurrences) {
        tsds.Validator.null(element);
        tsds.Validator.lessThanZero(occurrences);
        this.map.set(element, this.count(element) + occurrences);
      };
      MultiSet.prototype.count = function(element) {
        tsds.Validator.null(element);
        var count = this.map.get(element);
        return count ? count: 0;
      };
      MultiSet.prototype.has = function(element) {
        tsds.Validator.null(element);
        return this.count(element) > 0;
      };
      MultiSet.prototype.clear = function() {
        this.map.clear();
      };
      MultiSet.prototype.delete = function(element) {
        tsds.Validator.null(element);
        return this.map.delete (element);
      };
      MultiSet.prototype.forEach = function(callback, thisArg) {
        tsds.Validator.null(callback);
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
    collections.MultiSet = MultiSet;
  })(tsds.collections || (tsds.collections = {}));
  var collections = tsds.collections;
})(tsds || (tsds = {}));
var __extends = this.__extends || function(d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) $traceurRuntime.elementSet(d, p, $traceurRuntime.elementGet(b, p));
  function __() {
    this.constructor = d;
  }
  __.prototype = b.prototype;
  d.prototype = new __();
};
var tsds;
(function(tsds) {
  (function(Exceptions) {
    var Base = (function() {
      function Base(message, name) {
        this.message = message;
        this.error = new Error();
        this.name = name;
      }
      return Base;
    })();
    Exceptions.Base = Base;
    var NullPointer = (function(_super) {
      __extends(NullPointer, _super);
      function NullPointer(message) {
        _super.call(this, message, "NullPointerException");
      }
      return NullPointer;
    })(Base);
    Exceptions.NullPointer = NullPointer;
    var IllegalArgument = (function(_super) {
      __extends(IllegalArgument, _super);
      function IllegalArgument(message) {
        _super.call(this, message, "IllegalArgumentException");
      }
      return IllegalArgument;
    })(Base);
    Exceptions.IllegalArgument = IllegalArgument;
  })(tsds.Exceptions || (tsds.Exceptions = {}));
  var Exceptions = tsds.Exceptions;
})(tsds || (tsds = {}));
