/// <reference path="../../References.d.ts"/>

//TODO: better filename?
module dsa.structs {

    export function genericForEach<E>(iterable:Iterable, callback:ForEachCollectionCallback<E>):void {
        dsa.error.checkNotNull(iterable);
        dsa.error.checkNotNull(callback);

        for (var element in collection) {
            callback(element);
        }
    }


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
        var collectionIterator = iterable.__iterator__();
        var otherCollectionIterator = otherIterable.__iterator__();
        var index = 0;
        while (index < collection.size()) {
            if (comparator(collectionIterator.next(), otherCollectionIterator.next()) !== 0) {
                return false;
            }
            index++;
        }

        return true;
    }

}