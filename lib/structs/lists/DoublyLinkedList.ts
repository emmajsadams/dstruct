/// <reference path="../../../References.d.ts"/>

module dsa.structs {

    export class DoublyLinkedNode<E extends Object> {
        constructor(public value:E, public prev?:DoublyLinkedNode<E>, public next?:DoublyLinkedNode<E>) {
        }
    }

    // Circular doubly linked
    class DoublyLinkedListIterator<E extends Object> implements Iterator<E> {
        constructor(private currentNode:DoublyLinkedNode<E>) {
        }

        next():E {
            if (this.currentNode === null) {
                throw StopIteration;
            }

            var node = this.currentNode;
            this.currentNode = this.currentNode.next;
            return this.currentNode.value;
        }
    }

    export class DoublyLinkedList<E> implements List<E> {
        private rootNode:DoublyLinkedNode<E>;
        private lastNode:DoublyLinkedNode<E>;
        private count:number;

        constructor() {
        }

        __iterator__():Iterator<E> {
            return new DoublyLinkedListIterator(this.rootNode);
        }

        add(element:E):boolean {
            this.addAtIndex(0, element);
            return true;
        }

        addAtIndex(index:number, element:E):void {
            dsa.error.checkNotNull(element);
            dsa.error.checkIndex(index, this.size());

            if (index === 0) {
                if (this.size() === 0) {
                    this.rootNode = this.lastNode = new DoublyLinkedNode<E>(element);
                    this.rootNode.next = this.rootNode;
                    this.rootNode.prev = this.rootNode;
                } else if (this.size() === 1) {
                    this.lastNode.next = new DoublyLinkedNode<E>(element);
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
            dsa.error.checkNotNull(element);

            if (this.size() === 0) {
                return false;
            }

            if (this.rootNode.value.compareTo(element) === 0) {
                if (this.size() === 1) {
                    this.clear();
                    return true;
                }

                this.rootNode = this.rootNode.next;
                this.rootNode.prev = this.lastNode;
                this.lastNode.prev = this.rootNode;
                this.count--;
                return true;
            } else if (this.lastNode.value.compareTo(element) === 0) {
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
            dsa.error.checkNotNull(index);
            dsa.error.checkIndex(index, this.size());

            if (this.size() === 1) {
                var element = this.rootNode.value;
                this.clear();
                return element;
            } else if (this.size() - 1 === index) {
                return this.removeLastNode();
            }
        }

        equals(collection:Collection<E>):boolean {
            return genericCollectionEquals(this, collection);
        }

        forEach(callback:ForEachCollectionCallback<E>):void {
            genericForEach(this, callback);
        }

        get(index:number):E {
            dsa.error.checkNotNull(index);
            dsa.error.checkIndex(index, this.size());

            return this.getNodeByIndex(index).value;
        }

        has(element:E):boolean {
            return this.indexOf(element) >= 0;
        }

        indexOf(element:E):number {
            dsa.error.checkNotNull(element);

            var i = 0;
            for (var node in this) {
                if (element.compareTo(node.value) === 0) {
                    return i;
                }
                i++;
            }

            return -1;
        }

        set(index:number, element:E):E {
            dsa.error.checkNotNull(element);

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

        private getNodeByElement(element:E):DoublyLinkedNode<E> {
            for (var node in this) {
                if (element.compareTo(node.value) === 0) {
                    return node.value;
                }
            }
            return null
        }

        private getNodeByIndex(index:number):DoublyLinkedNode<E> {
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

}