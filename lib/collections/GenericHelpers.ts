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

    export function genericCollectionEquals<E>(collection:Collection<E>,
                                               otherCollection:Collection<E>,
                                               comparator:Comparator<E> = DefaultComparator):boolean {
        return genericEquals(collection, otherCollection, (collectionIterator, otherCollectionIterator) => {
            return comparator(collectionIterator.next(), otherCollectionIterator.next()) === 0;
        })
    }

    export function genericMapEquals<K, V>(map:Map<K, V>,
                                           otherMap:Map<K, V>,
                                           //keyComparator:Comparator<K> = DefaultComparator,
                                           valueComparator:Comparator<V> = DefaultComparator):boolean {
        return genericEquals(map, otherMap, (mapIterator, otherCollectionIterator) => {
            var mapKey = mapIterator.next();
            var mapValue = map.get(mapKey);
            var otherMapValue = otherMap.get(mapKey);

            return valueComparator(mapValue, otherMapValue) === 0;
        })
    }

    // TODO: generic equals for maps may be different that lists since keys, and values must be comparaed!
    export function genericEquals<E>(iterable:Iterable,
                                     otherIterable:Iterable,
                                     comparisonCallback: (iterableIterator: Iterator<E>, otherCollectionIterator: Iterator<E>) => boolean):boolean {
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

    export function genericIsEmpty(iterable:Iterable) {
        return iterable.size() === 0;
    }

}