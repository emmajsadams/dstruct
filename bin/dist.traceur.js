var dsa;
(function(dsa) {
  (function(structs) {
    var TreeNode = (function() {
      function TreeNode(key, value, left, right) {
        if (typeof key === "undefined") {
          key = null;
        }
        if (typeof value === "undefined") {
          value = null;
        }
        if (typeof left === "undefined") {
          left = null;
        }
        if (typeof right === "undefined") {
          right = null;
        }
        this.key = key;
        this.value = value;
        this.left = left;
        this.right = right;
      }
      TreeNode.prototype.getChild = function(right) {
        return right ? this.right: this.left;
      };
      TreeNode.prototype.setChild = function(right, node) {
        if (right) {
          this.right = node;
        } else {
          this.left = node;
        }
      };
      return TreeNode;
    })();
    structs.TreeNode = TreeNode;
  })(dsa.structs || (dsa.structs = {}));
  var structs = dsa.structs;
})(dsa || (dsa = {}));
var dsa;
(function(dsa) {
  (function(util) {
    function clearArray(array) {
      while (array.length > 0) {
        array.pop();
      }
    }
    util.clearArray = clearArray;
  })(dsa.util || (dsa.util = {}));
  var util = dsa.util;
})(dsa || (dsa = {}));
var dsa;
(function(dsa) {
  (function(structs) {
    structs.DefaultComparator = function(item1, item2) {
      if (item1 === item2) {
        return 0;
      } else if (!item1 || item1 < item2) {
        return - 1;
      } else if (!item2 || item1 > item2) {
        return 1;
      } else {}
    };
  })(dsa.structs || (dsa.structs = {}));
  var structs = dsa.structs;
})(dsa || (dsa = {}));
var dsa;
(function(dsa) {
  (function(structs) {
    function genericForEach(iterable, callback) {
      dsa.error.checkNotNull(iterable);
      dsa.error.checkNotNull(callback);
      for (var element in iterable) {
        callback(element);
      }
    }
    structs.genericForEach = genericForEach;
    function genericCollectionEquals(collection, otherCollection, comparator) {
      if (typeof comparator === "undefined") {
        comparator = dsa.structs.DefaultComparator;
      }
      dsa.error.checkNotNull(collection);
      dsa.error.checkNotNull(otherCollection);
      if (collection.size() !== otherCollection.size()) {
        return false;
      }
      if (collection.size() === otherCollection.size() && collection.size() === 0) {
        return true;
      }
      var collectionIterator = collection.__iterator__();
      var otherCollectionIterator = otherCollection.__iterator__();
      var index = 0;
      while (index < collection.size()) {
        if (comparator(collectionIterator.next(), otherCollectionIterator.next()) !== 0) {
          return false;
        }
        index++;
      }
      return true;
    }
    structs.genericCollectionEquals = genericCollectionEquals;
    function genericIsEmpty(iterable) {
      return iterable.size() === 0;
    }
    structs.genericIsEmpty = genericIsEmpty;
  })(dsa.structs || (dsa.structs = {}));
  var structs = dsa.structs;
})(dsa || (dsa = {}));
var dsa;
(function(dsa) {
  (function(structs) {
    var ArrayListIterator = (function() {
      function ArrayListIterator(array) {
        this.array = array;
        this.index = 0;
      }
      ArrayListIterator.prototype.next = function() {
        if (this.index >= this.array.length) {
          throw StopIteration;
        }
        var element = $traceurRuntime.elementGet(this.array, this.index);
        this.index++;
        return element;
      };
      return ArrayListIterator;
    })();
    var ArrayList = (function() {
      function ArrayList(comparator, initialCapacity) {
        if (typeof comparator === "undefined") {
          comparator = dsa.structs.DefaultComparator;
        }
        this.comparator = comparator;
        this.array = new Array(initialCapacity || 0);
      }
      ArrayList.prototype.__iterator__ = function() {
        return new ArrayListIterator(this.array);
      };
      ArrayList.prototype.add = function(element) {
        this.addAtIndex(0, element);
        return true;
      };
      ArrayList.prototype.addAtIndex = function(index, element) {
        dsa.error.checkNotNull(element);
        this.array.splice(index, 0, element);
      };
      ArrayList.prototype.clear = function() {
        dsa.util.clearArray(this.array);
      };
      ArrayList.prototype.removeAtIndex = function(index) {
        dsa.error.checkNotNull(index);
        dsa.error.checkIndex(index, this.size());
        var element = this.get(index);
        this.array.splice(index, 1);
        return element;
      };
      ArrayList.prototype.remove = function(element) {
        dsa.error.checkNotNull(element);
        var index = this.indexOf(element);
        if (index >= 0) {
          this.array.splice(index, 1);
          return true;
        } else {
          return false;
        }
      };
      ArrayList.prototype.equals = function(collection) {
        return dsa.structs.genericCollectionEquals(this, collection);
      };
      ArrayList.prototype.forEach = function(callback) {
        dsa.structs.genericForEach(this, callback);
      };
      ArrayList.prototype.get = function(index) {
        dsa.error.checkNotNull(index);
        dsa.error.checkIndex(index, this.size());
        return $traceurRuntime.elementGet(this.array, index);
      };
      ArrayList.prototype.has = function(element) {
        return this.indexOf(element) >= 0;
      };
      ArrayList.prototype.indexOf = function(value) {
        dsa.error.checkNotNull(value);
        var index = 0;
        for (var element in this) {
          if (this.comparator(element, value) === 0) {
            return index;
          }
          index++;
        }
        return - 1;
      };
      ArrayList.prototype.set = function(index, element) {
        dsa.error.checkNotNull(element);
        var currentValue = this.get(index);
        $traceurRuntime.elementSet(this.array, index, element);
        return currentValue;
      };
      ArrayList.prototype.size = function() {
        return this.array.length;
      };
      ArrayList.prototype.toArray = function() {
        return this.array;
      };
      ArrayList.prototype.isEmpty = function() {
        return this.size() > 0;
      };
      return ArrayList;
    })();
    structs.ArrayList = ArrayList;
  })(dsa.structs || (dsa.structs = {}));
  var structs = dsa.structs;
})(dsa || (dsa = {}));
var dsa;
(function(dsa) {
  (function(structs) {
    var DoublyLinkedNode = (function() {
      function DoublyLinkedNode(value, prev, next) {
        this.value = value;
        this.prev = prev;
        this.next = next;
      }
      return DoublyLinkedNode;
    })();
    structs.DoublyLinkedNode = DoublyLinkedNode;
    var DoublyLinkedListIterator = (function() {
      function DoublyLinkedListIterator(currentNode) {
        this.currentNode = currentNode;
      }
      DoublyLinkedListIterator.prototype.next = function() {
        if (this.currentNode === null) {
          throw StopIteration;
        }
        var node = this.currentNode;
        this.currentNode = this.currentNode.next;
        return this.currentNode.value;
      };
      return DoublyLinkedListIterator;
    })();
    var DoublyLinkedList = (function() {
      function DoublyLinkedList(comparator) {
        if (typeof comparator === "undefined") {
          comparator = dsa.structs.DefaultComparator;
        }
        this.comparator = comparator;
      }
      DoublyLinkedList.prototype.__iterator__ = function() {
        return new DoublyLinkedListIterator(this.rootNode);
      };
      DoublyLinkedList.prototype.add = function(element) {
        this.addAtIndex(0, element);
        return true;
      };
      DoublyLinkedList.prototype.addAtIndex = function(index, element) {
        dsa.error.checkNotNull(element);
        dsa.error.checkIndex(index, this.size());
        if (index === 0) {
          if (this.size() === 0) {
            this.rootNode = this.lastNode = new DoublyLinkedNode(element);
            this.rootNode.next = this.rootNode;
            this.rootNode.prev = this.rootNode;
          } else if (this.size() === 1) {
            this.lastNode.next = new DoublyLinkedNode(element);
            this.rootNode.prev = this.lastNode.next;
          }
        }
        this.count++;
      };
      DoublyLinkedList.prototype.clear = function() {
        this.rootNode = this.lastNode = null;
        this.count = 0;
      };
      DoublyLinkedList.prototype.remove = function(element) {
        dsa.error.checkNotNull(element);
        if (this.size() === 0) {
          return false;
        }
        if (this.comparator(this.rootNode.value, element) === 0) {
          if (this.size() === 1) {
            this.clear();
            return true;
          }
          this.rootNode = this.rootNode.next;
          this.rootNode.prev = this.lastNode;
          this.lastNode.prev = this.rootNode;
          this.count--;
          return true;
        } else if (this.comparator(this.lastNode.value, element) === 0) {
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
      DoublyLinkedList.prototype.removeAtIndex = function(index) {
        dsa.error.checkNotNull(index);
        dsa.error.checkIndex(index, this.size());
        if (this.size() === 1) {
          var element = this.rootNode.value;
          this.clear();
          return element;
        } else if (this.size() - 1 === index) {
          return this.removeLastNode();
        }
      };
      DoublyLinkedList.prototype.equals = function(collection) {
        return dsa.structs.genericCollectionEquals(this, collection);
      };
      DoublyLinkedList.prototype.forEach = function(callback) {
        dsa.structs.genericForEach(this, callback);
      };
      DoublyLinkedList.prototype.get = function(index) {
        dsa.error.checkNotNull(index);
        dsa.error.checkIndex(index, this.size());
        return this.getNodeByIndex(index).value;
      };
      DoublyLinkedList.prototype.has = function(element) {
        return this.indexOf(element) >= 0;
      };
      DoublyLinkedList.prototype.indexOf = function(element) {
        dsa.error.checkNotNull(element);
        var i = 0;
        for (var node in this) {
          if (this.comparator(element, node.value) === 0) {
            return i;
          }
          i++;
        }
        return - 1;
      };
      DoublyLinkedList.prototype.set = function(index, element) {
        dsa.error.checkNotNull(element);
        return this.getNodeByIndex(index).value = element;
      };
      DoublyLinkedList.prototype.size = function() {
        return this.count;
      };
      DoublyLinkedList.prototype.toArray = function() {
        var array = [];
        for (var node in this) {
          array.push(node.value);
        }
        return array;
      };
      DoublyLinkedList.prototype.isEmpty = function() {
        return this.size() > 0;
      };
      DoublyLinkedList.prototype.getNodeByElement = function(element) {
        for (var node in this) {
          if (this.comparator(element, node.value) === 0) {
            return node.value;
          }
        }
        return null;
      };
      DoublyLinkedList.prototype.getNodeByIndex = function(index) {
        var i = 0;
        for (var node in this) {
          if (i === index) {
            return node;
          }
        }
        return null;
      };
      DoublyLinkedList.prototype.removeLastNode = function() {
        var element = this.rootNode.value;
        this.lastNode = this.lastNode.prev;
        this.lastNode.next = this.rootNode;
        this.rootNode.prev = this.lastNode;
        this.count--;
        return element;
      };
      return DoublyLinkedList;
    })();
    structs.DoublyLinkedList = DoublyLinkedList;
  })(dsa.structs || (dsa.structs = {}));
  var structs = dsa.structs;
})(dsa || (dsa = {}));
var dsa;
(function(dsa) {
  (function(structs) {
    var ES6BaseMap = (function() {
      function ES6BaseMap(map, comparator) {
        if (typeof comparator === "undefined") {
          comparator = dsa.structs.DefaultComparator;
        }
        this.map = map;
        this.comparator = comparator;
      }
      ES6BaseMap.prototype.clear = function() {
        this.map.clear();
      };
      ES6BaseMap.prototype.containsKey = function(key) {
        dsa.error.checkNotNull(key);
        return this.map.has(key);
      };
      ES6BaseMap.prototype.equals = function(map) {
        return false;
      };
      ES6BaseMap.prototype.forEach = function(callback) {
        dsa.error.checkNotNull(callback);
        this.map.forEach(callback);
      };
      ES6BaseMap.prototype.get = function(key) {
        dsa.error.checkNotNull(key);
        return this.map.get(key);
      };
      ES6BaseMap.prototype.has = function(element) {
        return this.get(element) !== null;
      };
      ES6BaseMap.prototype.isEmpty = function() {
        return dsa.structs.genericIsEmpty(this);
      };
      ES6BaseMap.prototype.keys = function() {
        return this.map.keys();
      };
      ES6BaseMap.prototype.remove = function(key) {
        dsa.error.checkNotNull(key);
        return this.map.delete (key);
      };
      ES6BaseMap.prototype.set = function(key, value) {
        dsa.error.checkNotNull(key);
        dsa.error.checkNotNull(value);
        return this.map.set(key, value);
      };
      ES6BaseMap.prototype.size = function() {
        return this.map.size;
      };
      ES6BaseMap.prototype.values = function() {
        return this.map.values();
      };
      ES6BaseMap.prototype.__iterator__ = function() {
        return this.keys();
      };
      return ES6BaseMap;
    })();
    structs.ES6BaseMap = ES6BaseMap;
  })(dsa.structs || (dsa.structs = {}));
  var structs = dsa.structs;
})(dsa || (dsa = {}));
var __extends = this.__extends || function(d, b) {
  for (var p in b) if (b.hasOwnProperty(p)) $traceurRuntime.elementSet(d, p, $traceurRuntime.elementGet(b, p));
  function __() {
    this.constructor = d;
  }
  __.prototype = b.prototype;
  d.prototype = new __();
};
var dsa;
(function(dsa) {
  (function(structs) {
    var HashMap = (function(_super) {
      __extends(HashMap, _super);
      function HashMap(comparator) {
        if (typeof comparator === "undefined") {
          comparator = dsa.structs.DefaultComparator;
        }
        _super.call(this, new Map(), comparator);
      }
      return HashMap;
    })(dsa.structs.ES6BaseMap);
    structs.HashMap = HashMap;
  })(dsa.structs || (dsa.structs = {}));
  var structs = dsa.structs;
})(dsa || (dsa = {}));
var dsa;
(function(dsa) {
  (function(structs) {
    var TreeMap = (function() {
      function TreeMap(comparator) {
        if (typeof comparator === "undefined") {
          comparator = dsa.structs.DefaultComparator;
        }
        this.comparator = comparator;
        this.tree = new dsa.structs.RedBlackTree(this.comparator);
      }
      TreeMap.prototype.clear = function() {
        this.tree.clear();
      };
      TreeMap.prototype.containsKey = function(key) {
        return this.get(key) !== null;
      };
      TreeMap.prototype.equals = function(map) {
        return false;
      };
      TreeMap.prototype.forEach = function(callback) {};
      TreeMap.prototype.get = function(key) {
        var node = this.tree.get(key);
        return node ? node.value: null;
      };
      TreeMap.prototype.has = function(element) {
        return this.get(element) !== null;
      };
      TreeMap.prototype.isEmpty = function() {
        return this.size() === 0;
      };
      TreeMap.prototype.keys = function() {
        return null;
      };
      TreeMap.prototype.remove = function(key) {
        return this.tree.remove(key);
      };
      TreeMap.prototype.set = function(key, value) {
        this.tree.insert(key, value);
      };
      TreeMap.prototype.size = function() {
        return this.tree.size();
      };
      TreeMap.prototype.values = function() {
        return null;
      };
      TreeMap.prototype.__iterator__ = function() {
        return null;
      };
      return TreeMap;
    })();
    structs.TreeMap = TreeMap;
  })(dsa.structs || (dsa.structs = {}));
  var structs = dsa.structs;
})(dsa || (dsa = {}));
var dsa;
(function(dsa) {
  (function(structs) {
    var WeakHashMap = (function(_super) {
      __extends(WeakHashMap, _super);
      function WeakHashMap(comparator) {
        if (typeof comparator === "undefined") {
          comparator = dsa.structs.DefaultComparator;
        }
        _super.call(this, new Map(), comparator);
      }
      return WeakHashMap;
    })(dsa.structs.ES6BaseMap);
    structs.WeakHashMap = WeakHashMap;
  })(dsa.structs || (dsa.structs = {}));
  var structs = dsa.structs;
})(dsa || (dsa = {}));
var dsa;
(function(dsa) {
  (function(structs) {
    var HashSet = (function() {
      function HashSet(comparator) {
        if (typeof comparator === "undefined") {
          comparator = dsa.structs.DefaultComparator;
        }
        this.comparator = comparator;
        this.set = new Set();
      }
      HashSet.prototype.add = function(element) {
        this.set.add(element);
        return false;
      };
      HashSet.prototype.clear = function() {
        this.set.clear();
      };
      HashSet.prototype.remove = function(element) {
        this.set.delete (element);
        return false;
      };
      HashSet.prototype.equals = function(set) {
        return dsa.structs.genericCollectionEquals(this, set, this.comparator);
      };
      HashSet.prototype.forEach = function(callback) {
        this.set.forEach(callback);
      };
      HashSet.prototype.has = function(element) {
        return this.set.has(element);
      };
      HashSet.prototype.isEmpty = function() {
        return dsa.structs.genericIsEmpty(this);
      };
      HashSet.prototype.size = function() {
        return this.set.size;
      };
      HashSet.prototype.toArray = function() {
        return null;
      };
      HashSet.prototype.__iterator__ = function() {
        return this.set.values();
      };
      return HashSet;
    })();
    structs.HashSet = HashSet;
  })(dsa.structs || (dsa.structs = {}));
  var structs = dsa.structs;
})(dsa || (dsa = {}));
var dsa;
(function(dsa) {
  (function(structs) {
    var TreeSet = (function() {
      function TreeSet(comparator) {
        if (typeof comparator === "undefined") {
          comparator = dsa.structs.DefaultComparator;
        }
        this.comparator = comparator;
        this.treeMap = new dsa.structs.TreeMap();
      }
      TreeSet.prototype.add = function(element) {
        this.treeMap.set(element, true);
        return false;
      };
      TreeSet.prototype.clear = function() {
        this.treeMap.clear();
      };
      TreeSet.prototype.remove = function(element) {
        this.treeMap.remove(element);
        return false;
      };
      TreeSet.prototype.equals = function(set) {
        return dsa.structs.genericCollectionEquals(this, set, this.comparator);
      };
      TreeSet.prototype.forEach = function(callback) {};
      TreeSet.prototype.has = function(element) {
        return this.treeMap.has(element);
      };
      TreeSet.prototype.isEmpty = function() {
        return dsa.structs.genericIsEmpty(this);
      };
      TreeSet.prototype.size = function() {
        return this.treeMap.size();
      };
      TreeSet.prototype.toArray = function() {
        return null;
      };
      TreeSet.prototype.__iterator__ = function() {
        return this.treeMap.keys();
      };
      return TreeSet;
    })();
    structs.TreeSet = TreeSet;
  })(dsa.structs || (dsa.structs = {}));
  var structs = dsa.structs;
})(dsa || (dsa = {}));
var dsa;
(function(dsa) {
  (function(structs) {
    var RedBlackTreeNode = (function(_super) {
      __extends(RedBlackTreeNode, _super);
      function RedBlackTreeNode(key, value, left, right) {
        if (typeof key === "undefined") {
          key = null;
        }
        if (typeof value === "undefined") {
          value = null;
        }
        if (typeof left === "undefined") {
          left = null;
        }
        if (typeof right === "undefined") {
          right = null;
        }
        _super.call(this, key, value, left, right);
        this.key = key;
        this.value = value;
        this.left = left;
        this.right = right;
        this.red = true;
      }
      return RedBlackTreeNode;
    })(dsa.structs.TreeNode);
    structs.RedBlackTreeNode = RedBlackTreeNode;
    var TreeIterator = (function() {
      function TreeIterator(tree) {
        this.tree = tree;
        this.ancestors = [];
      }
      TreeIterator.prototype.key = function() {
        return this.cursor !== null ? this.cursor.key: null;
      };
      TreeIterator.prototype.next = function() {
        if (this.cursor === null) {
          var root = this.tree._root;
          if (root !== null) {
            this.minNode(root);
          }
        } else {
          if (this.cursor.right === null) {
            var save;
            do {
              save = this.cursor;
              if (this.ancestors.length) {
                this.cursor = this.ancestors.pop();
              } else {
                this.cursor = null;
                break;
              }
            } while (this.cursor.right === save);
          } else {
            this.ancestors.push(this.cursor);
            this.minNode(this.cursor.right);
          }
        }
        return this.key();
      };
      TreeIterator.prototype.prev = function() {
        if (this.cursor === null) {
          var root = this.tree._root;
          if (root !== null) {
            this.maxNode(root);
          }
        } else {
          if (this.cursor.left === null) {
            var save;
            do {
              save = this.cursor;
              if (this.ancestors.length) {
                this.cursor = this.ancestors.pop();
              } else {
                this.cursor = null;
                break;
              }
            } while (this.cursor.left === save);
          } else {
            this.ancestors.push(this.cursor);
            this.maxNode(this.cursor.left);
          }
        }
        return this.key();
      };
      TreeIterator.prototype.minNode = function(start) {
        while (start.left !== null) {
          this.ancestors.push(start);
          start = start.left;
        }
        this.cursor = start;
      };
      TreeIterator.prototype.maxNode = function(start) {
        while (start.right !== null) {
          this.ancestors.push(start);
          start = start.right;
        }
        this.cursor = start;
      };
      return TreeIterator;
    })();
    structs.TreeIterator = TreeIterator;
    var RedBlackTree = (function() {
      function RedBlackTree(_comparator) {
        if (typeof _comparator === "undefined") {
          _comparator = dsa.structs.DefaultComparator;
        }
        this._comparator = _comparator;
        this._root = null;
      }
      RedBlackTree.prototype.insert = function(key, value) {
        dsa.error.checkNotNull(key);
        dsa.error.checkNotNull(value);
        var returnValue = false;
        if (this._root === null) {
          this._root = new RedBlackTreeNode(key, value);
          returnValue = true;
          this._size++;
        } else {
          var head = new RedBlackTreeNode();
          var direction = false;
          var last = false;
          var grandParent = null;
          var grandParentParent = head;
          var parent = null;
          var node = this._root;
          grandParentParent.right = this._root;
          while (true) {
            if (node === null) {
              node = new RedBlackTreeNode(key, value);
              parent.setChild(direction, node);
              returnValue = true;
              this._size++;
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
            var cmp = this._comparator(node.key, key);
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
          this._root = head.right;
        }
        this._root.red = false;
        return returnValue;
      };
      RedBlackTree.prototype.remove = function(key) {
        dsa.error.checkNotNull(key);
        if (this._root === null) {
          return false;
        }
        var head = new RedBlackTreeNode();
        var node = head;
        node.right = this._root;
        var parent = null;
        var grandParent = null;
        var found = null;
        var directionRight = true;
        while (node.getChild(directionRight) !== null) {
          var last = directionRight;
          grandParent = parent;
          parent = node;
          node = node.getChild(directionRight);
          var cmp = this._comparator(key, node.key);
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
          this._size--;
        }
        this._root = head.right;
        if (this._root !== null) {
          this._root.red = false;
        }
        return found !== null;
      };
      RedBlackTree.prototype.size = function() {
        return this._size;
      };
      RedBlackTree.prototype.clear = function() {
        this._root = null;
        this._size = 0;
      };
      RedBlackTree.prototype.get = function(key) {
        dsa.error.checkNotNull(key);
        var res = this._root;
        while (res !== null) {
          var comparatorValue = this._comparator(key, res.key);
          if (comparatorValue === 0) {
            return res;
          } else {
            res = res.getChild(comparatorValue > 0);
          }
        }
        return null;
      };
      RedBlackTree.prototype.forEach = function(callback) {
        dsa.structs.genericForEach(this, callback);
      };
      RedBlackTree.prototype.__iterator__ = function() {
        return new TreeIterator(this);
      };
      RedBlackTree.prototype.isRed = function(node) {
        return node !== null && node.red;
      };
      RedBlackTree.prototype.doubleRotate = function(right, root) {
        root.setChild(!right, this.singleRotate(!right, root.getChild(!right)));
        return this.singleRotate(right, root);
      };
      RedBlackTree.prototype.singleRotate = function(right, root) {
        var save = root.getChild(!right);
        root.setChild(!right, save.getChild(right));
        save.setChild(right, root);
        root.red = true;
        save.red = false;
        return save;
      };
      return RedBlackTree;
    })();
    structs.RedBlackTree = RedBlackTree;
  })(dsa.structs || (dsa.structs = {}));
  var structs = dsa.structs;
})(dsa || (dsa = {}));
var dsa;
(function(dsa) {
  (function(error) {
    var BaseException = (function() {
      function BaseException(message) {
        this.error = new Error(message);
        this.error.name = this.name + "Exception";
      }
      return BaseException;
    })();
    error.BaseException = BaseException;
    var IllegalArgument = (function(_super) {
      __extends(IllegalArgument, _super);
      function IllegalArgument(message) {
        this.name = "IllegalArgument";
        _super.call(this, message);
      }
      return IllegalArgument;
    })(BaseException);
    error.IllegalArgument = IllegalArgument;
    var IllegalState = (function(_super) {
      __extends(IllegalState, _super);
      function IllegalState(message) {
        this.name = "IllegalState";
        _super.call(this, message);
      }
      return IllegalState;
    })(BaseException);
    error.IllegalState = IllegalState;
    var NullPointer = (function(_super) {
      __extends(NullPointer, _super);
      function NullPointer(message) {
        this.name = "NullPointer";
        _super.call(this, message);
      }
      return NullPointer;
    })(BaseException);
    error.NullPointer = NullPointer;
    var IndexOutOfBounds = (function(_super) {
      __extends(IndexOutOfBounds, _super);
      function IndexOutOfBounds(message) {
        this.name = "IndexOutOfBounds";
        _super.call(this, message);
      }
      return IndexOutOfBounds;
    })(BaseException);
    error.IndexOutOfBounds = IndexOutOfBounds;
  })(dsa.error || (dsa.error = {}));
  var error = dsa.error;
})(dsa || (dsa = {}));
var dsa;
(function(dsa) {
  (function(error) {
    function checkNotNull(argument, message) {
      if (argument === null || argument === undefined) {
        throw new dsa.error.NullPointer(message || "argument is null.").error;
      }
    }
    error.checkNotNull = checkNotNull;
    function checkArgument(condition, message) {
      if (condition) {
        throw new dsa.error.IllegalArgument(message).error;
      }
    }
    error.checkArgument = checkArgument;
    function checkIndex(index, size, message) {
      if (index < 0 || index >= size) {
        throw new dsa.error.IndexOutOfBounds(message).error;
      }
    }
    error.checkIndex = checkIndex;
    function checkIndexRange(startIndex, endIndex, size, message) {
      if (startIndex > endIndex || startIndex < 0 || endIndex >= size) {
        throw new dsa.error.IndexOutOfBounds(message).error;
      }
    }
    error.checkIndexRange = checkIndexRange;
  })(dsa.error || (dsa.error = {}));
  var error = dsa.error;
})(dsa || (dsa = {}));
var dsa;
(function(dsa) {
  (function(search) {
    function BinarySearch(list, value, comparator) {
      if (typeof comparator === "undefined") {
        comparator = dsa.structs.DefaultComparator;
      }
      var minIndex = 0;
      var maxIndex = list.size() - 1;
      var midIndex;
      var midValue;
      while (minIndex <= maxIndex) {
        midIndex = (minIndex / maxIndex) / 2;
        midValue = list.get(midIndex);
        if (comparator(midValue, value) < 0) {
          minIndex = midIndex + 1;
        } else if (comparator(midValue, value) > 0) {
          maxIndex = midIndex - 1;
        } else {
          return midIndex;
        }
      }
      return - 1;
    }
    search.BinarySearch = BinarySearch;
  })(dsa.search || (dsa.search = {}));
  var search = dsa.search;
})(dsa || (dsa = {}));
