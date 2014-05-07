/// <reference path="../../../References.d.ts"/>

module dsa.structs {

    export class ArrayStack<E> extends ArrayList<E> implements Stack<E> {

        peek(): E {
            return this.get(this.size() - 1);
        }

        pop(): E {
            return this.removeAtIndex(this.size() - 1);
        }

        push(element: E): void {
            this.add(element);
        }

    }

}