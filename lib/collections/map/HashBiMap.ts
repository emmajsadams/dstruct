/// <reference path="../../../References.d.ts"/>

module dsa.structs {

    // TODO: implement IBiMap
    //Rewrite with HashMap!!
    export class HashBiMap<K, V> {
        // Protected
        public _map: HashMap<K, V>;
        public _inverseMap: HashMap<K, V>;

        constructor(private keyComparator:Comparator<K> = DefaultComparator,
                    private valueComparator:Comparator<V> = DefaultComparator) {
            this._map = new HashMap<K, V>(this.keyComparator, valueComparator);
            this._inverseMap = new HashMap<K, V>(this.keyComparator, valueComparator);
        }

        containsKey(key:K):boolean {
            return this._map.has(key);
        }

        get(key:K):V {
            return this._map.get(key);
        }

        set(key:K, value:V):void {
            this._map.set(key, value);
            this._inverseMap.set(value, key);
        }

        size():number {
            return this._map.size();
        }

        remove(key:K):V {
            this._inverseMap.remove(value);
            return this._map.remove(key);
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
    */
}