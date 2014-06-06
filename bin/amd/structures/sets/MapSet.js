define(["require", "exports", "../../Error", "../IterableHelpers"], function(require, exports, Error, IterableHelpers) {
    var MapSet = (function () {
        function MapSet(map) {
            this.map = map;
        }
        MapSet.prototype.add = function (element) {
            this.map.set(element, true);

            return false;
        };

        MapSet.prototype.clear = function () {
            this.map.clear();
        };

        MapSet.prototype.remove = function (element) {
            this.map.remove(element);

            return false;
        };

        MapSet.prototype.hashCode = function () {
            Error.notImplemented();
            return null;
        };

        MapSet.prototype.equals = function (set) {
            return IterableHelpers.equals(this, set);
        };

        MapSet.prototype.forEach = function (callback) {
            IterableHelpers.forEach(this, callback);
        };

        MapSet.prototype.has = function (element) {
            return this.map.containsKey(element);
        };

        MapSet.prototype.isEmpty = function () {
            return IterableHelpers.isEmpty(this);
        };

        MapSet.prototype.size = function () {
            return this.map.size();
        };

        MapSet.prototype.toArray = function () {
            return IterableHelpers.toArray(this);
        };

        MapSet.prototype.values = function () {
            return null;
        };

        MapSet.prototype.__iterator__ = function () {
            return this.map.keys();
        };
        return MapSet;
    })();

    
    return MapSet;
});
