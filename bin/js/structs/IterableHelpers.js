define(["require", "exports", "../Error"], function(require, exports, Error) {
    function equals(iterable, otherIterable) {
        Error.checkNotNull(iterable);
        Error.checkNotNull(otherIterable);

        if (iterable.size() !== otherIterable.size()) {
            return false;
        }
        if (iterable.size() === otherIterable.size() && iterable.size() === 0) {
            return true;
        }

        var collectionIterator = iterable.__iterator__();
        var otherCollectionIterator = otherIterable.__iterator__();
        var index = 0;
        while (index < iterable.size()) {
            var collectionNext = collectionIterator.next();
            var otherCollectionNext = collectionIterator.next();
            if (!collectionNext.value.equals(otherCollectionNext.value)) {
                return false;
            }

            index++;
        }

        return true;
    }
    exports.equals = equals;

    function isEmpty(iterable) {
        return iterable.size() === 0;
    }
    exports.isEmpty = isEmpty;

    function forEach(iterable, callback) {
    }
    exports.forEach = forEach;
});
