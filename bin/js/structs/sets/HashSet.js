define(["require", "exports", "../IterableHelpers"], function(require, exports, IterableHelpers) {
    var HashSet = (function () {
        function HashSet() {
            this.set = new Set();
        }
        HashSet.prototype.add = function (element) {
            this.set.add(element);

            return false;
        };

        HashSet.prototype.clear = function () {
            this.set.clear();
        };

        HashSet.prototype.remove = function (element) {
            this.set.delete(element);

            return false;
        };

        HashSet.prototype.equals = function (set) {
            return IterableHelpers.equals(this, set);
        };

        HashSet.prototype.forEach = function (callback) {
            this.set.forEach(callback);
        };

        HashSet.prototype.has = function (element) {
            return this.set.has(element);
        };

        HashSet.prototype.isEmpty = function () {
            return IterableHelpers.isEmpty(this);
        };

        HashSet.prototype.size = function () {
            return this.set.size;
        };

        HashSet.prototype.toArray = function () {
            return null;
        };

        HashSet.prototype.values = function () {
            return null;
        };

        HashSet.prototype.__iterator__ = function () {
            return this.set.values();
        };
        return HashSet;
    })();

    
    return HashSet;
});
