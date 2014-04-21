/// <reference path="../../../References.d.ts"/>

module dsa.collections {

    class Node<E> {
        constructor(public value: E,
                    public next?: Node<E>) {}
    }

    export class LinkedList<E> implements List<E> {
        private rootNode: Node<E>;
        private lastNode: Node<E>;
        private count:number;

        constructor(private comparator: Comparator<E> = DefaultComparator) {
            //this.array = new Array(size || 0);
        }

        add(value: E): void {
            Preconditions.checkNotNull(value);

            if (this.size() === 0) {
                this.rootNode = this.lastNode = new Node<E>(value, null);
            } else if (this.size() === 1) {
                // Create a new node, set last, set root next
                var node = new Node<E>(value, null);
                this.lastNode = node;
                this.rootNode.next = node;
            } else {
                var node = new Node<E>(value, null);
                this.lastNode.next = node;
                this.lastNode = this.lastNode.next;
            }
            this.count++;
        }

        clear(): void {
            this.rootNode = this.lastNode = null;
            this.count = 0;
        }

        delete(value: E): boolean {
            Preconditions.checkNotNull(value);

            if (this.rootNode.value === value) {

            }

            var index = this.indexOf(value);
            if (index >= 0) {
                //this.array.splice(index, 1);
                return true;
            } else {
                return false;
            }
        }

        get(index:number): E {
            Preconditions.checkNotNull(index);
            Preconditions.checkIndex(index, this.size());


            var currentNode = this.rootNode;

            // TODO
            return null;

            //return this.array[index];
        }

        has(value: E): boolean{
            return this.indexOf(value) >= 0;
        }

        indexOf(value:E):number {
            Preconditions.checkNotNull(value);

            //TODO?
            return -1;
        }

        set(index:number, value:E): E {
            Preconditions.checkNotNull(value);

            //var currentValue = this.get(index);
            //this.array[index] = value;

            //return currentValue;
            return null; //TODO
        }

        size(): number {
            return this.count;
        }

        // O(N)
        toArray():E[] {
            var array = [];
            var currentNode = this.rootNode;
            while (currentNode !== null) {
                array.push(currentNode.value);
                currentNode = currentNode.next;
            }
            return array;
        }

        isEmpty(): boolean {
            return this.size() > 0;
        }
    }

}