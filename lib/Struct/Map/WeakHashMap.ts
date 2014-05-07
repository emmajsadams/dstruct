/// <reference path="../../../References.d.ts"/>

module dsa.structs {

    export class WeakHashMap<K extends Object, V extends Object> extends ES6BaseMap<K, V> {

        constructor() {
            super(<any>new Map());
        }

    }

}