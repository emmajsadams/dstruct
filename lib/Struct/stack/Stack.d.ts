/// <reference path="../../../References.d.ts"/>

declare module dsa.structs {

    export interface Stack<E> extends List<E>{
        peek(): E;
        pop(): E;
        push(element: E): void;
    }

}
