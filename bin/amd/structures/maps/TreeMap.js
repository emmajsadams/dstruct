define(["require", "exports", "../../Error", "./MapHelpers", "../trees/RedBlackTree", "../IterableHelpers"], function(require, exports, Error, MapHelpers, RedBlackTree, IterableHelpers) {
    var TreeMap = (function () {
        function TreeMap() {
            this.tree = new RedBlackTree();
        }
        TreeMap.prototype.clear = function () {
            this.tree.clear();
        };

        TreeMap.prototype.containsKey = function (key) {
            return this.get(key) !== null;
        };

        TreeMap.prototype.hashCode = function () {
            Error.notImplemented();
            return null;
        };

        TreeMap.prototype.equals = function (map) {
            return MapHelpers.equals(this, map);
        };

        TreeMap.prototype.forEach = function (callback) {
            this.tree.forEach(callback);
        };

        TreeMap.prototype.get = function (key) {
            return this.tree.get(key);
        };

        TreeMap.prototype.isEmpty = function () {
            return IterableHelpers.isEmpty(this);
        };

        TreeMap.prototype.keys = function () {
            return this.tree.keys();
        };

        TreeMap.prototype.remove = function (key) {
            return this.tree.remove(key);
        };

        TreeMap.prototype.set = function (key, value) {
            this.tree.insert(key, value);
            return null;
        };

        TreeMap.prototype.size = function () {
            return this.tree.size();
        };

        TreeMap.prototype.values = function () {
            return this.tree.values();
        };

        TreeMap.prototype.__iterator__ = function () {
            return this.keys();
        };
        return TreeMap;
    })();

    
    return TreeMap;
});
