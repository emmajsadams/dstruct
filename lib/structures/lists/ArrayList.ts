/// <reference path="../../../References.d.ts"/> 

import Interfaces = require("../../Interfaces");
import Error = require("../../Error");
import IterableHelpers = require("../IterableHelpers");
import ArrayListIterator = require("./ArrayListIterator");
import ArrayUtilities = require("../../ArrayUtilities");

/**
 * TODO
 * @param comparator TODO
 * @param initialCapacity TODO
 * @returns TODO
 */
class ArrayList<E extends Interfaces.BaseObject> implements Interfaces.List<E> {
    private array:E[];

    constructor(initialCapacity?:number) {
        this.array = new Array(initialCapacity || 0);
    }

    __iterator__():Interfaces.Iterator<E> {
        return new ArrayListIterator(this.array);
    }

    add(element:E):boolean {
        //TODO: should it default add at 0?
        this.addAtIndex(this.size(), element);

        //TODO: return true?
        return true;
    }

    addAtIndex(index:number, element:E):void {
        Error.checkNotNull(element);

        if (index === this.size()) {
            this.array.push(element);
        } else {
            this.array.splice(index, 0, element);
        }
    }

    clear():void {
        ArrayUtilities.clear(this.array);
    }

    removeAtIndex(index:number):E {
        Error.checkNotNull(index);
        Error.checkIndex(index, this.size());

        var element = this.get(index);
        this.array.splice(index, 1);
        return element;
    }

    remove(element:E):boolean {
        Error.checkNotNull(element);

        var index = this.indexOf(element);
        if (index >= 0) {
            this.array.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    hashCode(): number {
        Error.notImplemented();
        return null;
    }

    equals(collection:Interfaces.Collection<E>):boolean {
        return IterableHelpers.equals<E>(this, collection);
    }

    forEach(callback:Interfaces.ForEachCollectionCallback<E>):void {
        //TODO forEach?
        this.forEach(callback);
    }

    get(index:number):E {
        Error.checkNotNull(index);
        Error.checkIndex(index, this.size());

        return this.array[index];
    }

    has(element:E):boolean {
        return this.indexOf(element) >= 0;
    }

    indexOf(value:E):number {
        Error.checkNotNull(value);

        var index = 0;
        for (var element in this) {
            if (element.compareTo(value) === 0) {
                return index;
            }
            index++;
        }
        return -1;
    }

    set(index:number, element:E):E {
        Error.checkNotNull(element);

        var currentValue = this.get(index);
        this.array[index] = element;

        return currentValue;
    }

    size():number {
        return this.array.length;
    }

    toArray():E[] {
        // TODO: type properly
        return IterableHelpers.toArray<E>(this);
    }

    isEmpty():boolean {
        return IterableHelpers.isEmpty(this);
    }

}

export = ArrayList;

