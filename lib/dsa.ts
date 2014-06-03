import Interfaces = require("./Interfaces");

// FOR BROWSER USERS
// Configure this file with the data structures and algorithms you require
// for your project. Remove any require statements and exports you do not use.

// Lists
import ArrayList = require("./structures/lists/ArrayList");
import DoublyLinkedList = require("./structures/lists/DoublyLinkedList");

// Maps
import HashMap = require("./structures/maps/HashMap");
import TreeMap = require("./structures/maps/TreeMap");

// WeakHashMap cannot be implemented until ES6 is implemented. This is because the implementation
// requires low level access to memory. Uncomment when using in a ES6 environment.
//import WeakHashMap = require("./structures/maps/WeakHashMap");

// BiMaps
import HashBiMap = require("./structures/maps/biMaps/HashBiMap");

// MultiSets
import HashMultiSet = require("./structures/multiSets/HashMultiSet");
import TreeMultiSet = require("./structures/multiSets/TreeMultiSet");

// Queues
import LinkedListQueue = require("./structures/queues/LinkedListQueue");

// Sets
import HashSet = require("./structures/sets/HashSet");
import TreeSet = require("./structures/sets/TreeSet");

// Stacks
import ArrayStack = require("./structures/stacks/ArrayStack");

// Tables
// TODO! - Not ready for production

// Trees
// TODO! - Not ready for production

var dsa = {
    'Lists': {
        'ArrayList': ArrayList,
        'DoublyLinkedList': DoublyLinkedList
    },
    'Maps': {
        'HashMap': HashMap,
        'TreeMap': TreeMap
    },
    'BiMaps': {
        'HashBiMap': HashBiMap
    },
    'MultiSet': {
        'HashMultiSet': HashMultiSet,
        'TreeMultiSet': TreeMultiSet
    },
    'Queues': {
        'LinkedListQueue': LinkedListQueue
    },
    'Sets': {
        'HashSet': HashSet,
        'TreeSet': TreeSet
    },
    'Stacks': {
        'ArrayStack': ArrayStack
    }
};

export = dsa;