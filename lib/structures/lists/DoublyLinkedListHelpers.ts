import Interfaces = require("../../Interfaces");

export class Node<E extends Interfaces.IBaseObject> {
  constructor(public value: E, public prev?: Node<E>, public next?: Node<E>) {
  }
}

// Circular doubly linked
export class Iterator<E extends Interfaces.IBaseObject> implements Interfaces.IIterator<E> {
  constructor(private currentNode: Node<E>) {
  }

  next(): Interfaces.IIteratorReturn<E> {
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