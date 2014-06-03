/// <reference path="../References.d.ts"/>

declare module Interfaces {

    //TODO: consider using BaseObject.prototype, make the prototype not enumberable
    export interface BaseObject {
        // TODO: hashCode needs to be unique currently, should not! Consider implementing an actual hashMap instead of using the ES6 collections.
        hashCode(): number;
        equals(otherBaseObject:BaseObject);
    }

    export interface Comparable {
        compareTo(otherBaseObject:BaseObject): number;
    }
    //TODO: is this necessary? typesafe generics seems to not be able to implement multiple interfaces
    export interface ComparableBaseObject extends BaseObject, Comparable {
    }


    // Use in for ( element in Iterator ) { .. }
    // throws StopIteration when done
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
    export interface Iterable extends BaseObject {
        forEach(callback:(element:any) => void): void;
        size(): number;
        __iterator__(): any;
    }

    export interface ForEachCollectionCallback<E extends BaseObject> {
        (value:E): void;
    }

    /**
     * A group of elements. No guarantees of order or allowing duplicates.
     */
    export interface Collection<E extends BaseObject> extends Iterable {
        /**
         * Adds a single occurrence of the specified element to this collection
         * @param element Element to add one occurrence of.
         */
        add(element:E): boolean;
        clear(): void;
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

        // not to be used directly, enables using for (var element:E,
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

    export interface Map<K extends BaseObject, V extends BaseObject> extends Iterable {
        clear(): void;

        //TODO: mixin, helper function for shared logic?
        containsKey(key:K): boolean;
        equals(map:Map<K, V>):boolean;
        forEach(callback:ForEachMapCallback<K, V>): void;
        get(key:K): V;

        //TODO: mixin, helper function for shared logic?
        isEmpty(): boolean;
        keys(): Iterator<K>;
        remove(key:K): V;
        set(key:K, value:V): V;
        values(): Iterator<V>;

        // TODO: ensure current standard matches this interface.
        __iterator__(): Iterator<K>;
    }

    export interface SortedMap<K extends ComparableBaseObject, V extends BaseObject> extends Map<K, V> {}

    export interface BiMap<K extends BaseObject, V extends BaseObject> extends Map<K ,V> {
        inverse(): BiMap<V, K>;
    }

    export interface Set<E extends BaseObject> extends Collection<E> {
        values(): Iterator<E>;
    }

    export interface SortedSet<E extends BaseObject> extends Set<E> {}

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

    export interface Tree<K extends ComparableBaseObject, V extends BaseObject> extends Iterable {
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
}

export = Interfaces;