/// <reference path="../../../References.d.ts"/>

module dsa.structs {

    export class HashMap<K, V> implements Map<K, V> {
        private map: ES6Map<K, V> = <any>new Map();

        constructor(private comparator:Comparator<K> = DefaultComparator) {
        }

        clear(): void {
            this.map.clear();
        }

        containsKey(key:K): boolean {
            dsa.error.checkNotNull(key);

            return this.map.has(key);
        }

        equals(map: Map<K, V>):boolean {
            dsa.error.checkNotNull(map);

            //TODO: implement
            return dsa.structs.genericEquals(this, map, this,c);
        }

        forEach(callback:forEachMapCallback<K, V>): void {
            dsa.error.checkNotNull(callback);

            this.map.forEach(callback);
        }

        get(key:K): V {
            dsa.error.checkNotNull(key);

            return this.map.get(key);
        }

        // TODO: mixin or abstract class for shared isEmpty logic?
        isEmpty(): boolean {
            return this.size() === 0;
        }

        keys(): Iterator<K> {
            return this.map.keys();
        }

        remove(key:K): boolean {
            dsa.error.checkNotNull(key);

            return this.map.delete(key);
        }

        set(key:K, value:V): void {
            dsa.error.checkNotNull(key);
            dsa.error.checkNotNull(value);

            return this.map.set(key, value);
        }

        size(): number {
            return this.map.size;
        }

        values(): Iterator<V> {
            return this.map.values();
        }

        // not to be used directly
        __iterator__(): Iterator<K> {
            return this.keys();
        }

    }

}
