/// <reference path="../../../References.d.ts"/>
CollectionHelpers
//TODO: better filename?
module dsa.structs {

    //TODO: generic foreach for maps may be different since keys and values!
    export function genericForEach<E>(iterable:Iterable, callback:ForEachCollectionCallback<E>):void {
        dsa.error.checkNotNull(iterable);
        dsa.error.checkNotNull(callback);

        for (var element in iterable) {
            callback(element);
        }
    }


    // TODO: generic equals for maps may be different that lists since keys, and values must be comparaed!
    export function genericEquals<E>(iterable:Iterable, otherIterable:Iterable, comparator:Comparator<E> = DefaultComparator):boolean {
        dsa.error.checkNotNull(iterable);
        dsa.error.checkNotNull(otherIterable);

        if (iterable.size() !== otherIterable.size()) {
            return false;
        }
        if (iterable.size() === otherIterable.size() && iterable.size() === 0) {
            return true;
        }

        // Get each element
        var iterableIterator = iterable.__iterator__();
        var otherIterableIterator = otherIterable.__iterator__();
        var index = 0;
        while (index < iterable.size()) {
            if (comparator(iterableIterator.next(), otherIterableIterator.next()) !== 0) {
                return false;
            }
            index++;
        }

        return true;
    }

    export function genericIsEmpty(iterable:Iterable) {
        return iterable.size() === 0;
    }

}