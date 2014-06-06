var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var HashMap = require("../maps/HashMap");
var BaseMultiSet = require("./BaseMultiSet");

var HashMultiSet = (function (_super) {
    __extends(HashMultiSet, _super);
    function HashMultiSet() {
        _super.call(this, new HashMap());
    }
    return HashMultiSet;
})(BaseMultiSet);

module.exports = HashMultiSet;
