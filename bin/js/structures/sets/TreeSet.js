define(["require", "exports", "../IterableHelpers", "../maps/TreeMap"], function(require, exports, IterableHelpers, TreeMap) {
    var TreeSet = (function () {
        function TreeSet() {
            this.treeMap = new TreeMap();
        }
        TreeSet.prototype.add = function (element) {
            this.treeMap.set(element, undefined);

            return false;
        };

        TreeSet.prototype.clear = function () {
            this.treeMap.clear();
        };

        TreeSet.prototype.remove = function (element) {
            this.treeMap.remove(element);

            return false;
        };

        TreeSet.prototype.equals = function (set) {
            return IterableHelpers.equals(this, set);
        };

        TreeSet.prototype.forEach = function (callback) {
        };

        TreeSet.prototype.has = function (element) {
            return this.treeMap.containsKey(element);
        };

        TreeSet.prototype.isEmpty = function () {
            return IterableHelpers.isEmpty(this);
        };

        TreeSet.prototype.size = function () {
            return this.treeMap.size();
        };

        TreeSet.prototype.toArray = function () {
            return null;
        };

        TreeSet.prototype.values = function () {
            return null;
        };

        TreeSet.prototype.__iterator__ = function () {
            return this.treeMap.keys();
        };
        return TreeSet;
    })();

    
    return TreeSet;
});
