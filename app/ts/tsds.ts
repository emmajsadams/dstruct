module tsds {

    // Use in for ( element in Iterator ) { .. }
    export interface Iterator<E> {
        next(): E;
    }

    export interface forEachCollectionCallback<E> {
        (value: E): void;
    }

    export interface forEachMapCallback<K, V> {
        (value: V, key: K): void;
    }

    export interface Collection<E> {
        size: number;
        clear(): void;
        has(value: E);
        add(value: E): void;
        isEmpty(): boolean;
        delete(value: E);
        forEach(callback: forEachCollectionCallback<E>, thisArg: any): void;
    }

    export interface Set<E> extends Collection<E>{
        //entries(): Iterator<E>;
        //keys(): Iterator<E>;
        values(): Iterator<E>;
    }

    export interface Map<K, V>  {
        size: number;
        clear(): void;
        get(key: K): V;
        set(key: K, value: V): void;
        delete(key: K): boolean;
        has(key: K): boolean;
        forEach(callback: forEachMapCallback<K, V>, thisArg: any): void;
        keys(): Iterator<K>;
        values(): Iterator<V>;
        //entries(): Iterator<[K, V]>;
    }

    export class MultiSet<E> implements Set<E> {
        get size(): number {
            return this.map.size;
        }
        private map: Map<E, number>;

        constructor() {
            this.map = <any>new Map();
        }

        add(element: E): void {
            this.map.set(element, this.count(element) + 1);
        }

        count(element: E): number {
            var count = this.map.get(element);
            return count ? count : 0;
        }

        has(element: E): boolean {
            return this.count(element) > 0;
        }

        clear(): void {
            this.map.clear();
        }

        delete(element: E): boolean {
            return this.map.delete(element);
        }

        forEach(callback: forEachCollectionCallback<E>, thisArg?: any): void {
            // TODO: force forEachCollection to map with an any cast. Reconsider?
            this.map.forEach(<any>callback, thisArg);
        }

        values(): Iterator<E> {
            return this.map.keys();
        }

        isEmpty(): boolean {
            return this.map.size === 0;
        }
    }
}