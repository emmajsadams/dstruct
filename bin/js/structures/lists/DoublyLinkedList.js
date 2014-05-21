define(["require", "exports", "./DoublyLinkedListHelpers", "../../Error", "../IterableHelpers"], function(require, exports, DoublyLinkedListHelpers, Error, IterableHelpers) {
    var DoublyLinkedList = (function () {
        function DoublyLinkedList() {
        }
        DoublyLinkedList.prototype.__iterator__ = function () {
            return new DoublyLinkedListHelpers.Iterator(this.rootNode);
        };

        DoublyLinkedList.prototype.add = function (element) {
            this.addAtIndex(0, element);
            return true;
        };

        DoublyLinkedList.prototype.addAtIndex = function (index, element) {
            Error.checkNotNull(element);
            Error.checkIndex(index, this.size());

            if (index === 0) {
                if (this.size() === 0) {
                    this.rootNode = this.lastNode = new DoublyLinkedListHelpers.Node(element);
                    this.rootNode.next = this.rootNode;
                    this.rootNode.prev = this.rootNode;
                } else if (this.size() === 1) {
                    this.lastNode.next = new DoublyLinkedListHelpers.Node(element);
                    this.rootNode.prev = this.lastNode.next;
                }
            }

            this.count++;
        };

        DoublyLinkedList.prototype.clear = function () {
            this.rootNode = this.lastNode = null;
            this.count = 0;
        };

        DoublyLinkedList.prototype.remove = function (element) {
            Error.checkNotNull(element);

            if (this.size() === 0) {
                return false;
            }

            if (this.rootNode.value.equals(element)) {
                if (this.size() === 1) {
                    this.clear();
                    return true;
                }

                this.rootNode = this.rootNode.next;
                this.rootNode.prev = this.lastNode;
                this.lastNode.prev = this.rootNode;
                this.count--;
                return true;
            } else if (this.lastNode.value.equals(element)) {
                return this.removeLastNode() !== null;
            } else {
                var node = this.getNodeByElement(element);
                if (node) {
                    node.prev.next = node.next;
                    node.next.prev = node.prev;
                    this.count--;
                    return true;
                }
            }

            return false;
        };

        DoublyLinkedList.prototype.removeAtIndex = function (index) {
            Error.checkNotNull(index);
            Error.checkIndex(index, this.size());

            if (this.size() === 1) {
                var element = this.rootNode.value;
                this.clear();
                return element;
            } else if (this.size() - 1 === index) {
                return this.removeLastNode();
            }
        };

        DoublyLinkedList.prototype.equals = function (collection) {
            return IterableHelpers.equals(this, collection);
        };

        DoublyLinkedList.prototype.forEach = function (callback) {
            IterableHelpers.forEach(this, callback);
        };

        DoublyLinkedList.prototype.get = function (index) {
            Error.checkNotNull(index);
            Error.checkIndex(index, this.size());

            return this.getNodeByIndex(index).value;
        };

        DoublyLinkedList.prototype.has = function (element) {
            return this.indexOf(element) >= 0;
        };

        DoublyLinkedList.prototype.indexOf = function (element) {
            Error.checkNotNull(element);

            var i = 0;
            for (var node in this) {
                if (element.equals(node.value)) {
                    return i;
                }
                i++;
            }

            return -1;
        };

        DoublyLinkedList.prototype.set = function (index, element) {
            Error.checkNotNull(element);

            return this.getNodeByIndex(index).value = element;
        };

        DoublyLinkedList.prototype.size = function () {
            return this.count;
        };

        DoublyLinkedList.prototype.toArray = function () {
            var array = [];
            for (var node in this) {
                array.push(node.value);
            }
            return array;
        };

        DoublyLinkedList.prototype.isEmpty = function () {
            return this.size() > 0;
        };

        DoublyLinkedList.prototype.getNodeByElement = function (element) {
            for (var node in this) {
                if (element.equals(node.value)) {
                    return node.value;
                }
            }
            return null;
        };

        DoublyLinkedList.prototype.getNodeByIndex = function (index) {
            var i = 0;
            for (var node in this) {
                if (i === index) {
                    return node;
                }
            }
            return null;
        };

        DoublyLinkedList.prototype.removeLastNode = function () {
            var element = this.rootNode.value;
            this.lastNode = this.lastNode.prev;
            this.lastNode.next = this.rootNode;
            this.rootNode.prev = this.lastNode;
            this.count--;
            return element;
        };
        return DoublyLinkedList;
    })();

    
    return DoublyLinkedList;
});
