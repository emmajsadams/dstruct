define(["require", "exports", "../../Error", "../IterableHelpers", "./ArrayListIterator", "../../ArrayUtilities"], function(require, exports, Error, IterableHelpers, ArrayListIterator, ArrayUtilities) {
    var ArrayList = (function () {
        function ArrayList(initialCapacity) {
            this.array = new Array(initialCapacity || 0);
        }
        ArrayList.prototype.__iterator__ = function () {
            return new ArrayListIterator(this.array);
        };

        ArrayList.prototype.add = function (element) {
            this.addAtIndex(this.size() - 1, element);

            return true;
        };

        ArrayList.prototype.addAtIndex = function (index, element) {
            Error.checkNotNull(element);

            this.array.splice(index, 0, element);
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
            } else {
                return false;
            }
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
            Error.checkNotNull(value);

            var index = 0;
            for (var element in this) {
                if (element.compareTo(value) === 0) {
                    return index;
                }
                index++;
            }
            return -1;
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
            return this.array;
        };

        ArrayList.prototype.isEmpty = function () {
            return IterableHelpers.isEmpty(this);
        };
        return ArrayList;
    })();

    
    return ArrayList;
});