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
            if (this.currentNode && this.currentNode !== undefined) {
                var next = {
                    value: this.currentNode.value,
                    done: false
                };
                this.currentNode = this.currentNode.next;
                return next;
            } else {
                return {
                    value: null,
                    done: true
                };
            }
        };
        return Iterator;
    })();
    exports.Iterator = Iterator;
});
