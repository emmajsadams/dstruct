/// <reference path="../../../References.d.ts"/>

module dsa.structs {

    export class ES6BaseMap<K, V> implements Map<K, V> {

        //TODO: a separate set of keys must be Maintained, since map keys will be hashed


        //private keys:ES6BaseMap<K, V>;

        constructor(private map:ES6Map<K, V>,
                    private comparator:Comparator<K> = DefaultComparator) {
            //this.keys = new WeakHashMap<K, V>; //TODO: weakhashmap?
        }

        clear():void {
            this.map.clear();
        }

        containsKey(key:K):boolean {
            dsa.error.checkNotNull(key);

            return this.map.has(key);
        }

        equals(map:Map<K, V>):boolean {
            //return dsa.structs.genericCollectionEquals(this, map);

            //TODO: need a generic map equals!
            return false;
        }

        forEach(callback:forEachMapCallback<K, V>):void {
            dsa.error.checkNotNull(callback);

            this.map.forEach(callback);
        }

        get(key:K):V {
            dsa.error.checkNotNull(key);

            return this.map.get(key);
        }

        has(element:K):boolean {
            return this.get(element) !== null;
        }

        isEmpty():boolean {
            return dsa.structs.genericIsEmpty(this);
        }

        keys():Iterator<K> {
            //TODO: return maintained set of keys
            return null;
            //return this.map.keys();
        }

        remove(key:K):V {
            dsa.error.checkNotNull(key);

            var value = this.map.get(key);
            this.map.delete(key);
            return value;
        }

        set(key:K, value:V):void {
            dsa.error.checkNotNull(key);
            dsa.error.checkNotNull(value);

            //TODO: this key needs to be hashed if it is an object. Look at the following links
            // this is because key equality in javascript maps are by value.
            //http://esdiscuss.org/topic/maps-with-object-keys
            //https://github.com/flesler/hashmap

            return this.map.set(key, value);
        }

        size():number {
            return this.map.size;
        }

        values():Iterator<V> {
            return this.map.values();
        }

        __iterator__():Iterator<K> {
            return this.keys();
        }

    }

}
