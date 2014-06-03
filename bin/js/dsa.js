define(["require", "exports", "./structures/lists/ArrayList", "./structures/lists/DoublyLinkedList", "./structures/maps/HashMap", "./structures/maps/TreeMap", "./structures/maps/biMaps/HashBiMap", "./structures/multiSets/HashMultiSet", "./structures/multiSets/TreeMultiSet", "./structures/queues/LinkedListQueue", "./structures/sets/HashSet", "./structures/sets/TreeSet", "./structures/stacks/ArrayStack"], function(require, exports, ArrayList, DoublyLinkedList, HashMap, TreeMap, HashBiMap, HashMultiSet, TreeMultiSet, LinkedListQueue, HashSet, TreeSet, ArrayStack) {
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

    
    return dsa;
});
