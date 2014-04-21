/// <reference path="../../References.d.ts"/>

//TODO: better filename?
module dsa.collections {

    export function genericForEach<E>(collection:Collection<E>, callback:ForEachCollectionCallback<E>):void {
        Preconditions.checkNotNull(callback);

        for (var element in collection) {
            callback(element);
        }
    }

    export function genericEquals<E>(collection:Collection<E>, otherCollection:Collection<E>, comparator:Comparator<E> = DefaultComparator):boolean {
        Preconditions.checkNotNull(collection);
        Preconditions.checkNotNull(otherCollection);

        if (collection.size() !== otherCollection.size()) {
            return false;
        }
        if (collection.size() === otherCollection.size() && collection.size() === 0) {
            return true;
        }

        // Get each element
        var collectionIterator = collection.__iterator__();
        var otherCollectionIterator = collection.__iterator__();
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