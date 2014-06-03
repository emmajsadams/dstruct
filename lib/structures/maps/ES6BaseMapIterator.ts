/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");

class ES6BaseMapIterator<E> implements Interfaces.Iterator<E> {
    private currentEntry:Interfaces.Entry<any, any>;
    private done = false;

    constructor(private iterator:Interfaces.Iterator<Interfaces.Entry<any, any>>, private valueCallback:(entry:Interfaces.Entry<any, any>) => any) {
    }

    next():Interfaces.IteratorReturn<E> {
        // Check if there is an entry to return
        if (this.currentEntry === null || this.currentEntry.next === null) {
            // Get next entry, assign done value and current entry.
            var next = this.iterator.next();
            this.done = next.done;
            this.currentEntry = next.value;
        }

        return {
            value: this.valueCallback(this.currentEntry),

            // Check if there is a current entry, and if this is the last key and return true.
            // Else return false.
            done: !!(this.currentEntry.next === null && this.done)
        };
    }
}

export = ES6BaseMapIterator;