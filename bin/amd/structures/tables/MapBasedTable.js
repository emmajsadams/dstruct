define(["require", "exports", "../../Error"], function (require, exports, Error) {
    var MapBasedTable = (function () {
        function MapBasedTable(rows, columns) {
            this.rows = rows;
            this.columns = columns;
        }
        MapBasedTable.prototype.clear = function () {
            this.rows.clear();
            this.columns.clear();
        };
        MapBasedTable.prototype.column = function (columnKey) {
            return this.columns.get(columnKey);
        };
        MapBasedTable.prototype.columnKeys = function () {
            return this.columns.keys();
        };
        MapBasedTable.prototype.columnMap = function () {
            return this.columns;
        };
        MapBasedTable.prototype.contains = function (rowKey, columnKey) {
            return this.get(rowKey, columnKey) !== null;
        };
        MapBasedTable.prototype.containsColumn = function (columnKey) {
            return this.column(columnKey) !== null;
        };
        MapBasedTable.prototype.containsRow = function (rowKey) {
            return this.row(rowKey) !== null;
        };
        MapBasedTable.prototype.containsValue = function (value) {
            Error.notImplemented();
            return false;
        };
        MapBasedTable.prototype.equals = function (table) {
            Error.notImplemented();
            return false;
        };
        MapBasedTable.prototype.get = function (rowKey, columnKey) {
            var row = this.rows.get(rowKey);
            return row ? row.get(columnKey) : null;
        };
        MapBasedTable.prototype.hashCode = function () {
            Error.notImplemented();
            return null;
        };
        MapBasedTable.prototype.isEmpty = function () {
            Error.notImplemented();
            return false;
        };
        MapBasedTable.prototype.put = function (rowKey, columnKey, value) {
            return null;
        };
        MapBasedTable.prototype.remove = function (rowKey, columnKey) {
            var row = this.rows.get(rowKey);
            if (row) {
                row.remove(columnKey);
            }
            var column = this.columns.get(columnKey);
            if (column) {
                return column.remove(rowKey);
            }
            return null;
        };
        MapBasedTable.prototype.row = function (rowKey) {
            Error.notImplemented();
            return null;
        };
        MapBasedTable.prototype.rowKeys = function () {
            Error.notImplemented();
            return null;
        };
        MapBasedTable.prototype.rowMap = function () {
            Error.notImplemented();
            return null;
        };
        MapBasedTable.prototype.size = function () {
            Error.notImplemented();
            return null;
        };
        MapBasedTable.prototype.values = function () {
            Error.notImplemented();
            return null;
        };
        return MapBasedTable;
    })();
});
