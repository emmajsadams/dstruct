var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./ES6BaseMap"], function (require, exports, ES6BaseMap) {
    var WeakHashMap = (function (_super) {
        __extends(WeakHashMap, _super);
        function WeakHashMap() {
            _super.call(this, new WeakMap());
        }
        return WeakHashMap;
    })(ES6BaseMap);
    return WeakHashMap;
});
