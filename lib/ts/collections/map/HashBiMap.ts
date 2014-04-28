/// <reference path="../../../References.d.ts"/>

module dsa.structs {

    // TODO: implement IBiMap
    export class HashBiMap<K, V> {

        constructor(private map:ES6Map<K, V> = <any>new Map<K, V>(), private inverseMap:ES6Map<V, K> = <any>new Map<V, K>()) {
        }

        containsKey(key:K):boolean {
            return this.map.has(key);
        }

        get(key:K):V {
            return this.map.get(key);
        }

        set(key:K, value:V):void {
            //Exceptions.dsa.error.checkArgument(this.inverseMap.has(value), "value already bound to key");

            this.map.set(key, value);
            this.inverseMap.set(value, key);
        }

        size():number {
            return this.map.size;
        }

        remove(key:K):boolean {
            var value = this.map.get(key);
            this.inverseMap.delete(value);
            return this.map.delete(key);
        }

        // TODO: return map, or BiMap?? Guava returns BiMap
        // TODO: return IBiMap
        inverse() {
            // TODO: return a copy, or immutable/protected?
            // user should not be able to modify inverseMap
            return new HashBiMap(this.map, this.inverseMap);
        }

        clear():void {
            this.map.clear();
            this.inverseMap.clear();
        }

        forEach(callback:forEachMapCallback<K, V>, thisArg:any):void {

        }

        keys():Iterator<K> {
            return <any>{};
        }

        values():Iterator<V> {
            return <any>{};
        }

        // not to be used directly
        __iterator__():Iterator<K> {
            return null;
        }
    }
}