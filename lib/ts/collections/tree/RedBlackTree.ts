/// <reference path="../../../References.d.ts"/>

module dsa.collections {


    export interface Tree<K, V> {
        clear(): void;

        //TODO: mixin, helper function for shared logic?
        //equals(tree: Tree<K, V>):boolean;
        forEach(callback:forEachMapCallback<K, V>): void;
        get(key:K): V;

        //TODO: mixin, helper function for shared logic?
        isEmpty(): boolean;
        keys(): Iterator<K>;
        remove(key:K): boolean;

        //TODO: insert
        put(key:K, value:V): void;
        size(): number;
        values(): Iterator<V>;

        // not to be used directly
        __iterator__(): Iterator<K>;
    }


    export enum Direction {
        Right,
        Left
    }

    //TODO: interface?!
    //TODO: red is specific to redblack tree, possibly extend it ?
    export class TreeNode<K, V> {

        public red = true;

        constructor(public key:K = null,
                    public value:V = null,
                    public left:TreeNode<K, V> = null,
                    public right:TreeNode<K, V> = null) {
        }

        getChild(right: boolean):TreeNode<K, V> {
            return right ? this.right : this.left;
        }

        // TODO: change to comparator value!
        setChild(right: boolean, node:TreeNode<K,V>) {
            if (right) {
                this.right = node;
            } else {
                this.left = node;
            }
        }

    }

    // Consider rewriting as ES6 iterator
    // TODO: interface?!
    export class TreeBaseIterator<K, V> {
        // consider protected?
        ancestors = []; //TODO type
        cursor:TreeNode<K, V>; //TODO

        // TODO: replace treebase with interface?
        constructor(private tree:RedBlackTree<K, V>) {
        }

        key():K {
            return this.cursor !== null ? this.cursor.key : null;
        }

        next():K {
            if (this.cursor === null) {
                var root = this.tree._root;
                if (root !== null) {
                    this.minNode(root);
                }
            }
            else {
                if (this.cursor.right === null) {
                    // no greater node in subtree, go up to parent
                    // if coming from a right child, continue up the stack
                    var save;
                    do {
                        save = this.cursor;
                        if (this.ancestors.length) {
                            this.cursor = this.ancestors.pop();
                        }
                        else {
                            this.cursor = null;
                            break;
                        }
                    } while (this.cursor.right === save);
                }
                else {
                    // get the next node from the subtree
                    this.ancestors.push(this.cursor);
                    this.minNode(this.cursor.right);
                }
            }

            return this.key();
        }

        prev():K {
            if (this.cursor === null) {
                var root = this.tree._root;
                if (root !== null) {
                    this.maxNode(root);
                }
            }
            else {
                if (this.cursor.left === null) {
                    var save;
                    do {
                        save = this.cursor;
                        if (this.ancestors.length) {
                            this.cursor = this.ancestors.pop();
                        }
                        else {
                            this.cursor = null;
                            break;
                        }
                    } while (this.cursor.left === save);
                }
                else {
                    this.ancestors.push(this.cursor);
                    this.maxNode(this.cursor.left);
                }
            }
            return this.key();
        }

        // TODO: Consider returning the node, and assignign it to curors?
        private minNode(start:TreeNode<K, V>):void {
            while (start.left !== null) {
                this.ancestors.push(start);
                start = start.left;
            }
            this.cursor = start;
        }

        // TODO: Consider returning the node, and assignign it to curors?
        private maxNode(start:TreeNode<K, V>):void {
            while (start.right !== null) {
                this.ancestors.push(start);
                start = start.right;
            }
            this.cursor = start;
        }

    }

    // TODO: this could use a lot of improvements. Look at CLR more and the gnu opensource implementation
    // https://www.opensource.apple.com/source/gcc/gcc-5484/libjava/java/util/TreeMap.java
    // TODO: ensure the insert check to replace the value guarentees uniqueness!
    export class RedBlackTree<K, V>  {
        // Protected
        _size:number;
        _root:TreeNode<K, V> = null;

