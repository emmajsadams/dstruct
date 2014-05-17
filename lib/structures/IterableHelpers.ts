/// <reference path="../../References.d.ts"/>

import Interfaces = require("../Interfaces");
import Error = require("../Error");

// TODO: generic equals for maps may be different that lists since keys, and values must be comparaed!
export function equals<E extends Interfaces.BaseObject>(iterable:Interfaces.Iterable,
                                                        otherIterable:Interfaces.Iterable):boolean {
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

export function forEach<E extends Interfaces.BaseObject>(iterable:Interfaces.Iterable, callback: Interfaces.ForEachCollectionCallback<E>): void {
    //TODO!
}