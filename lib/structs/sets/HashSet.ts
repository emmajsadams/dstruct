/// <reference path="../../../References.d.ts"/>

module dsa.structs {

    //TODO: reimplement with HashMAp
    export class HashSet<E> implements Set<E> {

        private set: ES6Set<E>;

        constructor() {
            this.set = <any>new Set();
        }

        add(element:E): boolean {
            this.set.add(element);

            //TODO!
            return false;
        }

        clear(): void {
            this.set.clear();
        }

        remove(element:E): boolean {
            this.set.delete(element);
            //TODO!
            return false;
        }

        equals(set: Set<E>):boolean {
            return collectionEquals(this, set);
        }

        forEach(callback: ForEachCollectionCallback<E>): void {
            this.set.forEach(callback);
        }

        has(element:E): boolean {
            return this.set.has(element);
        }

        // TODO: mixin or abstract class for shared isEmpty logic?
        isEmpty(): boolean {
            return dsa.structs.iterableIsEmpty(this);
        }

        size(): number {
            return this.set.size;
        }

        // Although a readonly property would be better, typescript does not support this for interfaces.
        toArray(): E[] {
            return null; //TODO!
        }

        values(): Iterator<E> {
            //TODO
            return null;
        }

        // not to be used directly, enables using for (var element:E,
        __iterator__(): Iterator<E> {
            return this.set.values();
        }

    }

}