var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ES6BaseMap = require("./ES6BaseMap");

var HashMap = (function (_super) {
    __extends(HashMap, _super);
    function HashMap() {
        _super.call(this, new Map());
    }
    return HashMap;
})(ES6BaseMap);

module.exports = HashMap;
