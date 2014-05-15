/// <reference path="../../References.d.ts"/>

import Interfaces = require("../Interfaces");

// TODO: generic equals for maps may be different that lists since keys, and values must be comparaed!
export function equals<E extends Interfaces.BaseObject>(iterable:Interfaces.Iterable,
                                                        otherIterable:Interfaces.Iterable):boolean {
    dsa.error.checkNotNull(iterable);
    dsa.error.checkNotNull(otherIterable);

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
        var otherCollectionNext = collectionIterator.next();
        if (!collectionNext.value.equals(otherCollectionNext.value)) {
            return false;
        }

        index++;
    }

    return true;
}

export function isEmpty(iterable:Interfaces.Iterable) {
    return iterable.size() === 0;
}