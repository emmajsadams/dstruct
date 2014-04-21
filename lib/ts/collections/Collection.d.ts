/// <reference path="../../References.d.ts"/>

declare module dsa.collections {

    export interface ForEachCollectionCallback<E> {
        (value:E): void;
    }

    export interface Collection<E> {
        add(element:E): boolean;
        //addAll(collection: Collection<E>);
        clear(): void;
        remove(element:E): boolean;
        //deleteAll(collection: Collection<E>);

        // TODO: should equals be a collection member, or a utility function? leaning towards utility for ease.
        equals(collection: Collection<E>):boolean;
        forEach(callback: ForEachCollectionCallback<E>): void;

        // TODO: mixin or abstract class for shared has logic?
        has(element:E): boolean;
        //hasAll(collection: Collection<E>);

        // TODO: mixin or abstract class for shared isEmpty logic?
        isEmpty(): boolean;
        size(): number;
        toArray(): E[];

        // not to be used directly, enables using for (var element:E,
        __iterator__(): Iterator<E>;
    }

}