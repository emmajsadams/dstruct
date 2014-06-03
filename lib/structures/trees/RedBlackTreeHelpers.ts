/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");
//TODO: interface?!
export class Node<K extends Interfaces.ComparableBaseObject, V extends Interfaces.BaseObject> {
    public red = true;

    constructor(public key:K = null, public value:V = null, public left:Node<K, V> = null, public right:Node<K, V> = null) {
    }

    getChild(right:boolean):Node<K, V> {
        return right ? this.right : this.left;
    }

    // TODO: change to comparator value!
    setChild(right:boolean, node:Node<K,V>) {
        if (right) {
            this.right = node;
        } else {
            this.left = node;
        }
    }
}

// TODO: Ensure comparator is used!
export class Iterator<K extends Interfaces.ComparableBaseObject, V extends Interfaces.BaseObject> implements Interfaces.Iterator<K> {
    // consider protected?
    private ancestors = []; //TODO type
    private cursor:Node<K, V>; //TODO

    // TODO: replace treebase with interface?
    constructor(private root:Node<K, V>) {
    }

    private key():K {
        return this.cursor !== null ? this.cursor.key : null;
    }

    next():Interfaces.IteratorReturn<K> {
        if (this.cursor === null) {
            var root = this.root;
            if (root !== null) {
                this.minNode(root);
            }
        } else {
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

        //TODO: done!
        return { value: this.key(), done: false };
    }

    // TODO: Consider returning the node, and assignign it to curors?
    private minNode(start:Node<K, V>):void {
        while (start.left !== null) {
            this.ancestors.push(start);
            start = start.left;
        }
        this.cursor = start;
    }


}