import Interfaces = require("../../Interfaces");
import Error = require("../../Error");
import IterableHelpers = require("../IterableHelpers");

interface MultiSet<E> {

}

//TODO: Create an interface for MultiSets!
class BaseMultiSet<E extends Interfaces.IBaseObject> {
  constructor(private map: Interfaces.IMap<E, number>) {
  }

  size(): number {
    return this.map.size();
  }

  /**
   * Adds a number of occurrences to this multiset
   * @param element Element to add a number of occurrences of.
   * @param occurrences Number of occurrences to add.
   */
  add(element: E, occurrences: number = 1): number {
    return this.setCount(element, this.count(element) + occurrences);
  }

  /**
   * Returns the number of occurrences of the specified element.
   * @param element Element to retrieve the occurrences of.
   * @returns The number of occurrences of the element in this multiset.
   */
  count(element: E): number {
    var count = this.map.get(element);
    return count ? count : 0;
  }

  has(element: E): boolean {
    return this.count(element) > 0;
  }

  clear(): void {
    this.map.clear();
  }

  hashCode(): number {
    Error.notImplemented();
    return null;
  }

  equals(set: Interfaces.ISet<E>): boolean {
    Error.notImplemented();
    return null;
  }

  remove(element: E, occurrences: number = 1): number {
    return this.setCount(element, this.count(element) - occurrences);
  }

  setCount(element: E, occurrences: number): number {
    Error.checkArgument(occurrences >= 0);

    return occurrences < 0
      ? this.map.remove(element)
      : this.map.set(element, occurrences);
  }

  forEach(callback: Interfaces.IForEachCollectionCallback<E>): void {
    Error.notImplemented();
    //TODO: Use map foreach to repliate collection for each
    //this.map.forEach(callback);
  }

  values(): Interfaces.IIterator<E> {
    return this.map.keys();
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  toArray(): E[] {
    return IterableHelpers.toArray<E>(this);
  }

  __iterator__(): Interfaces.IIterator<E> {
    return this.values();
  }
}

export = BaseMultiSet

