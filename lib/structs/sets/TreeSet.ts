/// <reference path="../../../References.d.ts"/>

module dsa.structs {

    export class TreeSet<E extends ComparableObject> implements Set<E> {

        private treeMap: TreeMap<E, boolean>;

        constructor() {
            this.treeMap = new TreeMap<E, boolean>();
        }

        add(element:E): boolean {
            this.treeMap.set(element, true);

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

        equals(set: Set<E>):boolean {
            return genericCollectionEquals(this, set);
        }

        forEach(callback: ForEachCollectionCallback<E>): void {
            //TODO!
            //this.treeMap.forEach(callback);
        }

        has(element:E):boolean {
            return this.treeMap.containsKey(element);
        }

        isEmpty(): boolean {
            return genericIsEmpty(this);
        }

        size(): number {
            return this.treeMap.size();
        }

        toArray(): E[] {
            return null; //TODO!
        }

        values(): Iterator<E> {
            //TODO
            return null;
        }

        __iterator__(): Iterator<E> {
            return this.treeMap.keys();
        }

    }

}