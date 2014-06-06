var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "../lists/DoublyLinkedList"], function(require, exports, DoublyLinkedList) {
    var LinkedListQueue = (function (_super) {
        __extends(LinkedListQueue, _super);
        function LinkedListQueue() {
            _super.apply(this, arguments);
        }
        LinkedListQueue.prototype.peek = function () {
            return this.get(0);
        };

        LinkedListQueue.prototype.pop = function () {
            return this.removeAtIndex(0);
        };

        LinkedListQueue.prototype.push = function (element) {
            this.add(element);
        };
        return LinkedListQueue;
    })(DoublyLinkedList);

    
    return LinkedListQueue;
});