        constructor(public _comparator:Comparator<K> = DefaultComparator) {
        }

        // inserts a node with the given key and value
        // if a node with the given key exists, the value will be overwritten with the given value
        insert(key:K, value:V) {
            Preconditions.checkNotNull(key);
            Preconditions.checkNotNull(value);

            var returnValue = false;

            if (this._root === null) {
                // empty tree
                this._root = new TreeNode<K, V>(key, value);
                returnValue = true;
                this._size++;
            } else {
                var head = new TreeNode<K, V>(); // fake tree root

                var direction = false;
                var last = false;  //TODO: bad name!

                // setup
                var grandParent: TreeNode<K, V> = null;
                var grandParentParent = head;
                var parent: TreeNode<K, V> = null;
                var node = this._root;
                grandParentParent.right = this._root;

                // search down
                while (true) {
                    if (node === null) {
                        // insert new node at the bottom
                        node = new TreeNode<K, V>(key, value);
                        parent.setChild(direction, node);
                        returnValue = true;
                        this._size++;
                    } else if (this.isRed(node.left) && this.isRed(node.right)) {
                        // color flip
                        node.red = true;
                        node.left.red = false;
                        node.right.red = false;
                    }

                    // fix red violation
                    if (this.isRed(node) && this.isRed(parent)) {
                        //TODO: dir2 is a terrible name, what is this?
                        var dir2 = grandParentParent.right === grandParent;

                        if (node === parent.getChild(last)) {
                            grandParentParent.setChild(dir2, this.singleRotate(!last, grandParent));
                        } else {
                            grandParentParent.setChild(dir2, this.doubleRotate(!last, grandParent));
                        }
                    }

                    var cmp = this._comparator(node.key, key);

                    // stop if found
                    if (cmp === 0) {
                        node.value = value;
                        break;
                    }

                    last = direction;
                    direction = cmp < 0;

                    // update helpers
                    if (grandParent !== null) {
                        grandParentParent = grandParent;
                    }
                    grandParent = parent;
                    parent = node;
                    node = node.getChild(direction);
                }

                // update root
                this._root = head.right;
            }

            // make root black
            this._root.red = false;

            return returnValue;
        }

