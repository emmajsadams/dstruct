/// <reference path="../../../References.d.ts"/>

declare module dsa.structs {

    export interface ForEachMapCallback<K, V> {
        (value:V, key:K): void;
    }

    // Based on the MDN ES6 documentation of the upcoming ES6 Map proposal.
    // Not necessarily complete, only the methods used within the library are part of the interface.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    export interface ES6Map<K, V> {
        size: number;

        clear(): void;
        delete(key:K): boolean;
        //TODO: entries?
        forEach(callback:ForEachMapCallback<K, V>): void;
        get(key:K): V;
        has(key:K): boolean;
        keys(): Iterator<K>;
        set(key:K, value:V): void;
        values(): Iterator<V>;
    }

    export interface Map<K extends Object, V extends Object> extends Iterable {
        clear(): void;

        //TODO: mixin, helper function for shared logic?
        containsKey(key:K): boolean;
        equals(map:Map<K, V>):boolean;
        forEach(callback:ForEachMapCallback<K, V>): void;
        get(key:K): V;

        //TODO: mixin, helper function for shared logic?
        isEmpty(): boolean;
        keys(): Iterator<K>;
        remove(key:K): V;
        set(key:K, value:V): V;
        values(): Iterator<V>;

        // TODO: ensure current standard matches this interface.
        __iterator__(): Iterator<K>;
    }

    export interface SortedMap<K extends ComparableObject, V extends Object> extends Map<K, V> {
    }

}