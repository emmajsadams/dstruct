/// <reference path="../../../References.d.ts"/>

declare module dsa.collections {

    export interface forEachMapCallback<K, V> {
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
        forEach(callback:forEachMapCallback<K, V>): void;
        get(key:K): V;
        has(key:K): boolean;
        keys(): Iterator<K>;
        set(key:K, value:V): void;
        values(): Iterator<V>;
    }

    export interface Map<K, V> {
        clear(): void;
        containsKey(key:K): boolean;
        equals(map: Map<K, V>):boolean;
        forEach(callback:forEachMapCallback<K, V>): void;
        get(key:K): V;

        // TODO: mixin or abstract class for shared isEmpty logic?
        isEmpty(): boolean;
        keys(): Iterator<K>;
        remove(key:K): boolean;
        set(key:K, value:V): void;
        size(): number;
        values(): Iterator<V>;

        // not to be used directly
        __iterator__(): Iterator<K>;
    }

}