/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");

module dsa.structs {

    export class TreeNode<K extends Interfaces.ComparableBaseObject, V extends Interfaces.BaseObject> {

        constructor(public key:K = null, public value:V = null, public left:RedBlackTreeNode<K, V> = null, public right:RedBlackTreeNode<K, V> = null) {
        }

        getChild(right:boolean):RedBlackTreeNode<K, V> {
            return right ? this.right : this.left;
        }

        // TODO: change to comparator value!
        setChild(right:boolean, node:RedBlackTreeNode<K,V>) {
            if (right) {
                this.right = node;
            } else {
                this.left = node;
            }
        }

    }

}