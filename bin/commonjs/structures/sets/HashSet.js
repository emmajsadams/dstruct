var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MapSet = require("./MapSet");
var HashMap = require("../maps/HashMap");

var HashSet = (function (_super) {
    __extends(HashSet, _super);
    function HashSet() {
        _super.call(this, new HashMap());
    }
    return HashSet;
})(MapSet);

module.exports = HashSet;
