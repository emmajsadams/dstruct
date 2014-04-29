/// <reference path="../../../References.d.ts"/>

module dsa.structs {

    export class TreeNode<K, V> {

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