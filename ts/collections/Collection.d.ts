/// <reference path="../../References.d.ts"/>

declare module tsds.collections {

    export interface ForEachCollectionCallback<E> {
        (value: E): void;
    }

    export interface Collection<E> {
        size: number;
        clear(): void;
        has(value: E);
        add(value: E): void;
        isEmpty(): boolean;
        delete(value: E);
        forEach(callback: ForEachCollectionCallback<E>, thisArg: any): void;
    }

}