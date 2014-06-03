/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");
import Error = require("../../Error");
import IterableHelpers = require("../IterableHelpers");

class MapSet<E extends Interfaces.BaseObject> implements Interfaces.Set<E> {

    constructor(private map:Interfaces.Map<E, boolean>) {}

    add(element:E):boolean {
        this.map.set(element, true);

        return false; //TODO!
    }

    clear():void {
        this.map.clear();
    }

    remove(element:E):boolean {
        this.map.remove(element);

        //TODO!
        return false;
    }

    hashCode(): number {
        Error.notImplemented();
        return null;
    }

    equals(set:Interfaces.Set<E>):boolean {
        return IterableHelpers.equals<E>(this, set);
    }

    forEach(callback:Interfaces.ForEachCollectionCallback<E>):void {
        IterableHelpers.forEach(this, callback);
    }

    has(element:E):boolean {
        return this.map.containsKey(element);
    }

    isEmpty():boolean {
        return IterableHelpers.isEmpty(this);
    }

    size():number {
        return this.map.size();
    }

    toArray():E[] {
        return IterableHelpers.toArray<E>(this);
    }

    values():Interfaces.Iterator<E> {
        //TODO
        return null;
    }

    __iterator__():Interfaces.Iterator<E> {
        return this.map.keys();
    }

}

export = MapSet;