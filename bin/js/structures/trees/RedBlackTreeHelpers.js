define(["require", "exports"], function(require, exports) {
    var Node = (function () {
        function Node(key, value, left, right) {
            if (typeof key === "undefined") { key = null; }
            if (typeof value === "undefined") { value = null; }
            if (typeof left === "undefined") { left = null; }
            if (typeof right === "undefined") { right = null; }
            this.key = key;
            this.value = value;
            this.left = left;
            this.right = right;
            this.red = true;
        }
        Node.prototype.getChild = function (right) {
            return right ? this.right : this.left;
        };

        Node.prototype.setChild = function (right, node) {
            if (right) {
                this.right = node;
            } else {
                this.left = node;
            }
        };
        return Node;
    })();
    exports.Node = Node;

    var Iterator = (function () {
        function Iterator(root) {
            this.root = root;
            this.ancestors = [];
        }
        Iterator.prototype.key = function () {
            return this.cursor !== null ? this.cursor.key : null;
        };

        Iterator.prototype.next = function () {
            if (this.cursor === null) {
                var root = this.root;
                if (root !== null) {
                    this.minNode(root);
                }
            } else {
                if (this.cursor.right === null) {
                    var save;
                    do {
                        save = this.cursor;
                        if (this.ancestors.length) {
                            this.cursor = this.ancestors.pop();
                        } else {
                            this.cursor = null;
                            break;
                        }
                    } while(this.cursor.right === save);
                } else {
                    this.ancestors.push(this.cursor);
                    this.minNode(this.cursor.right);
                }
            }

            return { value: this.key(), done: false };
        };

        Iterator.prototype.minNode = function (start) {
            while (start.left !== null) {
                this.ancestors.push(start);
                start = start.left;
            }
            this.cursor = start;
        };
        return Iterator;
    })();
    exports.Iterator = Iterator;
});
