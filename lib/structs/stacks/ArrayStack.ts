/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");

module dsa.structs {

    export class ArrayStack<E extends Interfaces.BaseObject> extends ArrayList<E> implements Interfaces.Stack<E> {

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