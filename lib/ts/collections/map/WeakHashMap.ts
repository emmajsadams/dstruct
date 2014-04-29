/// <reference path="../../../References.d.ts"/>

module dsa.structs {

    export class WeakHashMap<K extends Object, V> extends ES6BaseMap<K, V> {

        constructor(comparator:Comparator<K> = DefaultComparator) {
            super(<any>new Map(), comparator);
        }

    }

}