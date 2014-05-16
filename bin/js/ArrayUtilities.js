define(["require", "exports"], function(require, exports) {
    function clear(array) {
        while (array.length > 0) {
            array.pop();
        }
    }
    exports.clear = clear;
});
