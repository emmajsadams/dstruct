/// <reference path="../../References.d.ts"/>

declare module dsa.collections {

    export interface ForEachCollectionCallback<E> {
        (value:E): void;
    }

    export interface Collection<E> {
        add(value:E): void;
        //addAll(collection: Collection<E>);
        clear(): void;
        delete(value:E): boolean;
        //deleteAll(collection: Collection<E>);

        // TODO: should equals be a collection member, or a utility function? leaning towards utility for ease.
        //equals(collection: Collection<E>);

        // TODO: mixin or abstract class for shared has logic?
        has(value:E): boolean;
        //hasAll(collection: Collection<E>);

        // TODO: mixin or abstract class for shared isEmpty logic?
        isEmpty(): boolean;
        size(): number;
        toArray(): E[];
    }

}