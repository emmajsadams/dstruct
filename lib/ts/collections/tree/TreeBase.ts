module dsa.collections {

    export enum Direction {
        Right,
        Left
    }


    export class TreeBaseNode<K, V> {

        constructor(public key:K, public value?:V, public left?:TreeBaseNode<K, V>, public right?:TreeBaseNode<K, V>) {}

        getChild(comparatorValue: number): TreeBaseNode<K, V> {
            if (comparatorValue === 0) {
                return this;
            }

            return comparatorValue > 0 ? this.right : this.left;
        }

        // TODO: change to comparator value!
        setChild(direction:Direction, node:TreeBaseNode<K,V>) {
            if (direction === Direction.Right) {
                this.right = node;
            } else {
                this.left = node;
            }
        }

    }

    // Consider rewriting as ES6 iterator
    export class TreeBaseIterator<K, V> {
        // consider protected?
        ancestors = []; //TODO type
        cursor: TreeBaseNode<K, V>; //TODO

        // TODO: replace treebase with interface?
        constructor(private tree: TreeBase<K, V>) {}

        key(): K {
            return this.cursor !== null ? this.cursor.key : null;
        }

        next(): K {
            if(this.cursor === null) {
                var root = this.tree._root;
                if(root !== null) {
                    this.minNode(root);
                }
            }
            else {
                if(this.cursor.right === null) {
                    // no greater node in subtree, go up to parent
                    // if coming from a right child, continue up the stack
                    var save;
                    do {
                        save = this.cursor;
                        if(this.ancestors.length) {
                            this.cursor = this.ancestors.pop();
                        }
                        else {
                            this.cursor = null;
                            break;
                        }
                    } while(this.cursor.right === save);
                }
                else {
                    // get the next node from the subtree
                    this.ancestors.push(this.cursor);
                    this.minNode(this.cursor.right);
                }
            }

            return this.key();
        }

        prev(): K {
            if(this.cursor === null) {
                var root = this.tree._root;
                if(root !== null) {
                    this.maxNode(root);
                }
            }
            else {
                if(this.cursor.left === null) {
                    var save;
                    do {
                        save = this.cursor;
                        if(this.ancestors.length) {
                            this.cursor = this.ancestors.pop();
                        }
                        else {
                            this.cursor = null;
                            break;
                        }
                    } while(this.cursor.left === save);
                }
                else {
                    this.ancestors.push(this.cursor);
                    this.maxNode(this.cursor.left);
                }
            }
            return this.key();
        }

        // TODO: Consider returning the node, and assignign it to curors?
        private minNode(start: TreeBaseNode<K, V>): void {
            while(start.left !== null) {
                this.ancestors.push(start);
                start = start.left;
            }
            this.cursor = start;
        }

        // TODO: Consider returning the node, and assignign it to curors?
        private maxNode(start: TreeBaseNode<K, V>): void {
            while(start.right !== null) {
                this.ancestors.push(start);
                start = start.right;
            }
            this.cursor = start;
        }

    }

    export class TreeBase<K, V> {
        size: number;

        // Protected?
        _root: TreeBaseNode<K, V>;

        constructor(private comparator:Comparator<K> = DefaultComparator) {
        }

        clear(): void {
            this._root = null;
            this.size = 0;
        }

        find(key: K): K {
            var res = this._root;

            while(res !== null) {
                var comparatorValue = this.comparator(key, res.key);
                if(comparatorValue === 0) {
                    return res.key;
                }
                else {
                    res = res.getChild(comparatorValue);
                }
            }

            return null;
        }

        // returns iterator to node if found, null otherwise
        findIterator(key: K): TreeBaseIterator<K, V> {
            var res = this._root;
            var iter = this.iterator();

            while(res !== null) {
                var comparatorValue = this.comparator(key, res.key);
                if(comparatorValue === 0) {
                    iter.cursor = res;
                    return iter;
                }
                else {
                    iter.ancestors.push(res);
                    res = res.getChild(comparatorValue);
                }
            }

            return null;
        }

        // Returns an interator to the tree node at or immediately after the item
        lowerBound(key: K) {
            var cursor = this._root;
            var iterator = this.iterator();

            while(cursor !== null) {
                var comparatorValue = this.comparator(key, cursor.key);
                if(comparatorValue === 0) {
                    iterator.cursor = cursor;
                    return iterator;
                }
                iterator.ancestors.push(cursor);
                cursor = cursor.getChild(comparatorValue);

            }

            for(var i=iterator.ancestors.length - 1; i >= 0; --i) {
                cursor = iterator.ancestors[i];
                if (this.comparator(key, cursor.key) < 0) {
                    iterator.cursor = cursor;
                    iterator.ancestors.length = i;
                    return iterator;
                }
            }

            iterator.ancestors.length = 0;
            return iterator;
        }

        // returns a null iterator
        // call next() or prev() to point to an element
        iterator(): TreeBaseIterator<K, V> {
            return new TreeBaseIterator<K, V>(this);
        }

    }

    /*

     // Returns an interator to the tree node immediately after the item
     TreeBase.prototype.upperBound = function(item) {
     var iter = this.lowerBound(item);
     var cmp = this._comparator;

     while(cmp(iter.data(), item) === 0) {
     iter.next();
     }

     return iter;
     };

     // returns null if tree is empty
     TreeBase.prototype.min = function() {
     var res = this._root;
     if(res === null) {
     return null;
     }

     while(res.left !== null) {
     res = res.left;
     }

     return res.data;
     };

     // returns null if tree is empty
     TreeBase.prototype.max = function() {
     var res = this._root;
     if(res === null) {
     return null;
     }

     while(res.right !== null) {
     res = res.right;
     }

     return res.data;
     };


     TreeBase.prototype.iterator = function() {

     };

     // calls cb on each node's data, in order
     TreeBase.prototype.each = function(cb) {
     var it=this.iterator(), data;
     while((data = it.next()) !== null) {
     cb(data);
     }
     };

     // calls cb on each node's data, in reverse order
     TreeBase.prototype.reach = function(cb) {
     var it=this.iterator(), data;
     while((data = it.prev()) !== null) {
     cb(data);
     }
     };



     */
}