/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");
import Error = require("../../Error");

interface Table<R, C, V> {
    clear(): void;
    column(columnKey:C): Map<R, V>;
    columnKeys(): Iterator<C>;
    columnMap(): Map<C, Map<R, V>>;
    contains(rowKey:R, columnKey:C): boolean;
    containsColumn(columnKey: C): boolean;
    containsRow(rowKey:R): boolean;
    containsColumn(columnKey:C): boolean;
    //TODO: containsValue
    //TODO: equals()
    get(row:R, column:C): V;
    //TODO: hashCode
    isEmpty(): boolean;
    put(rowKey: R, columnKey: C, value: V): V;
    //putAll
    remove(rowKey: R, columnKey: C): V;
    row(rowKey: R);
    rowKeys(): Iterator<R>;
    rowMap(): Map<R, Map<C, V>>
    size(): number;
    //TODO: values, may contain duplicates
}

// TODO: attempt implementation without two maps.
class MapBasedTable<R, C, V> {

    constructor(private rowMap:Interfaces.Map<R, Map<C, V>>,
                private columnMap: Interfaces.Map<C, Map<R, V>>) {
    }

    clear():void {
        this.rowMap.clear();
        this.columnMap.clear();
    }

    column(columnKey:C);
    columnKeys(): Interfaces.Iterator<C>;
    columnMap(): Interfaces.Map<C, Map<R, V>>;
    contains(rowKey:R, columnKey:C);
    containsColumn(columnKey: C);
    containsRow(rowKey:R);
    containsColumn(columnKey:C);

    //TODO: containsValue
    //TODO: equals()

    get(rowKey:R, columnKey:C):V {
        var row = this.rowMap.get(rowKey);

        return row ? row.get(columnKey) : null;
    }

    //TODO: hashCode

    isEmpty();
    put(rowKey: R, columnKey: C, value: V);
    //putAll
    remove(rowKey: R, columnKey: C): V {
        var row = this.rowMap
    }

    row(rowKey: R);
    rowKeys(): Interfaces.Iterator<R>;
    rowMap(): Interfaces.Map<R, Map<C, V>>




}








































