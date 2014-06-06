var Error = require("../../Error");
var MapHelpers = require("./MapHelpers");
var IterableHelpers = require("../IterableHelpers");
var ES6Helpers = require("./ES6Helpers");

var ES6BaseMap = (function () {
    function ES6BaseMap(map) {
        this.map = map;
        this.keyCount = 0;
    }
    ES6BaseMap.prototype.clear = function () {
        this.map.clear();
    };

    ES6BaseMap.prototype.containsKey = function (key) {
        Error.checkNotNull(key);

        return this.get(key) !== null;
    };

    ES6BaseMap.prototype.equals = function (map) {
        return MapHelpers.equals(this, map);
    };

    ES6BaseMap.prototype.hashCode = function () {
        Error.notImplemented();
        return null;
    };

    ES6BaseMap.prototype.forEach = function (callback) {
        Error.checkNotNull(callback);

        this.map.forEach(function (entry) {
            while (entry !== null) {
                callback(entry.value, entry.key);
                entry = entry.next;
            }
        });
    };

    ES6BaseMap.prototype.get = function (key) {
        Error.checkNotNull(key);

        var entry = this.map.get(key.hashCode());
        if (!entry) {
            return null;
        }

        while (entry !== null) {
            if (entry.key.equals(key)) {
                return entry.value;
            }
            entry = entry.next;
        }

        return null;
    };

    ES6BaseMap.prototype.isEmpty = function () {
        return IterableHelpers.isEmpty(this);
    };

    ES6BaseMap.prototype.keys = function () {
        return new ES6Helpers.Iterator(this.map.values(), function (currentEntry) {
            return currentEntry.key;
        });
    };

    ES6BaseMap.prototype.remove = function (key) {
        Error.checkNotNull(key);

        var hashCode = key.hashCode();

        var entry = this.map.get(hashCode);
        if (!entry) {
            return null;
        }

        if (entry.key.equals(key)) {
            this.keyCount--;
            if (entry.next) {
                this.map.set(hashCode, entry.next);
            } else {
                this.map.delete(hashCode);
            }

            return entry.value;
        }

        while (entry.next !== null) {
            if (entry.next.key.equals(key)) {
                this.keyCount--;
                var removedEntry = entry.next;
                entry.next = entry.next.next;
                return removedEntry.value;
            }
            entry = entry.next;
        }

        return null;
    };

    ES6BaseMap.prototype.set = function (key, value) {
        Error.checkNotNull(key);
        Error.checkNotNull(value);

        var hashCode = key.hashCode();
        var entry = this.map.get(hashCode);
        if (!entry) {
            this.keyCount++;

            this.map.set(hashCode, {
                key: key,
                value: value,
                next: null
            });

            return null;
        }

        while (entry.next !== null) {
            if (entry.key.equals(key)) {
                return this.swapEntryValue(entry, key, value);
            }
            entry = entry.next;
        }

        if (entry.key.equals(key)) {
            return this.swapEntryValue(entry, key, value);
        } else {
            this.keyCount++;
            entry.next = {
                key: key,
                value: value,
                next: null
            };
        }

        return null;
    };

    ES6BaseMap.prototype.size = function () {
        return this.keyCount;
    };

    ES6BaseMap.prototype.values = function () {
        return new ES6Helpers.Iterator(this.map.values(), function (currentEntry) {
            return currentEntry.value;
        });
    };

    ES6BaseMap.prototype.__iterator__ = function () {
        return this.keys();
    };

    ES6BaseMap.prototype.swapEntryValue = function (entry, key, value) {
        var oldValue = entry.value;
        entry.value = value;
        return oldValue;
    };
    return ES6BaseMap;
})();

module.exports = ES6BaseMap;
