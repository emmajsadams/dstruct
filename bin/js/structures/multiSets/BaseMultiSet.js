define(["require", "exports", "../../Error", "../IterableHelpers"], function(require, exports, Error, IterableHelpers) {
    var BaseMultiSet = (function () {
        function BaseMultiSet(map) {
            this.map = map;
        }
        BaseMultiSet.prototype.size = function () {
            return this.map.size();
        };

        BaseMultiSet.prototype.add = function (element, occurrences) {
            if (typeof occurrences === "undefined") { occurrences = 1; }
            return this.setCount(element, this.count(element) + occurrences);
        };

        BaseMultiSet.prototype.count = function (element) {
            var count = this.map.get(element);
            return count ? count : 0;
        };

        BaseMultiSet.prototype.has = function (element) {
            return this.count(element) > 0;
        };

        BaseMultiSet.prototype.clear = function () {
            this.map.clear();
        };

        BaseMultiSet.prototype.hashCode = function () {
            Error.notImplemented();
            return null;
        };

        BaseMultiSet.prototype.equals = function (set) {
            Error.notImplemented();
            return null;
        };

        BaseMultiSet.prototype.remove = function (element, occurrences) {
            if (typeof occurrences === "undefined") { occurrences = 1; }
            return this.setCount(element, this.count(element) - occurrences);
        };

        BaseMultiSet.prototype.setCount = function (element, occurrences) {
            Error.checkArgument(occurrences >= 0);

            return occurrences < 0 ? this.map.remove(element) : this.map.set(element, occurrences);
        };

        BaseMultiSet.prototype.forEach = function (callback) {
            Error.notImplemented();
        };

        BaseMultiSet.prototype.values = function () {
            return this.map.keys();
        };

        BaseMultiSet.prototype.isEmpty = function () {
            return this.size() === 0;
        };

        BaseMultiSet.prototype.toArray = function () {
            return IterableHelpers.toArray(this);
        };

        BaseMultiSet.prototype.__iterator__ = function () {
            return this.values();
        };
        return BaseMultiSet;
    })();

    
    return BaseMultiSet;
});
