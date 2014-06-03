/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");
import DoublyLinkedList = require("../lists/DoublyLinkedList");

class LinkedListQueue<E extends Interfaces.BaseObject> extends DoublyLinkedList<E> implements Interfaces.Queue<E> {

    peek():E {
        return this.get(0);
    }

    pop():E {
        return this.removeAtIndex(0);
    }

    push(element:E):void {
        this.add(element);
    }

}

export = LinkedListQueue;