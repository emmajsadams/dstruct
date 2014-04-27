/// <reference path="../../../References.d.ts"/>

module dsa.collections {

    export class HashMap<K, V> implements Map<K, V> {
        private map: ES6Map<K, V> = <any>new Map();

        clear(): void {
            this.map.clear();
        }

        containsKey(key:K): boolean {
            Preconditions.checkNotNull(key);

            return this.map.has(key);
        }

        equals(map: Map<K, V>):boolean {
            Preconditions.checkNotNull(map);

            //TODO: implement
            return false;
        }

        forEach(callback:forEachMapCallback<K, V>): void {
            Preconditions.checkNotNull(callback);

            this.map.forEach(callback);
        }

        get(key:K): V {
            Preconditions.checkNotNull(key);

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
            Preconditions.checkNotNull(key);

            return this.map.delete(key);
        }

        set(key:K, value:V): void {
            Preconditions.checkNotNull(key);
            Preconditions.checkNotNull(value);

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
