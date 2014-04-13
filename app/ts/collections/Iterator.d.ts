/// <reference path="../References.d.ts"/>

declare module tsds.collections {

    // Use in for ( element in Iterator ) { .. }
    export interface Iterator<E> {
        next(): E;
    }

}
