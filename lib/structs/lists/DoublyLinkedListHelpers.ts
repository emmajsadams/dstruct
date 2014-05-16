/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");

export class Node<E extends Interfaces.BaseObject> {
    constructor(public value:E, public prev?:Node<E>, public next?:Node<E>) {
    }
}

// Circular doubly linked
export class Iterator<E extends Interfaces.BaseObject> implements Interfaces.Iterator<E> {
    constructor(private currentNode:Node<E>) {
    }

    next():Interfaces.IteratorReturn<E> {
        var node = this.currentNode;
        this.currentNode = this.currentNode.next;
        return {
            value: this.currentNode.value,
            done: this.currentNode.next === null
        };
    }
}