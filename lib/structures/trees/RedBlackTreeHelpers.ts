import Interfaces = require("../../Interfaces");
//TODO: interface?!
export class Node<K extends Interfaces.IComparableBaseObject, V extends Interfaces.IBaseObject> {
  public red = true;

  constructor(public key: K = null, public value: V = null, public left: Node<K, V> = null, public right: Node<K, V> = null) {
  }

  getChild(right: boolean): Node<K, V> {
    return right ? this.right : this.left;
  }

  // TODO: change to comparator value!
  setChild(right: boolean, node: Node<K,V>) {
    if (right) {
      this.right = node;
    } else {
      this.left = node;
    }
  }
}

// TODO: Ensure comparator is used!
// TODO: Properly type
export class Iterator<E extends Interfaces.IBaseObject> implements Interfaces.IIterator<E> {
  // consider protected?
  private ancestors = [];
  private cursor: any; //Node<K, V>;
  private index: number = -1;

  // TODO: replace treebase with interface?
  constructor(private root: any, private size: number, private nodeValue: (node: any) => E) {
  }

  next(): Interfaces.IIteratorReturn<E> {
    this.index++;
    if (!this.cursor) {
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
    return {value: this.nodeValue(this.cursor), done: this.index >= this.size - 1};
  }

  // TODO: Consider returning the node, and assignign it to curors?
  private minNode(start: any): void {
    while (start.left !== null) {
      this.ancestors.push(start);
      start = start.left;
    }
    this.cursor = start;
  }

}