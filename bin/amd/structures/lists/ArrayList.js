define(["require", "exports", "../../Error", "../IterableHelpers", "./ArrayListIterator", "../../ArrayUtilities"], function (require, exports, Error, IterableHelpers, ArrayListIterator, ArrayUtilities) {
    var ArrayList = (function () {
        function ArrayList(initialCapacity) {
            this.array = new Array(initialCapacity || 0);
        }
        ArrayList.prototype.__iterator__ = function () {
            return new ArrayListIterator(this.array);
        };
        ArrayList.prototype.add = function (element) {
            this.addAtIndex(this.size(), element);
            return true;
        };
        ArrayList.prototype.addAtIndex = function (index, element) {
            Error.checkNotNull(element);
            if (index === this.size()) {
                this.array.push(element);
            }
            else {
                this.array.splice(index, 0, element);
            }
        };
        ArrayList.prototype.clear = function () {
            ArrayUtilities.clear(this.array);
        };
        ArrayList.prototype.removeAtIndex = function (index) {
            Error.checkNotNull(index);
            Error.checkIndex(index, this.size());
            var element = this.get(index);
            this.array.splice(index, 1);
            return element;
        };
        ArrayList.prototype.remove = function (element) {
            Error.checkNotNull(element);
            var index = this.indexOf(element);
            if (index >= 0) {
                this.array.splice(index, 1);
                return true;
            }
            else {
                return false;
            }
        };
        ArrayList.prototype.hashCode = function () {
            Error.notImplemented();
            return null;
        };
        ArrayList.prototype.equals = function (collection) {
            return IterableHelpers.equals(this, collection);
        };
        ArrayList.prototype.forEach = function (callback) {
            this.forEach(callback);
        };
        ArrayList.prototype.get = function (index) {
            Error.checkNotNull(index);
            Error.checkIndex(index, this.size());
            return this.array[index];
        };
        ArrayList.prototype.has = function (element) {
            return this.indexOf(element) >= 0;
        };
        ArrayList.prototype.indexOf = function (value) {
            return IterableHelpers.indexOf(this, value);
        };
        ArrayList.prototype.set = function (index, element) {
            Error.checkNotNull(element);
            var currentValue = this.get(index);
            this.array[index] = element;
            return currentValue;
        };
        ArrayList.prototype.size = function () {
            return this.array.length;
        };
        ArrayList.prototype.toArray = function () {
            return IterableHelpers.toArray(this);
        };
        ArrayList.prototype.isEmpty = function () {
            return IterableHelpers.isEmpty(this);
        };
        return ArrayList;
    })();
    return ArrayList;
});
