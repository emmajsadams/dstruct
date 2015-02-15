declare module Interfaces {

  /**
   * An object which can be compared for equality and hashed. All objects
   * used with the collections and algorithms must implement this algorithm.
   * Primitive types are modified in "Primitive" to implement this interface.
   */
  export interface IBaseObject {
    hashCode(): number;
    equals(otherBaseObject: IBaseObject);
  }

  /**
   * An object which can be compared with another comparable.
   */
  export interface IComparable {
    compareTo(otherComparable: IComparable): number;
  }

  /**
   * An object which implements BaseObject and Comparable.
   *
   * NOTE: This class is only necessary because TypeScript has problems with
   * multiple interfaces for generic arguments
   */
  export interface IComparableBaseObject extends IBaseObject, IComparable {
  }

  // Use in for ( element in Iterator ) { .. }
  export interface IIterator<E> {
    next(): IIteratorReturn<E>;
  }

  export interface IIteratorReturn<E> {
    value: E;
    done: boolean;
  }

  /**
   * A set of elements that can be iterated over.
   */
  export interface IIterable<E> extends IBaseObject {
    // Todo, fix this typing
    forEach(callback: any): void;
    size(): number;
    __iterator__(): IIterator<E>; // not to be used directly, for es6 spec
  }

  export interface IForEachCollectionCallback<E extends IBaseObject> {
    (value: E): void;
  }

  /**
   * A group of elements. No guarantees of order or allowing duplicates.
   */
  export interface ICollection<E extends IBaseObject> extends IIterable<E> {
    /**
     * Adds a single occurrence of the specified element to this collection
     * @param element Element to add one occurrence of.
     */
    add(element: E): boolean;
    clear(): void;
    // If multiple element, first one is removed.
    remove(element: E): boolean;

    // TODO: should equals be a collection member, or a utility function? leaning towards utility for ease.
    equals(collection: ICollection<E>):boolean;
    forEach(callback: IForEachCollectionCallback<E>): void;

    // TODO: mixin or abstract class for shared has logic?
    has(element: E): boolean;

    // TODO: mixin or abstract class for shared isEmpty logic?
    isEmpty(): boolean;

    // Although a readonly property would be better, typescript does not support this for interfaces.
    toArray(): E[];

    __iterator__(): IIterator<E>;


    // TODO: all methods
    //addAll(collection: Collection<E>);
    //deleteAll(collection: Collection<E>);
    //hasAll(collection: Collection<E>);
  }

  /**
   * An ordered collection of elements. Permits random access, insertion, and deletion.
   * Allows duplicate and null elements.
   */
  export interface IList<E extends IBaseObject> extends ICollection<E> {
    indexOf(element: E): number;
    get(index: number): E;
    set(index: number, Element: E): E;
    addAtIndex(index: number, element: E):void;
    removeAtIndex(index: number): E;
  }

  export interface IForEachMapCallback<K, V> {
    (value: V, key: K): void;
  }

  /**
   * An object that maps keys to values. Duplicate keys are prohibited. Each key
   * must map to one value. Duplicate values are allowed.
   */
  export interface IMap<K extends IBaseObject, V extends IBaseObject> extends IIterable<K> {
    clear(): void;
    containsKey(key: K): boolean;
    equals(map: IMap<K, V>):boolean;
    forEach(callback: IForEachMapCallback<K, V>): void;
    get(key: K): V;
    isEmpty(): boolean;
    keys(): IIterator<K>;
    remove(key: K): V;
    set(key: K, value: V): V;
    values(): IIterator<V>;
    __iterator__(): IIterator<K>;
  }

  /**
   * A sorted version of a Map. Keys are maintained in sorted order. All other
   * Map conditions apply.
   */
  export interface ISortedMap<K extends IComparableBaseObject, V extends IBaseObject> extends IMap<K, V> {
  }

  /**
   * A map that maintains the uniqueness of its values as well as the keys. This
   * allows an inverse view of the map where values are mapped to keys.
   */
  export interface IBiMap<K extends IBaseObject, V extends IBaseObject> extends IMap<K ,V> {
    inverse(): IBiMap<V, K>;
  }

  /**
   * A collection that contains no duplicate elements.
   */
  export interface ISet<E extends IBaseObject> extends ICollection<E> {
    values(): IIterator<E>;
  }

  /**
   * A set which maintains the sorted order of elements.
   */
  export interface ISortedSet<E extends IBaseObject> extends ISet<E> {
  }

  /**
   *
   */
  export interface IStack<E extends IBaseObject> extends ICollection<E> {
    peek(): E;
    pop(): E;
    push(element: E): void;
  }

  export interface IQueue<E extends IBaseObject> extends ICollection<E> {
    peek():E;
    pop():E;
    push(element: E):void;
  }

  // TODO: does this need to extend anything?
  export interface ITable<R extends IBaseObject, C extends IBaseObject, V extends IBaseObject> {
    clear(): void;
    column(columnKey: C): Interfaces.IMap<R, V>;
    columnKeys(): IIterator<C>;
    columnMap(): Interfaces.IMap<C, Interfaces.IMap<R, V>>;
    contains(rowKey: R, columnKey: C): boolean;
    containsColumn(columnKey: C): boolean;
    containsRow(rowKey: R): boolean;
    containsValue(value: V): boolean;
    equals(table: ITable<R, C, V>): boolean;
    get(row: R, column: C): V;
    hashCode(): number;
    isEmpty(): boolean;
    put(rowKey: R, columnKey: C, value: V): V;
    remove(rowKey: R, columnKey: C): V;
    row(rowKey: R);
    rowKeys(): IIterator<R>;
    rowMap(): Interfaces.IMap<R, Interfaces.IMap<C, V>>
    size(): number;
    values(): IIterator<V>;
  }

  export interface ITree<K extends IComparableBaseObject, V extends IBaseObject> extends IIterable<K> {
    clear(): void;
    forEach(callback: IForEachMapCallback<K, V>): void;
    get(key: K): V;
    isEmpty(): boolean;
    keys(): IIterator<K>;
    values(): IIterator<V>;
    remove(key: K): V;
    insert(key: K, value: V): void;

    // TODO: add these
    //values(): Iterator<V>;
    //equals(tree: Tree<E, V>):boolean;
  }

  export interface IGraph<K extends IComparableBaseObject, V extends IBaseObject> extends IIterable<K> {
    add(key: K, value?: V, weight?: number): boolean;
    remove(key: K): boolean;
    isAdjacent(key: K): boolean;
    neighbors(key: K): IList<K>;
  }
}

export = Interfaces;