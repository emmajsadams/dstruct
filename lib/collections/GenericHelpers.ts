/// <reference path="../../References.d.ts"/>

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
    export function genericCollectionEquals<E>(collection:Collection<E>, otherCollection:Collection<E>, comparator:Comparator<E> = DefaultComparator):boolean {
        dsa.error.checkNotNull(collection);
        dsa.error.checkNotNull(otherCollection);

        if (collection.size() !== otherCollection.size()) {
            return false;
        }
        if (collection.size() === otherCollection.size() && collection.size() === 0) {
            return true;
        }

        // Get each element
        var collectionIterator = collection.__iterator__();
        var otherCollectionIterator = otherCollection.__iterator__();
        var index = 0;
        while (index < collection.size()) {
            if (comparator(collectionIterator.next(), otherCollectionIterator.next()) !== 0) {
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