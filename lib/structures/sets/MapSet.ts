/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");
import Error = require("../../Error");
import IterableHelpers = require("../IterableHelpers");

class BaseSet<E extends Interfaces.ComparableBaseObject> implements Interfaces.Set<E> {

    private treeMap:TreeMap<E, Interfaces.BaseObject>;

    constructor() {
        this.treeMap = new TreeMap<E, Interfaces.BaseObject>();
    }

    add(element:E):boolean {
        this.treeMap.set(element, undefined);

        return false; //TODO!
    }

    clear():void {
        this.treeMap.clear();
    }

    remove(element:E):boolean {
        this.treeMap.remove(element);

        //TODO!
        return false;
    }

    equals(set:Interfaces.Set<E>):boolean {
        return IterableHelpers.equals<E>(this, set);
    }

    forEach(callback:Interfaces.ForEachCollectionCallback<E>):void {
        IterableHelpers.forEach(this, callback);
    }

    has(element:E):boolean {
        return this.treeMap.containsKey(element);
    }

    isEmpty():boolean {
        return IterableHelpers.isEmpty(this);
    }

    size():number {
        return this.treeMap.size();
    }

    toArray():E[] {
        return IterableHelpers.toArray(this);
    }

    values():Interfaces.Iterator<E> {
        //TODO
        return null;
    }

    __iterator__():Interfaces.Iterator<E> {
        return this.treeMap.keys();
    }

}

export = BaseSet;