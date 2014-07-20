
import Interfaces = require("../../Interfaces");
import DoublyLinkedListHelpers = require("./DoublyLinkedListHelpers");
import Error = require("../../Error");
import IterableHelpers = require("../IterableHelpers");

class DoublyLinkedList<E extends Interfaces.BaseObject> implements Interfaces.List<E> {
    private rootNode:DoublyLinkedListHelpers.Node<E>;
    private lastNode:DoublyLinkedListHelpers.Node<E>;
    private count = 0;

    constructor() {
    }

    __iterator__():Interfaces.Iterator<E> {
        return new DoublyLinkedListHelpers.Iterator(this.rootNode);
    }

    add(element:E):boolean {
        this.addAtIndex(this.size(), element);
        return true;
    }

    addAtIndex(index:number, element:E):void {
        Error.checkNotNull(element);
        Error.checkIndex(index, this.size());

        // TODO: handle at n index
        if (this.size() === 0) {
            this.rootNode = this.lastNode = new DoublyLinkedListHelpers.Node<E>(element);
        } else if (this.size() === 1) {
            if (index === 0) {
                // Assign the root to the new element node, link the root to last.
                this.rootNode = new DoublyLinkedListHelpers.Node<E>(element);
                this.rootNode.next = this.lastNode;
                this.lastNode.prev = this.rootNode;
            } else {
                this.lastNode = new DoublyLinkedListHelpers.Node<E>(element);
                this.rootNode.next = this.lastNode;
                this.lastNode.prev = this.rootNode;
            }
        } else if (index === 0) {
            // Store the current root in a temporary variable, and reassign the root to the element.
            var previousRootNode = this.rootNode;
            this.rootNode = new DoublyLinkedListHelpers.Node<E>(element);

            // Reassign rootNode next, and previousRoot to link the element in the list.
            this.rootNode.next = previousRootNode;
            previousRootNode.prev = this.rootNode;
        } else if (index === this.size()) {
            var previousLastNode = this.lastNode;
            this.lastNode = new DoublyLinkedListHelpers.Node<E>(element);

            // Assign the new last node.prev to the previousLastNode.
            // previousLastNode.next is assigned to the new lastNode.
            this.lastNode.prev = previousLastNode;
            previousLastNode.next = this.lastNode;
        } else {
            // Handles the n index case, where n is not the end or beginning of the list.
            var node = this.getNodeByIndex(index);
            var previousNode = node.prev;
            node.prev = new DoublyLinkedListHelpers.Node<E>(element, node, previousNode);
            previousNode.next = node.prev;
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
        } else if (this.size() == 1) {
            return this.removeAtIndex(0) !== null;
        }

        if (this.rootNode.value.equals(element)) {
            return this.removeAtIndex(0) !== null;
        } else if (this.lastNode.value.equals(element)) {
            return this.removeAtIndex(this.size() - 1) !== null;
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
        Error.checkIndex(index, this.size() - 1);

        // TODO, handle n case, and 0 case.
        if (this.size() === 1) {
            var element = this.rootNode.value;
            this.clear();
            return element;
        } else if (index === 0) {
            var element = this.rootNode.value;
            this.rootNode = this.rootNode.next;
            this.count--;
            return element;
        } else if (this.size() - 1 === index) {
            return this.removeLastNode();
        } else {
            //TODO: handle n index case.
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
        IterableHelpers.forEach(this, callback);
    }

    get(index:number):E {
        Error.checkNotNull(index);
        Error.checkIndex(index, this.size() - 1);

        return this.getNodeByIndex(index).value;
    }

    has(element:E):boolean {
        return this.indexOf(element) >= 0;
    }

    indexOf(element:E):number {
        return IterableHelpers.indexOf(this, value);
    }

    set(index:number, element:E):E {
        Error.checkNotNull(element);

        return this.getNodeByIndex(index).value = element;
    }

    size():number {
        return this.count;
    }

    toArray():E[] {
        return IterableHelpers.toArray<E>(this);
    }

    isEmpty():boolean {
        return IterableHelpers.isEmpty(this);
    }

    private getNodeByElement(element:E):DoublyLinkedListHelpers.Node<E> {
        var node = this.rootNode;
        while (node) {
            if (element.equals(node.value)) {
                return node;
            }
            node = node.next;
        }
        return null;
    }

    private getNodeByIndex(index:number):DoublyLinkedListHelpers.Node<E> {
        var node = this.rootNode;
        var i = 0;
        while (node) {
            if (i === index) {
                return node;
            }
            if (i > index) {
                return null;
            }
            node = node.next;
            i++;
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
