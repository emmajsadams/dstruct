/// <reference path="../../References.d.ts"/>

declare module dsa.collections {

    // Use in for ( element in Iterator ) { .. }
    // throws StopIteration when done
    export interface Iterator<E> {
        next(): E;
    }

    /*
     https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
     if (this.current > this.range.high)
     throw StopIteration;
     else
     return this.current++;
     */

}
