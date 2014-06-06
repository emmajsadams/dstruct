var DoublyLinkedListHelpers = require("./DoublyLinkedListHelpers");
var Error = require("../../Error");
var IterableHelpers = require("../IterableHelpers");

var DoublyLinkedList = (function () {
    function DoublyLinkedList() {
        this.count = 0;
    }
    DoublyLinkedList.prototype.__iterator__ = function () {
        return new DoublyLinkedListHelpers.Iterator(this.rootNode);
    };

    DoublyLinkedList.prototype.add = function (element) {
        this.addAtIndex(this.size(), element);
        return true;
    };

    DoublyLinkedList.prototype.addAtIndex = function (index, element) {
        Error.checkNotNull(element);
        Error.checkIndex(index, this.size());

        if (this.size() === 0) {
            this.rootNode = this.lastNode = new DoublyLinkedListHelpers.Node(element);
        } else if (this.size() === 1) {
            if (index === 0) {
                this.rootNode = new DoublyLinkedListHelpers.Node(element);
                this.rootNode.next = this.lastNode;
                this.lastNode.prev = this.rootNode;
            } else {
                this.lastNode = new DoublyLinkedListHelpers.Node(element);
                this.rootNode.next = this.lastNode;
                this.lastNode.prev = this.rootNode;
            }
        } else if (index === 0) {
            var previousRootNode = this.rootNode;
            this.rootNode = new DoublyLinkedListHelpers.Node(element);

            this.rootNode.next = previousRootNode;
            previousRootNode.prev = this.rootNode;
        } else if (index === this.size()) {
            var previousLastNode = this.lastNode;
            this.lastNode = new DoublyLinkedListHelpers.Node(element);

            this.lastNode.prev = previousLastNode;
            previousLastNode.next = this.lastNode;
        } else {
            var node = this.getNodeByIndex(index);
            var previousNode = node.prev;
            node.prev = new DoublyLinkedListHelpers.Node(element, node, previousNode);
            previousNode.next = node.prev;
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
        } else if (this.size() == 1) {
            return this.removeAtIndex(0) !== null;
        }

        if (this.rootNode.value.equals(element)) {
            return this.removeAtIndex(0) !== null;
        } else if (this.lastNode.value.equals(element)) {
            return this.removeAtIndex(this.size() - 1) !== null;
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
        Error.checkIndex(index, this.size() - 1);

        if (this.size() === 1) {
            var element = this.rootNode.value;
            this.clear();
            return element;
        } else if (index === 0) {
            var element = this.rootNode.value;
            this.rootNode = this.rootNode.next;
            this.count--;
            return element;
        } else if (this.size() - 1 === index) {
            return this.removeLastNode();
        } else {
        }
    };

    DoublyLinkedList.prototype.hashCode = function () {
        Error.notImplemented();
        return null;
    };

    DoublyLinkedList.prototype.equals = function (collection) {
        return IterableHelpers.equals(this, collection);
    };

    DoublyLinkedList.prototype.forEach = function (callback) {
        IterableHelpers.forEach(this, callback);
    };

    DoublyLinkedList.prototype.get = function (index) {
        Error.checkNotNull(index);
        Error.checkIndex(index, this.size() - 1);

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
        return IterableHelpers.toArray(this);
    };

    DoublyLinkedList.prototype.isEmpty = function () {
        return this.size() > 0;
    };

    DoublyLinkedList.prototype.getNodeByElement = function (element) {
        var node = this.rootNode;
        while (node) {
            if (element.equals(node.value)) {
                return node;
            }
            node = node.next;
        }
        return null;
    };

    DoublyLinkedList.prototype.getNodeByIndex = function (index) {
        var node = this.rootNode;
        var i = 0;
        while (node) {
            if (i === index) {
                return node;
            }
            if (i > index) {
                return null;
            }
            node = node.next;
            i++;
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

module.exports = DoublyLinkedList;
