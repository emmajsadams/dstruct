/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");
import Error = require("../../Error");

// TODO: attempt implementation without two maps.
class MapBasedTable<R extends Interfaces.BaseObject, C extends Interfaces.BaseObject, V extends Interfaces.BaseObject> implements Interfaces.Table<R, C, V>{

    constructor(private rows:Interfaces.Map<R, Interfaces.Map<C, V>>,
                private columns:Interfaces.Map<C, Interfaces.Map<R, V>>) {
    }

    clear():void {
        this.rows.clear();
        this.columns.clear();
    }

    column(columnKey:C): Interfaces.Map<R, V> {
        return this.columns.get(columnKey);
    }

    columnKeys(): Interfaces.Iterator<C> {
        return this.columns.keys();
    }

    columnMap(): Interfaces.Map<C, Interfaces.Map<R, V>> {
        return this.columns;
    }

    contains(rowKey:R, columnKey:C): boolean {
        return this.get(rowKey, columnKey) !== null;
    }

    containsColumn(columnKey: C): boolean {
        return this.column(columnKey) !== null;
    }

    containsRow(rowKey:R): boolean {
        return this.row(rowKey) !== null;
    }

    containsValue(value: V): boolean {
        Error.notImplemented();
        return false;
    }

    equals(table: Interfaces.Table<R, C, V>): boolean {
        Error.notImplemented();
        return false;
    }

    get(rowKey:R, columnKey:C):V {
        var row = this.rows.get(rowKey);

        return row ? row.get(columnKey) : null;
    }

    hashCode(): number {
        Error.notImplemented();
        return null;
    }

    isEmpty(): boolean {
        Error.notImplemented();
        return false;
    }

    put(rowKey: R, columnKey: C, value: V): V {
        return null;
    }
    //putAll
    remove(rowKey: R, columnKey: C): V {
        var row = this.rows.get(rowKey);
        if (row) {
            row.remove(columnKey);
        }
        var column = this.columns.get(columnKey);
        if (column) {
            return column.remove(rowKey)
        }

        return null;
    }

    row(rowKey: R): Interfaces.Map<C, V> {
        Error.notImplemented();
        return null;
    }

    rowKeys(): Interfaces.Iterator<R> {
        Error.notImplemented();
        return null;
    }

    rowMap(): Interfaces.Map<R, Interfaces.Map<C, V>> {
        Error.notImplemented();
        return null;
    }

    size(): number {
        Error.notImplemented();
        return null;
    }

    values(): Interfaces.Iterator<V> {
        Error.notImplemented();
        return null;
    }

}








































