/// <reference path="../../../../References.d.ts"/>

import Interfaces = require("../../../Interfaces");
import MapHelpers = require("../MapHelpers");
import Error = require("../../../Error");
import IterableHelpers = require("../../IterableHelpers");
import HashMap = require("../HashMap");

class HashBiMap<K extends Interfaces.BaseObject, V extends Interfaces.BaseObject> implements Interfaces.BiMap<K, V> {

    constructor(private map:HashMap<K, V> = new HashMap<K, V>(), private inverseMap:HashMap<V, K> = new HashMap<V, K>()) {
    }

    containsKey(key:K):boolean {
        return this.map.containsKey(key);
    }

    equals(biMap:Interfaces.BiMap<K, V>):boolean {
        return MapHelpers.equals(this, biMap);
    }

    get(key:K):V {
        return this.map.get(key);
    }

    remove(key:K):V {
        Error.checkNotNull(key);

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

    isEmpty():boolean {
        return IterableHelpers.isEmpty(this);
    }

    inverse():Interfaces.BiMap<V, K> {
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

export = HashBiMap;