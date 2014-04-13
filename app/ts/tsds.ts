/// <reference path="./References.d.ts"/>

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

    class Validator {

        static null(element: any): void {
            if (element) {
                throw new tsds.Exceptions.NullPointer("argument is null.");
            }
        }

        static lessThanZero(num: number):void {
            if (num < 0) {
                throw new tsds.Exceptions.IllegalArgument("argument is less than zero.");
            }
        }
    }

    export class MultiSet<E> implements Set<E> {
        get size(): number {
            return this.map.size;
        }
        private map: Map<E, number>;

        constructor() {
            this.map = <any>new Map();
        }

        /**
         * Repeat <tt>str</tt> several times.
         * @param element The string to repeat.
         * @param How many times to repeat the string.
         * @returns
         */

        /**
         * Adds a single occurrence of the specified element to this multiset.
         * @param element Element to add one occurrence of.
         */
        add(element: E): void {
            this.add(element, 1);
        }

        /**
         * Adds a number of occurrences to this multiset
         * @param element Element to add a number of occurrences of.
         * @param occurrences Number of occurrences to add.
         */
        add(element: E, occurrences: number): void {
            Validator.null(element);
            Validator.lessThanZero(occurrences);
            this.map.set(element, this.count(element) + occurrences);
        }

        count(element: E): number {
            Validator.null(element);
            var count = this.map.get(element);
            return count ? count : 0;
        }

        has(element: E): boolean {
            Validator.null(element);
            return this.count(element) > 0;
        }

        clear(): void {
            this.map.clear();
        }

        delete(element: E): boolean {
            Validator.null(element);
            return this.map.delete(element);
        }

        forEach(callback: forEachCollectionCallback<E>, thisArg?: any): void {
            Validator.null(callback);
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