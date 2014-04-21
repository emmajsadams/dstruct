/// <reference path="../../../References.d.ts"/>

declare module dsa.collections {

    export interface List<E> extends Collection<E> {
        indexOf(element:E): number;
        get(index:number): E;
        set(index:number, value:E): E;
    }

}