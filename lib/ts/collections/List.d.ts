/// <reference path="../../References.d.ts"/>

declare module dsa.collections {

    export interface List<E> extends Collection<E> {
        indexOf(element: E)
        get(index: number);
    }

}