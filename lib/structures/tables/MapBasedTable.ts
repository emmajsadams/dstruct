/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");
import Error = require("../../Error");

interface Table<R, C, V> {
    clear(): void;
    column(columnKey:C);
    contains(rowKey:R, columnKey:C);
    containsRow(rowKey:R);
    containsColumn(columnKey:C);
    get(row:R, column:C): V;
}

class MapBasedTable<R, C, V> {

    constructor(private map:Interfaces.Map<R, Map<C, V>>) {
    }

    clear():void {

    }

    get(rowKey:R, columnKey:C):V {
        var row = this.map.get(rowKey);

        return row ? row.get(columnKey) : null;
    }
}








































