/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");

module dsa.structs {

    //TODO: reimplement with HashMAp
    export class HashSet<E extends Interfaces.BaseObject> implements Interfaces.Set<E> {

        private set: Interfaces.ES6Set<E>;

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

        equals(set: Interfaces.Set<E>):boolean {
            return collectionEquals(this, set);
        }

        forEach(callback: Interfaces.ForEachCollectionCallback<E>): void {
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

        values(): Interfaces.Iterator<E> {
            //TODO
            return null;
        }

        // not to be used directly, enables using for (var element:E,
        __iterator__(): Interfaces.Iterator<E> {
            return this.set.values();
        }

    }

}