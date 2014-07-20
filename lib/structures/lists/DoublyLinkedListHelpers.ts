
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
        if (this.currentNode && this.currentNode !== undefined) {
            var next = {
                value: this.currentNode.value,
                done: false
            };
            this.currentNode = this.currentNode.next;
            return next;
        } else {
            return {
                value: null,
                done: true
            }
        }
    }
}