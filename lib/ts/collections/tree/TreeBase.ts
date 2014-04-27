module dsa.collections {

    export enum Direction {
        Right,
        Left
    }


    export class Node<K, V> {

        constructor(public key:K, public value?:V, public left?:Node<K, V>, public right?:Node<K, V>) {}

        getChild(comparatorValue: number): Node<K, V> {
            if (comparatorValue === 0) {
                return this;
            }

            return comparatorValue > 0 ? this.right : this.left;
        }

        setChild(direction:Direction, node:Node<K,V>) {
            if (direction === Direction.Right) {
                this.right = node;
            } else {
                this.left = node;
            }
        }

    }

    class TreeBaseIterator {
        private ancestors = []; //TODO type
        private cursor = null; //TODO

        // TODO: replace treebase with interface?
        constructor(private tree: TreeBase) {

        }
    }

    function Iterator(tree) {
        this._tree = tree;
        this._ancestors = [];
        this._cursor = null;
    }

    Iterator.prototype.data = function() {
        return this._cursor !== null ? this._cursor.data : null;
    };

    // if null-iterator, returns first node
    // otherwise, returns next node
    Iterator.prototype.next = function() {
        if(this._cursor === null) {
            var root = this._tree._root;
            if(root !== null) {
                this._minNode(root);
            }
        }
        else {
            if(this._cursor.right === null) {
                // no greater node in subtree, go up to parent
                // if coming from a right child, continue up the stack
                var save;
                do {
                    save = this._cursor;
                    if(this._ancestors.length) {
                        this._cursor = this._ancestors.pop();
                    }
                    else {
                        this._cursor = null;
                        break;
                    }
                } while(this._cursor.right === save);
            }
            else {
                // get the next node from the subtree
                this._ancestors.push(this._cursor);
                this._minNode(this._cursor.right);
            }
        }
        return this._cursor !== null ? this._cursor.data : null;
    };

    // if null-iterator, returns last node
    // otherwise, returns previous node
    Iterator.prototype.prev = function() {
        if(this._cursor === null) {
            var root = this._tree._root;
            if(root !== null) {
                this._maxNode(root);
            }
        }
        else {
            if(this._cursor.left === null) {
                var save;
                do {
                    save = this._cursor;
                    if(this._ancestors.length) {
                        this._cursor = this._ancestors.pop();
                    }
                    else {
                        this._cursor = null;
                        break;
                    }
                } while(this._cursor.left === save);
            }
            else {
                this._ancestors.push(this._cursor);
                this._maxNode(this._cursor.left);
            }
        }
        return this._cursor !== null ? this._cursor.data : null;
    };

    Iterator.prototype._minNode = function(start) {
        while(start.left !== null) {
            this._ancestors.push(start);
            start = start.left;
        }
        this._cursor = start;
    };

    Iterator.prototype._maxNode = function(start) {
        while(start.right !== null) {
            this._ancestors.push(start);
            start = start.right;
        }
        this._cursor = start;
    };

    module.exports = TreeBase;
}

    export class TreeBase<K, V> {
        size: number;

        // Protected?
        _root: Node<K, V>;

        constructor(private comparator:Comparator<E> = DefaultComparator) {
        }

        clear(): void {
            this._root = null;
            this.size = 0;
        }

        find(key: K): Node<K, V> {
            var res = this._root;

            while(res !== null) {
                var c = this.comparator(data, res.data);
                if(c === 0) {
                    return res.data;
                }
                else {
                    res = res.get_child(c > 0);
                }
            }

            return null;
        }

        // returns iterator to node if found, null otherwise
        findIterator(key: K): null {
            var res = this._root;
            var iter = this.iterator();

            while(res !== null) {
                var c = this._comparator(data, res.data);
                if(c === 0) {
                    iter._cursor = res;
                    return iter;
                }
                else {
                    iter._ancestors.push(res);
                    res = res.get_child(c > 0);
                }
            }

            return null;
        };

    }

    // public _ is protected!
    /*
     export class TreeBase {
     public _root;
     public size: number;





     // Returns an interator to the tree node at or immediately after the item
     TreeBase.prototype.lowerBound = function(item) {
     var cur = this._root;
     var iter = this.iterator();
     var cmp = this._comparator;

     while(cur !== null) {
     var c = cmp(item, cur.data);
     if(c === 0) {
     iter._cursor = cur;
     return iter;
     }
     iter._ancestors.push(cur);
     cur = cur.get_child(c > 0);
     }

     for(var i=iter._ancestors.length - 1; i >= 0; --i) {
     cur = iter._ancestors[i];
     if(cmp(item, cur.data) < 0) {
     iter._cursor = cur;
     iter._ancestors.length = i;
     return iter;
     }
     }

     iter._ancestors.length = 0;
     return iter;
     };

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

     // returns a null iterator
     // call next() or prev() to point to an element
     TreeBase.prototype.iterator = function() {
     return new Iterator(this);
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