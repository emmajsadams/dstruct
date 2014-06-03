define(["require", "exports", "./RedBlackTreeHelpers", "../../Error"], function(require, exports, RedBlackTreeHelpers, Error) {
    var RedBlackTree = (function () {
        function RedBlackTree() {
            this.nodeCount = 0;
            this.root = null;
        }
        RedBlackTree.prototype.equals = function () {
            Error.notImplemented();
            return null;
        };

        RedBlackTree.prototype.hashCode = function () {
            Error.notImplemented();
            return null;
        };

        RedBlackTree.prototype.insert = function (key, value) {
            Error.checkNotNull(key);
            Error.checkNotNull(value);

            var returnValue = false;

            if (this.root === null) {
                this.root = new RedBlackTreeHelpers.Node(key, value);
                returnValue = true;
                this.nodeCount++;
            } else {
                var head = new RedBlackTreeHelpers.Node();

                var direction = false;
                var last = false;

                var grandParent = null;
                var grandParentParent = head;
                var parent = null;
                var node = this.root;
                grandParentParent.right = this.root;

                while (true) {
                    if (node === null) {
                        node = new RedBlackTreeHelpers.Node(key, value);
                        parent.setChild(direction, node);
                        returnValue = true;
                        this.nodeCount++;
                    } else if (this.isRed(node.left) && this.isRed(node.right)) {
                        node.red = true;
                        node.left.red = false;
                        node.right.red = false;
                    }

                    if (this.isRed(node) && this.isRed(parent)) {
                        var dir2 = grandParentParent.right === grandParent;

                        if (node === parent.getChild(last)) {
                            grandParentParent.setChild(dir2, this.singleRotate(!last, grandParent));
                        } else {
                            grandParentParent.setChild(dir2, this.doubleRotate(!last, grandParent));
                        }
                    }

                    var cmp = node.key.compareTo(key);

                    if (cmp === 0) {
                        node.value = value;
                        break;
                    }

                    last = direction;
                    direction = cmp < 0;

                    if (grandParent !== null) {
                        grandParentParent = grandParent;
                    }
                    grandParent = parent;
                    parent = node;
                    node = node.getChild(direction);
                }

                this.root = head.right;
            }

            this.root.red = false;

            return returnValue;
        };

        RedBlackTree.prototype.remove = function (key) {
            Error.checkNotNull(key);

            if (this.root === null) {
                return false;
            }

            var head = new RedBlackTreeHelpers.Node();
            var node = head;
            node.right = this.root;
            var parent = null;
            var grandParent = null;
            var found = null;
            var directionRight = true;

            while (node.getChild(directionRight) !== null) {
                var last = directionRight;

                grandParent = parent;
                parent = node;
                node = node.getChild(directionRight);

                var cmp = key.compareTo(node.key);

                directionRight = cmp > 0;

                if (cmp === 0) {
                    found = node;
                }

                if (!this.isRed(node) && !this.isRed(node.getChild(directionRight))) {
                    if (this.isRed(node.getChild(!directionRight))) {
                        var sr = this.singleRotate(directionRight, node);
                        parent.setChild(last, sr);
                        parent = sr;
                    } else if (!this.isRed(node.getChild(!directionRight))) {
                        var sibling = parent.getChild(!last);
                        if (sibling !== null) {
                            if (!this.isRed(sibling.getChild(!last)) && !this.isRed(sibling.getChild(last))) {
                                parent.red = false;
                                sibling.red = true;
                                node.red = true;
                            } else {
                                var dir2 = grandParent.right === parent;

                                if (this.isRed(sibling.getChild(last))) {
                                    grandParent.setChild(dir2, this.doubleRotate(last, parent));
                                } else if (this.isRed(sibling.getChild(!last))) {
                                    grandParent.setChild(dir2, this.singleRotate(last, parent));
                                }

                                var gpc = grandParent.getChild(dir2);
                                gpc.red = true;
                                node.red = true;
                                gpc.left.red = false;
                                gpc.right.red = false;
                            }
                        }
                    }
                }
            }

            if (found !== null) {
                found.key = node.key;
                parent.setChild(parent.right === node, node.getChild(node.left === null));
                this.nodeCount--;
            }

            this.root = head.right;
            if (this.root !== null) {
                this.root.red = false;
            }

            return found !== null;
        };

        RedBlackTree.prototype.size = function () {
            return this.nodeCount;
        };

        RedBlackTree.prototype.isEmpty = function () {
            return this.size() === 0;
        };

        RedBlackTree.prototype.keys = function () {
            return new RedBlackTreeHelpers.Iterator(this.root);
        };

        RedBlackTree.prototype.clear = function () {
            this.root = null;
            this.nodeCount = 0;
        };

        RedBlackTree.prototype.get = function (key) {
            Error.checkNotNull(key);

            var res = this.root;
            while (res !== null) {
                var comparatorValue = key.compareTo(res.key);
                if (comparatorValue === 0) {
                    return res.value;
                } else {
                    res = res.getChild(comparatorValue > 0);
                }
            }

            return null;
        };

        RedBlackTree.prototype.forEach = function (callback) {
        };

        RedBlackTree.prototype.__iterator__ = function () {
            return new RedBlackTreeHelpers.Iterator(this.root);
        };

        RedBlackTree.prototype.isRed = function (node) {
            return node !== null && node.red;
        };

        RedBlackTree.prototype.doubleRotate = function (right, root) {
            root.setChild(!right, this.singleRotate(!right, root.getChild(!right)));
            return this.singleRotate(right, root);
        };

        RedBlackTree.prototype.singleRotate = function (right, root) {
            var save = root.getChild(!right);

            root.setChild(!right, save.getChild(right));
            save.setChild(right, root);

            root.red = true;
            save.red = false;

            return save;
        };
        return RedBlackTree;
    })();

    
    return RedBlackTree;
});
