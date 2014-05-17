/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");
import DoublyLinkedListHelpers = require("./DoublyLinkedListHelpers");
import Error = require("../../Error");
import IterableHelpers = require("../IterableHelpers");

class DoublyLinkedList<E extends Interfaces.BaseObject> implements Interfaces.List<E> {
    private rootNode:DoublyLinkedListHelpers.Node<E>;
    private lastNode:DoublyLinkedListHelpers.Node<E>;
    private count:number;

    constructor() {}

    __iterator__():Interfaces.Iterator<E> {
        return new DoublyLinkedListHelpers.Iterator(this.rootNode);
    }

    add(element:E):boolean {
        this.addAtIndex(0, element);
        return true;
    }

    addAtIndex(index:number, element:E):void {
        Error.checkNotNull(element);
        Error.checkIndex(index, this.size());

        if (index === 0) {
            if (this.size() === 0) {
                this.rootNode = this.lastNode = new DoublyLinkedListHelpers.Node<E>(element);
                this.rootNode.next = this.rootNode;
                this.rootNode.prev = this.rootNode;
            } else if (this.size() === 1) {
                this.lastNode.next = new DoublyLinkedListHelpers.Node<E>(element);
                this.rootNode.prev = this.lastNode.next;
            }
        }

        this.count++;
    }

    clear():void {
        this.rootNode = this.lastNode = null;
        this.count = 0;
    }

    remove(element:E):boolean {
        Error.checkNotNull(element);

        if (this.size() === 0) {
            return false;
        }

        if (this.rootNode.value.equals(element)) {
            if (this.size() === 1) {
                this.clear();
                return true;
            }

            this.rootNode = this.rootNode.next;
            this.rootNode.prev = this.lastNode;
            this.lastNode.prev = this.rootNode;
            this.count--;
            return true;
        } else if (this.lastNode.value.equals(element)) {
            return this.removeLastNode() !== null;
        } else {
            var node = this.getNodeByElement(element);
            if (node) {
                node.prev.next = node.next;
                node.next.prev = node.prev;
                this.count--;
                return true;
            }
        }

        return false;
    }

    removeAtIndex(index:number):E {
        Error.checkNotNull(index);
        Error.checkIndex(index, this.size());

        if (this.size() === 1) {
            var element = this.rootNode.value;
            this.clear();
            return element;
        } else if (this.size() - 1 === index) {
            return this.removeLastNode();
        }
    }

    equals(collection:Interfaces.Collection<E>):boolean {
        return IterableHelpers.equals<E>(this, collection);
    }

    forEach(callback:Interfaces.ForEachCollectionCallback<E>):void {
        IterableHelpers.forEach(this, callback);
    }

    get(index:number):E {
        Error.checkNotNull(index);
        Error.checkIndex(index, this.size());

        return this.getNodeByIndex(index).value;
    }

    has(element:E):boolean {
        return this.indexOf(element) >= 0;
    }

    indexOf(element:E):number {
        Error.checkNotNull(element);

        var i = 0;
        for (var node in this) {
            if (element.equals(node.value)) {
                return i;
            }
            i++;
        }

        return -1;
    }

    set(index:number, element:E):E {
        Error.checkNotNull(element);

        return this.getNodeByIndex(index).value = element;
    }

    size():number {
        return this.count;
    }

    // O(N)
    toArray():E[] {
        var array = [];
        for (var node in this) {
            array.push(node.value);
        }
        return array;
    }

    isEmpty():boolean {
        return this.size() > 0;
    }

    private getNodeByElement(element:E):DoublyLinkedListHelpers.Node<E> {
        for (var node in this) {
            if (element.equals(node.value)) {
                return node.value;
            }
        }
        return null
    }

    private getNodeByIndex(index:number):DoublyLinkedListHelpers.Node<E> {
        var i = 0;
        for (var node in this) {
            if (i === index) {
                return node;
            }
        }
        return null;
    }

    private removeLastNode():E {
        var element = this.rootNode.value;
        this.lastNode = this.lastNode.prev;
        this.lastNode.next = this.rootNode;
        this.rootNode.prev = this.lastNode;
        this.count--;
        return element;
    }

}

export = DoublyLinkedList;
