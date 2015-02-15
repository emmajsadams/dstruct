define(["require", "exports", "../MapHelpers", "../../../Error", "../../IterableHelpers", "../HashMap"], function (require, exports, MapHelpers, Error, IterableHelpers, HashMap) {
    var HashBiMap = (function () {
        function HashBiMap(map, inverseMap) {
            if (map === void 0) { map = new HashMap(); }
            if (inverseMap === void 0) { inverseMap = new HashMap(); }
            this.map = map;
            this.inverseMap = inverseMap;
        }
        HashBiMap.prototype.containsKey = function (key) {
            return this.map.containsKey(key);
        };
        HashBiMap.prototype.hashCode = function () {
            Error.notImplemented();
            return null;
        };
        HashBiMap.prototype.equals = function (biMap) {
            return MapHelpers.equals(this, biMap);
        };
        HashBiMap.prototype.get = function (key) {
            return this.map.get(key);
        };
        HashBiMap.prototype.remove = function (key) {
            Error.checkNotNull(key);
            var value = this.map.get(key);
            if (!value) {
                return null;
            }
            this.map.remove(key);
            this.inverseMap.remove(value);
            return value;
        };
        HashBiMap.prototype.set = function (key, value) {
            this.inverseMap.set(value, key);
            return this.map.set(key, value);
        };
        HashBiMap.prototype.size = function () {
            return this.map.size();
        };
        HashBiMap.prototype.isEmpty = function () {
            return IterableHelpers.isEmpty(this);
        };
        HashBiMap.prototype.inverse = function () {
            return new HashBiMap(this.inverseMap, this.map);
        };
        HashBiMap.prototype.clear = function () {
            this.map.clear();
            this.inverseMap.clear();
        };
        HashBiMap.prototype.forEach = function (callback) {
            this.map.forEach(callback);
        };
        HashBiMap.prototype.keys = function () {
            return this.map.keys();
        };
        HashBiMap.prototype.values = function () {
            return this.map.values();
        };
        HashBiMap.prototype.__iterator__ = function () {
            return this.map.keys();
        };
        return HashBiMap;
    })();
    return HashBiMap;
});
