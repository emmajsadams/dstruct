var Error = require("../../Error");
var MapHelpers = require("./MapHelpers");
var RedBlackTree = require("../trees/RedBlackTree");
var IterableHelpers = require("../IterableHelpers");

var TreeMap = (function () {
    function TreeMap() {
        this.tree = new RedBlackTree();
    }
    TreeMap.prototype.clear = function () {
        this.tree.clear();
    };

    TreeMap.prototype.containsKey = function (key) {
        return this.get(key) !== null;
    };

    TreeMap.prototype.hashCode = function () {
        Error.notImplemented();
        return null;
    };

    TreeMap.prototype.equals = function (map) {
        return MapHelpers.equals(this, map);
    };

    TreeMap.prototype.forEach = function (callback) {
        this.tree.forEach(callback);
    };

    TreeMap.prototype.get = function (key) {
        return this.tree.get(key);
    };

    TreeMap.prototype.isEmpty = function () {
        return IterableHelpers.isEmpty(this);
    };

    TreeMap.prototype.keys = function () {
        return null;
    };

    TreeMap.prototype.remove = function (key) {
        return null;
    };

    TreeMap.prototype.set = function (key, value) {
        this.tree.insert(key, value);
        return null;
    };

    TreeMap.prototype.size = function () {
        return this.tree.size();
    };

    TreeMap.prototype.values = function () {
        return null;
    };

    TreeMap.prototype.__iterator__ = function () {
        return this.keys();
    };
    return TreeMap;
})();

module.exports = TreeMap;
