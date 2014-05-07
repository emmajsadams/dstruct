/// <reference path="../../../References.d.ts"/>

declare module dsa.structs {


    export interface Set<E> extends Collection<E>{
        //entries(): Iterator<E>;
        //keys(): Iterator<E>;
        //values(): Iterator<E>;
    }

    export interface ES6Set<E> {
        size: number;

        add(value: E): void;
        clear(): void;
        delete(value:E): boolean;
        //TODO: entries?
        forEach(callback:ForEachCollectionCallback<E>): void;
        has(value:E): boolean;
        //keys(): Iterator<K>;
        values(): Iterator<E>;
    }

}
