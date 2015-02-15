import Interfaces = require("../../Interfaces");
import Error = require("../../Error");
import MapHelpers = require("./MapHelpers");
import RedBlackTree = require("../trees/RedBlackTree");
import IterableHelpers = require("../IterableHelpers");

class TreeMap<K extends Interfaces.IComparableBaseObject, V extends Interfaces.IBaseObject> implements Interfaces.ISortedMap<K, V> {

  private tree: Interfaces.ITree<K, V>;

  constructor() {
    this.tree = new RedBlackTree<K, V>();
  }

  clear(): void {
    this.tree.clear();
  }

  containsKey(key: K): boolean {
    return this.get(key) !== null;
  }

  hashCode(): number {
    Error.notImplemented();
    return null;
  }

  equals(map: Interfaces.IMap<K, V>): boolean {
    return MapHelpers.equals(this, map);
  }

  forEach(callback: Interfaces.IForEachMapCallback<K, V>): void {
    this.tree.forEach(callback);
  }

  get(key: K): V {
    return this.tree.get(key);
  }

  isEmpty(): boolean {
    return IterableHelpers.isEmpty(this);
  }

  keys(): Interfaces.IIterator<K> {
    return this.tree.keys();
  }

  remove(key: K): V {
    return this.tree.remove(key);
  }

  set(key: K, value: V): V {
    this.tree.insert(key, value);
    return null; //TODO!
  }

  size(): number {
    return this.tree.size();
  }

  values(): Interfaces.IIterator<V> {
    return this.tree.values();
  }

  // not to be used directly
  __iterator__(): Interfaces.IIterator<K> {
    return this.keys();
  }
}

export = TreeMap;