import Interfaces = require("../../Interfaces");
import Error = require("../../Error");
import MapHelpers = require("./MapHelpers");
import IterableHelpers = require("../IterableHelpers");
import ES6Helpers = require("./ES6Helpers");

// TODO: benchmark this solution compared to actually implementing a HashMap with an array.
class ES6BaseMap<K extends Interfaces.BaseObject, V extends Interfaces.BaseObject> implements Interfaces.Map<K, V> {

    private keyCount = 0;

    constructor(private map:ES6Helpers.Map<number, ES6Helpers.Entry<K, V>>) {
    }

    clear():void {
        this.map.clear();
    }

    containsKey(key:K):boolean {
        Error.checkNotNull(key);

        return this.get(key) !== null;
    }

    equals(map:Interfaces.Map<K, V>):boolean {
        return MapHelpers.equals(this, map);
    }

    hashCode(): number {
        Error.notImplemented();
        return null;
    }

    forEach(callback:Interfaces.ForEachMapCallback<K, V>):void {
        Error.checkNotNull(callback);

        this.map.forEach(function (entry) {
            while (entry !== null) {
                callback(entry.value, entry.key);
                entry = entry.next;
            }
        });
    }

    get(key:K):V {
        Error.checkNotNull(key);

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
        return IterableHelpers.isEmpty(this);
    }

    keys():Interfaces.Iterator<K> {
        return new ES6Helpers.Iterator<K>(this.map.values(), (currentEntry) => {
            return currentEntry.key;
        });
    }

    remove(key:K):V {
        Error.checkNotNull(key);

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
        Error.checkNotNull(key);
        Error.checkNotNull(value);

        // Check if the bucket exists
        var hashCode = key.hashCode();
        var entry = this.map.get(hashCode);
        if (!entry) {
            this.keyCount++;

            // Map the hashCode to a new bucket if no bucket exists.
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

    values():Interfaces.Iterator<V> {
        return new ES6Helpers.Iterator<V>(this.map.values(), (currentEntry) => {
            return currentEntry.value;
        });
    }

    __iterator__():Interfaces.Iterator<K> {
        return this.keys();
    }

    private swapEntryValue(entry:ES6Helpers.Entry<K, V>, key:K, value:V) {
        // Swap value
        var oldValue = entry.value;
        entry.value = value;
        return oldValue;
    }

}

export = ES6BaseMap;