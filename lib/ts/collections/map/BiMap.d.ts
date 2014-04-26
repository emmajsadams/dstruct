/// <reference path="../../../References.d.ts"/>

declare module dsa.collections {

    export interface IBiMap<K, V> extends Map<K ,V> {
        inverse(): IBiMap<V, K>
    }

}