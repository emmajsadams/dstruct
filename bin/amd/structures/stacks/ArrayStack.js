var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../lists/ArrayList"], function (require, exports, ArrayList) {
    var ArrayStack = (function (_super) {
        __extends(ArrayStack, _super);
        function ArrayStack() {
            _super.apply(this, arguments);
        }
        ArrayStack.prototype.peek = function () {
            return this.get(this.size() - 1);
        };
        ArrayStack.prototype.pop = function () {
            return this.removeAtIndex(this.size() - 1);
        };
        ArrayStack.prototype.push = function (element) {
            this.add(element);
        };
        return ArrayStack;
    })(ArrayList);
    return ArrayStack;
});
