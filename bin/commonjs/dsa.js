var ArrayList = require("./structures/lists/ArrayList");
var DoublyLinkedList = require("./structures/lists/DoublyLinkedList");

var HashMap = require("./structures/maps/HashMap");
var TreeMap = require("./structures/maps/TreeMap");

var HashBiMap = require("./structures/maps/biMaps/HashBiMap");

var HashMultiSet = require("./structures/multiSets/HashMultiSet");
var TreeMultiSet = require("./structures/multiSets/TreeMultiSet");

var LinkedListQueue = require("./structures/queues/LinkedListQueue");

var HashSet = require("./structures/sets/HashSet");
var TreeSet = require("./structures/sets/TreeSet");

var ArrayStack = require("./structures/stacks/ArrayStack");

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

module.exports = dsa;
