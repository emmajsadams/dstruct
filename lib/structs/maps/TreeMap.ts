module dsa.structs {

    export class TreeMap<K extends ComparableObject, V extends Object> implements SortedMap<K, V> {

        private tree:Tree<K, V>;

        constructor() {
            this.tree = new RedBlackTree<K, V>();
        }

        clear():void {
            this.tree.clear();
        }

        containsKey(key:K):boolean {
            return this.get(key) !== null;
        }

        equals(map:Map<K, V>):boolean {
            return dsa.structs.mapEquals(this, map);
        }

        forEach(callback:ForEachMapCallback<K, V>):void {
            //TODO:
        }

        get(key:K):V {
            return this.tree.get(key);
        }

        isEmpty():boolean {
            return dsa.structs.iterableIsEmpty(this);
        }

        keys():Iterator<K> {
            //TODO!
            return null;
        }

        remove(key:K):V {
            return this.tree.remove(key);
        }

        set(key:K, value:V):V {
            this.tree.insert(key, value);
            return null; //TODO!
        }

        size():number {
            return this.tree.size();
        }

        values():Iterator<V> {
            //TODO!
            return null;
        }

        // not to be used directly
        __iterator__():Iterator<K> {
            return this.keys();
        }
    }

}