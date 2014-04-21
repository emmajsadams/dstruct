/// <reference path="../../../References.d.ts"/>

module dsa.collections {

    export class Node<E> {
        constructor(public value:E, public prev?:Node<E>, public next?:Node<E>) {
        }
    }

    // Circular doubly linked
    class DoublyLinkedListIterator<E> implements Iterator<E> {
        constructor(private currentNode:Node<E>) {
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
        private rootNode:Node<E>;
        private lastNode:Node<E>;
        private count:number;

        constructor(private comparator:Comparator<E> = DefaultComparator) {
        }

        __iterator__():Iterator<E> {
            return new DoublyLinkedListIterator(this.rootNode);
        }

        add(element:E):boolean {
            this.addAtIndex(0, element);
            return true;
        }

        addAtIndex(index:number, element:E):void {
            Preconditions.checkNotNull(element);
            Preconditions.checkIndex(index, this.size());

            if (index === 0) {
                if (this.size() === 0) {
                    this.rootNode = this.lastNode = new Node<E>(element);
                    this.rootNode.next = this.rootNode;
                    this.rootNode.prev = this.rootNode;
                } else if (this.size() === 1) {
                    this.lastNode.next = new Node<E>(element);
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
            Preconditions.checkNotNull(element);

            if (this.size() === 0) {
                return false;
            }

            if (this.comparator(this.rootNode.value, element) === 0) {
                if (this.size() === 1) {
                    this.clear();
                    return true;
                }

                this.rootNode = this.rootNode.next;
                this.rootNode.prev = this.lastNode;
                this.lastNode.prev = this.rootNode;
                this.count--;
                return true;
            } else if (this.comparator(this.lastNode.value, element) === 0) {
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
            Preconditions.checkNotNull(index);
            Preconditions.checkIndex(index, this.size());

            if (this.size() === 1) {
                var element = this.rootNode.value;
                this.clear();
                return element;
            } else if (this.size() - 1 === index) {
                return this.removeLastNode();
            }
        }

        equals(collection:Collection<E>):boolean {
            return genericEquals(this, collection);
        }

        forEach(callback:ForEachCollectionCallback<E>):void {
            genericForEach(this, callback);
        }

        get(index:number):E {
            Preconditions.checkNotNull(index);
            Preconditions.checkIndex(index, this.size());

            return this.getNodeByIndex(index).value;
        }

        has(element:E):boolean {
            return this.indexOf(element) >= 0;
        }

        indexOf(element:E):number {
            Preconditions.checkNotNull(element);


            var i = 0;
            for (var node in this) {
                if (this.comparator(element, node.value) === 0) {
                    return i;
                }
                i++;
            }

            return -1;
        }

        set(index:number, element:E):E {
            Preconditions.checkNotNull(element);

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

        private getNodeByElement(element:E):Node<E> {
            for (var node in this) {
                if (this.comparator(element, node.value) === 0) {
                    return node.value;
                }
            }
            return null
        }

        private getNodeByIndex(index:number):Node<E> {
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