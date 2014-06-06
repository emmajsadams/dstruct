var Error = require("../Error");

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
        var otherCollectionNext = otherCollectionIterator.next();
        if (!collectionNext.value.equals(otherCollectionNext.value)) {
            return false;
        }

        index++;
    }

    return true;
}
exports.equals = equals;

function toArray(iterable) {
    Error.checkNotNull(iterable);

    var array = new Array(iterable.size());
    iterable.forEach(function (value) {
        array.push(value);
    });

    return array;
}
exports.toArray = toArray;

function isEmpty(iterable) {
    return iterable.size() === 0;
}
exports.isEmpty = isEmpty;

function forEach(iterable, callback) {
    Error.checkNotNull(iterable);

    var collectionIterator = iterable.__iterator__();
    var collectionNext = collectionIterator.next();
    while (!collectionNext.done) {
        callback(collectionNext.value);
        collectionNext = collectionIterator.next();
    }
}
exports.forEach = forEach;
