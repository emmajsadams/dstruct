module dsa.structs {

    export class TreeMap<K, V> implements Map<K, V> {
        private tree: RedBlackTree<K, V>;

        constructor(comparator:Comparator<K> = DefaultComparator) {
            this.tree = new RedBlackTree<K, V>(comparator);
        }

        clear(): void {
            this.tree.clear();
        }

        containsKey(key:K): boolean {
            return this.get(key) !== null;
        }

        equals(map: Map<K, V>):boolean {
            //TODO!
            return false;
        }

        forEach(callback:forEachMapCallback<K, V>): void {

        }

        get(key:K): V {
           var node = this.tree.get(key);
           return node ? node.value : null;
        }

        isEmpty(): boolean {
            return this.size() === 0;
        }

        keys(): Iterator<K> {
            return null;
        }

        remove(key:K): boolean {
            return this.tree.remove(key);
        }

        set(key:K, value:V): void {
            this.tree.insert(key, value);
        }

        size(): number {
            return this.tree.size();
        }

        values(): Iterator<V> {
            return null;
        }

        // not to be used directly
        __iterator__(): Iterator<K> {
            return null;
        }
    }

}