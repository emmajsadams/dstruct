/// <reference path="../../../../References.d.ts"/>

import Interfaces = require("../../../Interfaces");

module dsa.structs {

    export class HashBiMap<K extends BaseObject, V extends BaseObject> implements Interfaces.BiMap<K, V> {

        constructor(private map: HashMap<K, V> = new HashMap<K, V>(),
                    private inverseMap: HashMap<V, K> = new HashMap<V, K>()) {
        }

        containsKey(key:K):boolean {
            return this.map.containsKey(key);
        }

        equals(biMap: Interfaces.BiMap<K, V>): boolean {
            return dsa.structs.mapEquals(this, biMap);
        }

        get(key:K):V {
            return this.map.get(key);
        }

        remove(key:K):V {
            dsa.error.checkNotNull(key);

            // Check for the key/value pair, return null if not found
            var value = this.map.get(key);
            if (!value) {
                return null;
            }

            this.map.remove(key);
            this.inverseMap.remove(value);

            return value;
        }

        set(key:K, value:V):V {
            this.inverseMap.set(value, key);
            return this.map.set(key, value);
        }

        size():number {
            return this.map.size();
        }

        isEmpty(): boolean {
            return dsa.structs.iterableIsEmpty(this);
        }

        inverse(): Interfaces.BiMap<V, K> {
            // TODO: return a copy, or immutable/protected?
            return new HashBiMap<V, K>(this.inverseMap, this.map);
        }

        clear():void {
            this.map.clear();
            this.inverseMap.clear();
        }

        forEach(callback:Interfaces.ForEachMapCallback<K, V>):void {
            this.map.forEach(callback);
        }

        keys():Interfaces.Iterator<K> {
            return this.map.keys();
        }

        values():Interfaces.Iterator<V> {
            return this.map.values();
        }

        __iterator__():Interfaces.Iterator<K> {
            return this.map.keys();
        }

    }

}