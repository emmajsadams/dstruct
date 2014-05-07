module dsa.structs {

    export class TreeMap<K extends Object, V extends Object> implements Map<K, V> {
        private tree:RedBlackTree<K, V>;

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
            //return dsa.structs.genericCollectionEquals(this, map);

            //TODO: need a generic map equals!
            return false;
        }

        forEach(callback:forEachMapCallback<K, V>):void {
            //TODO:
        }

        get(key:K):V {
            var node = this.tree.get(key);
            return node ? node.value : null;
        }

        has(element:K):boolean {
            return this.get(element) !== null;
        }

        isEmpty():boolean {
            return this.size() === 0;
        }

        keys():Iterator<K> {
            return null;
        }

        remove(key:K):V {
            return this.tree.remove(key);
        }

        set(key:K, value:V):void {
            this.tree.insert(key, value);
        }

        size():number {
            return this.tree.size();
        }

        values():Iterator<V> {
            return null;
        }

        // not to be used directly
        __iterator__():Iterator<K> {
            return null;
        }
    }

}