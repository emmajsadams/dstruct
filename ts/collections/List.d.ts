/// <reference path="../../References.d.ts"/>

declare module tsds.collections {

    export interface List<E> extends Collection<E> {
        indexOf(element: E)
        get(index: number);
    }

}