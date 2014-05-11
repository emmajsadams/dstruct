/// <reference path="../../References.d.ts"/>

module dsa.structs {
    // TODO: generic equals for maps may be different that lists since keys, and values must be comparaed!
    export function iterableEquals<E>(iterable:Iterable,
                                      otherIterable:Iterable,
                                      comparisonCallback: (iterableIterator: Iterator<E>, otherIterableIterator: Iterator<E>) => boolean):boolean {
        dsa.error.checkNotNull(iterable);
        dsa.error.checkNotNull(otherIterable);

        if (iterable.size() !== otherIterable.size()) {
            return false;
        }
        if (iterable.size() === otherIterable.size() && iterable.size() === 0) {
            return true;
        }

        // Get each element
        var collectionIterator = iterable.__iterator__();
        var otherCollectionIterator = otherIterable.__iterator__();
        var index = 0;
        while (index < iterable.size()) {
            if (!comparisonCallback(collectionIterator, otherCollectionIterator)) {
                return false;
            }
            index++;
        }

        return true;
    }

    export function iterableIsEmpty(iterable:Iterable) {
        return iterable.size() === 0;
    }
}