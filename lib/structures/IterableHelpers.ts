import Interfaces = require("../Interfaces");
import Error = require("../Error");

// TODO: generic equals for maps may be different that lists since keys, and values must be comparaed!
export function equals<E extends Interfaces.BaseObject>(iterable:Interfaces.Iterable<E>, otherIterable:Interfaces.Iterable<E>):boolean {
    Error.checkNotNull(iterable);
    Error.checkNotNull(otherIterable);

    if (iterable.size() !== otherIterable.size()) {
        return false;
    }
    if (iterable.size() === otherIterable.size() && iterable.size() === 0) {
        return true;
    }

    // Get each element
    //TODO rewrite to use the .next
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

export function toArray<E extends Interfaces.BaseObject>(iterable:Interfaces.Iterable<E>):E[] {
    Error.checkNotNull(iterable);

    var array = new Array(iterable.size());
    iterable.forEach((value:E) => {
        array.push(value);
    });

    return array;
}

export function isEmpty(iterable:Interfaces.Iterable) {
    return iterable.size() === 0;
}

export function forEach<E extends Interfaces.BaseObject>(iterable:Interfaces.Iterable<E>, callback:Interfaces.ForEachCollectionCallback<E>):void {
    Error.checkNotNull(iterable);

    var collectionIterator = iterable.__iterator__();
    var collectionNext = collectionIterator.next();
    while (!collectionNext.done) {
        callback(collectionNext.value);
        collectionNext = collectionIterator.next();
    }
}

export function indexOf<E extends Interfaces.BaseObject>(iterable:Interfaces.Iterable<E>, value: E) {
    Error.checkNotNull(iterable);
    Error.checkNotNull(value);

    var index = 0;
    var collectionIterator = iterable.__iterator__();
    var collectionNext = collectionIterator.next();
    while (!collectionNext.done) {
        if (value.equals(collectionNext.value)) {
            return index;
        }

        collectionNext = collectionIterator.next();
        index++;
    }

    // Return -1 if no element is found
    return -1;
}