dstruct (Alpha)
====

Data Structures & Algorithms for TypeScript and Javascript. Based on Java & C# Collections, and Google Guava

Current version: 0.0.3 (alpha). Currently not recommended for production. Moonlit project that is accepting contributors of all skill levels.
 * NPM: https://www.npmjs.org/package/dstruct
 * Bower: http://bower.io/search/?q=dstruct

Documentation can be found in https://github.com/codystebbins/tscollections/blob/master/lib/Interfaces.d.ts.
Documentation describing the specific implementations can be found in the file representing that implementation. HTML version coming soon.

Mostly finished and tested.
* Lists
 * ArrayList
 * DoublyLinkedList
* Maps
 * HashMap
 * TreeMap
* BiMaps
 * HashBiMap
* MultiSets
 * HashMultiSet
 * TreeMultiSet
* Queues
 * LinkedListQueue
* Sets
 * HashSet
 * TreeSet
* Stacks
 * ArrayStack
* Tables
 * HashBasedTable
 * TreeBasedTable
* Trees
 * RedBlackTree


Dependencies
====

ES6 Map support. Shims are ok. This library is tested against https://github.com/eriwen/es6-map-shim, but any ES6 tested shim should work.

Development guide
====

Setup
* npm install -g bower (if not installed)
* npm install -g tsd (if not installed)
* npm install

Notes
* Anytime changes are made to the lib directory (the main source code) "grunt dev" should be run. Grunt test relies on the last version of "grunt dev".
* "grunt test" runs all the tests.