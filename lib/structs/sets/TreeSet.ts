/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");

module dsa.structs {

    // TODO: best null/base object for values?
    export class TreeSet<E extends Interfaces.ComparableBaseObject> implements Interfaces.Set<E> {

        private treeMap: TreeMap<E, Interfaces.BaseObject>;

        constructor() {
            this.treeMap = new TreeMap<E, Interfaces.BaseObject>();
        }

        add(element:E): boolean {
            this.treeMap.set(element, undefined);

            return false; //TODO!
        }

        clear(): void {
            this.treeMap.clear();
        }

        remove(element:E): boolean {
            this.treeMap.remove(element);

            //TODO!
            return false;
        }

        equals(set: Interfaces.Set<E>):boolean {
            return collectionEquals(this, set);
        }

        forEach(callback: Interfaces.ForEachCollectionCallback<E>): void {
            //TODO!
            //this.treeMap.forEach(callback);
        }

        has(element:E):boolean {
            return this.treeMap.containsKey(element);
        }

        isEmpty(): boolean {
            return iterableIsEmpty(this);
        }

        size(): number {
            return this.treeMap.size();
        }

        toArray(): E[] {
            return null; //TODO!
        }

        values(): Interfaces.Iterator<E> {
            //TODO
            return null;
        }

        __iterator__(): Interfaces.Iterator<E> {
            return this.treeMap.keys();
        }

    }

}