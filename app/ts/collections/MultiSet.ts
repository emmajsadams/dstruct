/// <reference path="../References.d.ts"/>

module tsds.collections {
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
            this.addMany(element, 1);
        }

        /**
         * Adds a number of occurrences to this multiset
         * @param element Element to add a number of occurrences of.
         * @param occurrences Number of occurrences to add.
         */
            addMany(element: E, occurrences: number): void {
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
