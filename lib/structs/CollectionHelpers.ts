/// <reference path="../../References.d.ts"/>

//TODO: better filename?
module dsa.structs {

    export function collectionForEach<E>(collection:Collection<E>, callback:ForEachCollectionCallback<E>):void {
        dsa.error.checkNotNull(collection);
        dsa.error.checkNotNull(callback);

        for (var element in collection) {
            callback(element);
        }
    }

    export function collectionEquals<E>(collection:Collection<E>,
                                               otherCollection:Collection<E>):boolean {
        return iterableEquals(collection, otherCollection, (collectionIterator, otherCollectionIterator) => {
            return collectionIterator.next().equals(otherCollectionIterator.next());
        });
    }



}