/// <reference path="../../References.d.ts"/>

declare module dsa.collections {

    // Use in for ( element in Iterator ) { .. }
    export interface Iterator<E> {
        next(): E;
    }

}
