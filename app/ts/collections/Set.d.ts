/// <reference path="../References.d.ts"/>

declare module tsds.collections {

    export interface Set<E> extends Collection<E>{
        //entries(): Iterator<E>;
        //keys(): Iterator<E>;
        values(): Iterator<E>;
    }

}
