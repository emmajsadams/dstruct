/// <reference path="../../References.d.ts"/>

declare module tsds.collections {

    export interface forEachMapCallback<K, V> {
        (value: V, key: K): void;
    }

    export interface Map<K, V>  {
        size: number;
        clear(): void;
        get(key: K): V;
        set(key: K, value: V): void;
        delete(key: K): boolean;
        has(key: K): boolean;
        forEach(callback: forEachMapCallback<K, V>, thisArg: any): void;
        keys(): Iterator<K>;
        values(): Iterator<V>;
        //entries(): Iterator<[K, V]>;
    }

}