        remove(key: K) {
            Preconditions.checkNotNull(key);

            if(this._root === null) {
                return false;
            }

            var head = new TreeNode<K, V>(); // fake tree root
            var node = head;
            node.right = this._root;
            var parent: TreeNode<K, V> = null;
            var grandParent: TreeNode<K, V> = null;
            var found: TreeNode<K, V> = null;
            var directionRight = true;

            while(node.getChild(directionRight) !== null) {
                var last = directionRight;

                // update helpers
                grandParent = parent;
                parent = node;
                node = node.getChild(directionRight);

                var cmp = this._comparator(key, node.key);

                directionRight = cmp > 0;

                // save found node
                if(cmp === 0) {
                    found = node;
                }

                // push the red node down
                if(!this.isRed(node) && !this.isRed(node.getChild(directionRight))) {
                    if(this.isRed(node.getChild(!directionRight))) {
                        var sr = this.singleRotate(directionRight, node);
                        parent.setChild(last, sr);
                        parent = sr;
                    }
                    else if(!this.isRed(node.getChild(!directionRight))) {
                        var sibling = parent.getChild(!last);
                        if(sibling !== null) {
                            if(!this.isRed(sibling.getChild(!last)) && !this.isRed(sibling.getChild(last))) {
                                // color flip
                                parent.red = false;
                                sibling.red = true;
                                node.red = true;
                            }
                            else {
                                var dir2 = grandParent.right === parent;

                                if(this.isRed(sibling.getChild(last))) {
                                    grandParent.setChild(dir2, this.doubleRotate(last, parent));
                                }
                                else if(this.isRed(sibling.getChild(!last))) {
                                    grandParent.setChild(dir2, this.singleRotate(last, parent));
                                }

                                // ensure correct coloring
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

            // replace and remove if found
            if(found !== null) {
                found.key = node.key;
                parent.setChild(parent.right === node, node.getChild(node.left === null));
                this._size--;
            }

            // update root and make it black
            this._root = head.right;
            if(this._root !== null) {
                this._root.red = false;
            }

            return found !== null;
        }

        size() {
            return this._size;
        }

        clear():void {
            this._root = null;
            this._size = 0;
        }

        // return null
        get(key:K): TreeNode<K, V> {
            Preconditions.checkNotNull(key);

            var res = this._root;

            while (res !== null) {
                var comparatorValue = this._comparator(key, res.key);
                if (comparatorValue === 0) {
                    return res;
                }
                else {
                    res = res.getChild(comparatorValue > 0);
                }
            }

            return null;
        }

        // returns iterator to node if found, null otherwise
        /*
         findIterator(key:K): TreeBaseIterator<K, V> {
         var res = this._root;
         var iter = this.iterator();

         while (res !== null) {
         var comparatorValue = this._comparator(key, res.key);
         if (comparatorValue === 0) {
         iter.cursor = res;
         return iter;
         }
         else {
         iter.ancestors.push(res);
         res = res.getChild(comparatorValue > 0);
         }
         }

         return null;
         }
         */

        // Returns an interator to the tree node at or immediately after the item
        lowerBound(key:K):TreeBaseIterator<K, V> {
            Preconditions.checkNotNull(key);

            var cursor = this._root;
            var iterator = this.iterator();

            while (cursor !== null) {
                var comparatorValue = this._comparator(key, cursor.key);
                if (comparatorValue === 0) {
                    iterator.cursor = cursor;
                    return iterator;
                }
                iterator.ancestors.push(cursor);
                cursor = cursor.getChild(comparatorValue > 0);

            }

            for (var i = iterator.ancestors.length - 1; i >= 0; --i) {
                cursor = iterator.ancestors[i];
                if (this._comparator(key, cursor.key) < 0) {
                    iterator.cursor = cursor;
                    iterator.ancestors.length = i;
                    return iterator;
                }
            }

            iterator.ancestors.length = 0;
            return iterator;
        }

        // Returns an interator to the tree node immediately after the item
        upperBound(key:K):TreeBaseIterator<K, V> {
            Preconditions.checkNotNull(key);

            var iter = this.lowerBound(key);

            while (this._comparator(iter.key(), key) === 0) {
                iter.next();
            }

            return iter;
        }

        // returns null if tree is empty
        min(): TreeNode<K, V> {
            var res = this._root;

            if (res === null) {
                return null;
            }

            while (res.left !== null) {
                res = res.left;
            }

            return res;
        }

        // returns null if tree is empty
        max(): TreeNode<K, V> {
            var res = this._root;
            if (res === null) {
                return null;
            }

            while (res.right !== null) {
                res = res.right;
            }

            return res;
        }

        // calls cb on each node's data, in order
        // TODO: Type
        each(callback:any):void {
            Preconditions.checkNotNull(callback);

            var it = this.iterator(), data;

            while ((data = it.next()) !== null) {
                callback(data);
            }
        }

        // calls cb on each node's data, in reverse order
        reach(callback: any): void {
            var it=this.iterator(), data;
            while((data = it.prev()) !== null) {
                callback(data);
            }
        }

        // returns a null iterator
        // call next() or prev() to point to an element
        iterator():TreeBaseIterator<K, V> {
            return new TreeBaseIterator<K, V>(this);
        }

        private isRed(node:TreeNode<K, V>):boolean {
            return node !== null && node.red;
        }

        //TODO dir?
        private doubleRotate(right:boolean, root:TreeNode<K, V>): TreeNode<K, V> {
            root.setChild(!right, this.singleRotate(!right, root.getChild(!right)));
            return this.singleRotate(right, root);
        }

        private singleRotate(right:boolean, root:TreeNode<K, V>): TreeNode<K, V> {
            var save = root.getChild(!right);

            root.setChild(!right, save.getChild(right));
            save.setChild(right, root);

            root.red = true;
            save.red = false;

            return save;
        }



    }

}