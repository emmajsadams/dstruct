/// <reference path="../References.d.ts"/>

declare module interfaces {


    //TODO: consider using BaseObject.prototype, make the prototype not enumberable
    export interface BaseObject {
        // TODO: hashCode needs to be unique currently, should not! Consider implementing an actual hashMap instead of using the ES6 collections.
        hashCode(): number;
        equals(otherBaseObject: BaseObject);
    }
    export interface Comparable {
        compareTo(otherBaseObject: BaseObject): number;
    }
    //TODO: is this necessary? typesafe generics seems to not be able to implement multiple interfaces
    export interface ComparableBaseObject extends BaseObject, Comparable {
    }
    export interface Number extends ComparableBaseObject {
        hashCode(): number;
        equals(string: Number);
        compareTo(otherString: Number): number;
    }
    export interface String extends BaseObject, Comparable {
        hashCode(): number;
        equals(string: String);
        compareTo(otherString: String): number;
    }

    /*
    TODO: move to new file
    String.prototype.hashCode = function () {
        var hash = 0, i, chr, len;
        if (this.length == 0) return hash;
        for (i = 0, len = this.length; i < len; i++) {
            chr   = this.charCodeAt(i);
            hash  = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
    String.prototype.equals = function (otherString: string): boolean {
        //TODO: test this implementation
        return this.compareTo(otherString) === 0;
    };
    String.prototype.compareTo = function (otherString: String): number {
        return dsa.structs.DefaultComparator(this, otherString);
    };
    */
    //TODO: array

    // Use in for ( element in Iterator ) { .. }
    // throws StopIteration when done
    export interface Iterator<E> {
        next(): IteratorReturn<E>;
    }

    export interface IteratorReturn<E> {
        value: E;
        done: boolean;
    }

    export interface Iterable {
        forEach(callback: (element:any) => void): void;
        size(): number;
        __iterator__(): any;
    }

    export interface ForEachCollectionCallback<E extends BaseObject> {
        (value:E): void;
    }

    export interface Collection<E extends BaseObject> extends Iterable {
        add(element:E): boolean;
        //addAll(collection: Collection<E>);
        clear(): void;
        remove(element:E): boolean;
        //deleteAll(collection: Collection<E>);

        // TODO: should equals be a collection member, or a utility function? leaning towards utility for ease.
        equals(collection: Collection<E>):boolean;
        forEach(callback: ForEachCollectionCallback<E>): void;

        // TODO: mixin or abstract class for shared has logic?
        has(element:E): boolean;
        //hasAll(collection: Collection<E>);

        // TODO: mixin or abstract class for shared isEmpty logic?
        isEmpty(): boolean;

        // Although a readonly property would be better, typescript does not support this for interfaces.
        toArray(): E[];

        // not to be used directly, enables using for (var element:E,
        __iterator__(): Iterator<E>;
    }

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

    // Based on the MDN ES6 documentation of the upcoming ES6 Map proposal.
    // Not necessarily complete, only the methods used within the library are part of the interface.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_BaseObjects/Map
    export interface ES6Map<K, V> {
        size: number;

        clear(): void;
        delete(key:K): boolean;
        //TODO: entries?
        forEach(callback:ForEachMapCallback<K, V>): void;
        get(key:K): V;
        has(key:K): boolean;
        keys(): Iterator<K>;
        set(key:K, value:V): void;
        values(): Iterator<V>;
    }

    export interface Entry<K, V> {
        key: K
        value: V;
        next: Entry<K, V>; //TODO: consider using a singly linkedlist?
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

    export interface SortedMap<K extends ComparableBaseObject, V extends BaseObject> extends Map<K, V> {
    }

    export interface BiMap<K extends BaseObject, V extends BaseObject> extends Map<K ,V> {
        inverse(): BiMap<V, K>
    }

    export interface Set<E extends BaseObject> extends Collection<E>{
        values(): Iterator<E>;
    }

    export interface ES6Set<E extends BaseObject> {
        size: number;

        add(value: E): void;
        clear(): void;
        delete(value:E): boolean;
        //TODO: entries?
        forEach(callback:ForEachCollectionCallback<E>): void;
        has(value:E): boolean;
        //keys(): Iterator<E>;
        values(): Iterator<E>;
    }

    export interface Stack<E extends BaseObject> extends List<E>{
        peek(): E;
        pop(): E;
        push(element: E): void;
    }

    export interface Tree<K extends ComparableBaseObject, V extends BaseObject> extends Iterable {
        clear(): void;

        //TODO: mixin, helper function for shared logic?
        //equals(tree: Tree<E, V>):boolean;
        forEach(callback:ForEachMapCallback<K, V>): void;
        get(key:K): V;

        //TODO: mixin, helper function for shared logic?
        isEmpty(): boolean;
        keys(): Iterator<K>;
        remove(key:K): boolean;

        insert(key:K, value:V): void;
        //values(): Iterator<V>;

    }
}

export = interfaces;