/// <reference path="../../../References.d.ts"/>

module dsa.structs {

    export interface Entry<K, V> {
        key: K
        value: V;
        next: Entry<K, V>; //TODO: consider using a singly linkedlist?
    }

    export class ES6BaseMap<K extends Object, V extends Object> implements Map<K, V> {

        private keyCount: number;

        constructor(private map:ES6Map<number, Entry<K, V>>) {
        }

        clear():void {
            this.map.clear();
        }

        containsKey(key:K):boolean {
            dsa.error.checkNotNull(key);

            return this.get(key) !== null;
        }

        equals(map:Map<K, V>):boolean {
            //TODO: need a generic map equals!
            return false;
        }

        forEach(callback:forEachMapCallback<K, V>):void {
            dsa.error.checkNotNull(callback);

            this.map.forEach(function (entry) {
                while (entry !== null) {
                    callback(entry.value, entry.key);
                    entry = entry.next;
                }
            });
        }

        get(key:K):V {
            dsa.error.checkNotNull(key);

            // Check if the bucket exists
            var entry = this.map.get(key.hashCode());
            if (!entry) {
                return null;
            }

            // Check if an entry with the key exists in the bucket
            while (entry !== null) {
                if (entry.key.equals(key)) {
                    return entry.value;
                }
                entry = entry.next;
            }

            return null;
        }

        isEmpty():boolean {
            return dsa.structs.genericIsEmpty(this);
        }

        keys():Iterator<K> {
            //TODO
            return null;
        }

        remove(key:K):V {
            dsa.error.checkNotNull(key);

            var hashCode = key.hashCode();
            // Check if the bucket exists
            var entry = this.map.get(hashCode);
            if (!entry) {
                return null;
            }

            // Check if the first entry is the key
            if (entry.key.equals(key)) {
                this.keyCount--;
                if (entry.next) {
                    // Map hashCode to entry.next if it exist s
                    this.map.set(hashCode, entry.next);
                } else {
                    // Remove the hashCode mapping else
                    this.map.delete(hashCode);
                }

                return entry.value;
            }

            // Check if the next entry has the key and remove it from the bucket and set.
            while (entry.next !== null) {
                if (entry.next.key.equals(key)) {
                    this.keyCount--;
                    var removedEntry = entry.next;
                    entry.next = entry.next.next;
                    return removedEntry.value;
                }
                entry = entry.next;
            }

            return null;
        }

        set(key:K, value:V):V {
            dsa.error.checkNotNull(key);
            dsa.error.checkNotNull(value);

            // Check if the bucket exists
            var hashCode = key.hashCode();
            var entry = this.map.get(hashCode);
            if (!entry) {
                this.keyCount++;

                //Map the hashCode to a new bucket if no bucket exists.
                this.map.set(hashCode, {
                    key: key,
                    value: value,
                    next: null
                });

                return null;
            }

            // Check if an entry with the key exists in the bucket
            while (entry.next !== null) {
                if (entry.key.equals(key)) {
                    return this.swapEntryValue(entry, key, value);
                }
                entry = entry.next;
            }

            // Check if the last entry has the key. Else add it.
            if (entry.key.equals(key)) {
                return this.swapEntryValue(entry, key, value);
            } else {
               this.keyCount++;
               entry.next = {
                   key: key,
                   value: value,
                   next: null
               };
            }

            return null;
        }

        size():number {
            return this.keyCount;
        }

        values():Iterator<V> {
            //TODO!
            //return this.forEach(value, key);
            return null;
        }

        __iterator__():Iterator<K> {
            return this.keys();
        }

        private swapEntryValue(entry: Entry<K, V>, key:K, value: V) {
            // Swap value
            var oldValue = entry.value;
            entry.value = value;
            return oldValue;
        }

    }

}
