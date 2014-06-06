var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var TreeMap = require("../maps/TreeMap");
var BaseMultiSet = require("./BaseMultiSet");

var TreeMultiSet = (function (_super) {
    __extends(TreeMultiSet, _super);
    function TreeMultiSet() {
        _super.call(this, new TreeMap());
    }
    return TreeMultiSet;
})(BaseMultiSet);

module.exports = TreeMultiSet;
