/// <reference path="../../../References.d.ts"/>

declare module dsa.structs {

    export interface List<E> extends Collection<E> {
        indexOf(element:E): number;
        get(index:number): E;
        set(index:number, Element:E): E;
        addAtIndex(index:number, element:E):void;
        removeAtIndex(index:number): E;
    }

}