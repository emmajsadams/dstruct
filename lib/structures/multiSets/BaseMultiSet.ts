/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");
import Error = require("../../Error");

interface MultiSet<E> {

}

//TODO: Create an interface for MultiSets!
class BaseMultiSet<E> {
    constructor(private map:Interfaces.Map<E, number>) {
    }

    size(): number {
        return this.map.size();
    }

    /**
     * Adds a number of occurrences to this multiset
     * @param element Element to add a number of occurrences of.
     * @param occurrences Number of occurrences to add.
     */
    add(element:E, occurrences:number = 1):number {
        return this.setCount(element, this.count(element) + occurrences);
    }

   /**
    * Returns the number of occurrences of the specified element.
    * @param element Element to retrieve the occurrences of.
    * @returns The number of occurrences of the element in this multiset.
    */
    count(element:E):number {
        var count = this.map.get(element);
        return count ? count : 0;
    }

    has(element:E):boolean {
        return this.count(element) > 0;
    }

    clear():void {
        this.map.clear();
    }

    remove(element:E, occurrences:number = 1):number {
        return this.setCount(element,  this.count(element) - occurrences);
    }

    setCount(element:E, occurrences:number):number {
        Error.checkArgument(occurrences >= 0);

        return occurrences < 0
            ? this.map.remove(element)
            : this.map.set(element, occurrences);
    }

    forEach(callback: Interfaces.ForEachCollectionCallback<E>):void {
        this.map.forEach(callback);
    }

    values(): Interfaces.Iterator<E> {
        return this.map.keys();
    }

    isEmpty():boolean {
        return this.size() === 0;
    }

    toArray(): E[] {
        return IterableHelpers.toArray(this);
    }

    __iterator__(): Interfaces.Iterator<E> {
        return this.values();
    }
}

export = BaseMultiSet

