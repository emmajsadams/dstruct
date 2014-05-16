define(["require", "exports"], function(require, exports) {
    var Node = (function () {
        function Node(value, prev, next) {
            this.value = value;
            this.prev = prev;
            this.next = next;
        }
        return Node;
    })();
    exports.Node = Node;

    var Iterator = (function () {
        function Iterator(currentNode) {
            this.currentNode = currentNode;
        }
        Iterator.prototype.next = function () {
            var node = this.currentNode;
            this.currentNode = this.currentNode.next;
            return {
                value: this.currentNode.value,
                done: this.currentNode.next === null
            };
        };
        return Iterator;
    })();
    exports.Iterator = Iterator;
});
