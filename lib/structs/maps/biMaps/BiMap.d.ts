/// <reference path="../../../../References.d.ts"/>

declare module dsa.structs {

    export interface BiMap<K extends Object, V extends Object> extends Map<K ,V> {
        inverse(): BiMap<V, K>
    }

}