/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");

class ArrayListIterator<E extends BaseObject> implements Interfaces.Iterator<E> {
    private index = 0;

    constructor(private array:E[]) {}

    next():Interfaces.IteratorReturn<E> {
        var element = this.array[this.index];
        this.index++;
        return {
            value: element,
            done: this.index >= this.array.length - 1
        };
    }
}

export = ArrayListIterator;