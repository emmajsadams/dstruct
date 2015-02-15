import Interfaces = require("../../Interfaces");

/**
 * Based on the MDN ES6 documentation of the upcoming ES6 Map proposal.
 * Not necessarily complete, only the methods used within the library are part of the interface.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_BaseObjects/Map
 */
export interface Map<K, V> {
  size: number;
  clear(): void;
  delete(key: K): boolean;
  //TODO: entries?
  forEach(callback: Interfaces.IForEachMapCallback<K, V>): void;
  get(key: K): V;
  has(key: K): boolean;
  keys(): Iterator<K>;
  set(key: K, value: V): void;
  values(): Iterator<V>;
}

export interface Entry<K, V> {
  key: K
  value: V;
  next: Entry<K, V>; //TODO: consider using a singly linkedlist?
}

export class Iterator<E> implements Interfaces.IIterator<E> {
  private currentEntry: Entry<any, any>;
  private done = false;

  constructor(private iterator: Interfaces.IIterator<Entry<any, any>>, private valueCallback: (entry: Entry<any, any>) => any) {
  }

  next(): Interfaces.IIteratorReturn<E> {
    // Check if there is an entry to return
    if (this.currentEntry === null || this.currentEntry.next === null) {
      // Get next entry, assign done value and current entry.
      var next = this.iterator.next();
      this.done = next.done;
      this.currentEntry = next.value;
    }

    return {
      value: this.valueCallback(this.currentEntry),

      // Check if there is a current entry, and if this is the last key and return true.
      // Else return false.
      done: !!(this.currentEntry.next === null && this.done)
    };
  }
}