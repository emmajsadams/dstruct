var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./MapSet", "../maps/TreeMap"], function (require, exports, MapSet, TreeMap) {
    var TreeSet = (function (_super) {
        __extends(TreeSet, _super);
        function TreeSet() {
            _super.call(this, new TreeMap());
        }
        return TreeSet;
    })(MapSet);
    return TreeSet;
});
