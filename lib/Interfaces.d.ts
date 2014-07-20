declare module Interfaces {

    /**
     * An object which can be compared for equality and hashed. All objects
     * used with the collections and algorithms must implement this algorithm.
     * Primitive types are modified in "Primitive" to implement this interface.
     */
    export interface BaseObject {
        hashCode(): number;
        equals(otherBaseObject:BaseObject);
    }

    /**
     * An object which can be compared with another comparable.
     */
    export interface Comparable {
        compareTo(otherComparable: Comparable): number;
    }

    /**
     * An object which implements BaseObject and Comparable.
     *
     * NOTE: This class is only necessary because TypeScript has problems with
     * multiple interfaces for generic arguments
     */
    export interface ComparableBaseObject extends BaseObject, Comparable {
    }


    // Use in for ( element in Iterator ) { .. }
    export interface Iterator<E> {
        next(): IteratorReturn<E>;
    }

    export interface IteratorReturn<E> {
        value: E;
        done: boolean;
    }

    /**
     * A set of elements that can be iterated over.
     */
    export interface Iterable<E> extends BaseObject {
        // Todo, fix this typing
        forEach(callback:any): void;
        size(): number;
        __iterator__(): Iterator<E>; // not to be used directly, for es6 spec
    }

    export interface ForEachCollectionCallback<E extends BaseObject> {
        (value:E): void;
    }

    /**
     * A group of elements. No guarantees of order or allowing duplicates.
     */
    export interface Collection<E extends BaseObject> extends Iterable<E> {
        /**
         * Adds a single occurrence of the specified element to this collection
         * @param element Element to add one occurrence of.
         */
        add(element:E): boolean;
        clear(): void;
        // If multiple element, first one is removed.
        remove(element:E): boolean;

        // TODO: should equals be a collection member, or a utility function? leaning towards utility for ease.
        equals(collection:Collection<E>):boolean;
        forEach(callback:ForEachCollectionCallback<E>): void;

        // TODO: mixin or abstract class for shared has logic?
        has(element:E): boolean;

        // TODO: mixin or abstract class for shared isEmpty logic?
        isEmpty(): boolean;

        // Although a readonly property would be better, typescript does not support this for interfaces.
        toArray(): E[];

        __iterator__(): Iterator<E>;


        // TODO: all methods
        //addAll(collection: Collection<E>);
        //deleteAll(collection: Collection<E>);
        //hasAll(collection: Collection<E>);
    }

    /**
     * An ordered collection of elements. Permits random access, insertion, and deletion.
     * Allows duplicate and null elements.
     */
    export interface List<E extends BaseObject> extends Collection<E> {
        indexOf(element:E): number;
        get(index:number): E;
        set(index:number, Element:E): E;
        addAtIndex(index:number, element:E):void;
        removeAtIndex(index:number): E;
    }

    export interface ForEachMapCallback<K, V> {
        (value:V, key:K): void;
    }

    /**
     * An object that maps keys to values. Duplicate keys are prohibited. Each key
     * must map to one value. Duplicate values are allowed.
     */
    export interface Map<K extends BaseObject, V extends BaseObject> extends Iterable<K> {
        clear(): void;
        containsKey(key:K): boolean;
        equals(map:Map<K, V>):boolean;
        forEach(callback:ForEachMapCallback<K, V>): void;
        get(key:K): V;
        isEmpty(): boolean;
        keys(): Iterator<K>;
        remove(key:K): V;
        set(key:K, value:V): V;
        values(): Iterator<V>;
        __iterator__(): Iterator<K>;
    }

    /**
     * A sorted version of a Map. Keys are maintained in sorted order. All other
     * Map conditions apply.
     */
    export interface SortedMap<K extends ComparableBaseObject, V extends BaseObject> extends Map<K, V> {}

    /**
     * A map that maintains the uniqueness of its values as well as the keys. This
     * allows an inverse view of the map where values are mapped to keys.
     */
    export interface BiMap<K extends BaseObject, V extends BaseObject> extends Map<K ,V> {
        inverse(): BiMap<V, K>;
    }

    /**
     * A collection that contains no duplicate elements.
     */
    export interface Set<E extends BaseObject> extends Collection<E> {
        values(): Iterator<E>;
    }

    /**
     * A set which maintains the sorted order of elements.
     */
    export interface SortedSet<E extends BaseObject> extends Set<E> {}

    /**
     *
     */
    export interface Stack<E extends BaseObject> extends Collection<E> {
        peek(): E;
        pop(): E;
        push(element:E): void;
    }

    export interface Queue<E extends BaseObject> extends Collection<E>{
        peek():E;
        pop():E;
        push(element:E):void;
    }

    // TODO: does this need to extend anything?
    export interface Table<R extends BaseObject, C extends BaseObject, V extends BaseObject> {
        clear(): void;
        column(columnKey:C): Interfaces.Map<R, V>;
        columnKeys(): Iterator<C>;
        columnMap(): Interfaces.Map<C, Interfaces.Map<R, V>>;
        contains(rowKey:R, columnKey:C): boolean;
        containsColumn(columnKey: C): boolean;
        containsRow(rowKey:R): boolean;
        containsValue(value: V): boolean;
        equals(table: Table<R, C, V>): boolean;
        get(row:R, column:C): V;
        hashCode(): number;
        isEmpty(): boolean;
        put(rowKey: R, columnKey: C, value: V): V;
        remove(rowKey: R, columnKey: C): V;
        row(rowKey: R);
        rowKeys(): Iterator<R>;
        rowMap(): Interfaces.Map<R, Interfaces.Map<C, V>>
        size(): number;
        values(): Iterator<V>;
    }

    export interface Tree<K extends ComparableBaseObject, V extends BaseObject> extends Iterable<K> {
        clear(): void;
        forEach(callback:ForEachMapCallback<K, V>): void;
        get(key:K): V;
        isEmpty(): boolean;
        keys(): Iterator<K>;
        remove(key:K): boolean;
        insert(key:K, value:V): void;

        // TODO: add these
        //values(): Iterator<V>;
        //equals(tree: Tree<E, V>):boolean;
    }

    export interface Graph<K extends ComparableBaseObject, V extends BaseObject> extends Iterable<K> {
       add(key: K, value?: V, weight?: number): boolean;
       remove(key: K): boolean;
       isAdjacent(key: K): boolean;
       neighbors(key: K): List<K>;
    }
}

export = Interfaces;