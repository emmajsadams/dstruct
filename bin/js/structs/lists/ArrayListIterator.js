define(["require", "exports"], function(require, exports) {
    var ArrayListIterator = (function () {
        function ArrayListIterator(array) {
            this.array = array;
            this.index = 0;
        }
        ArrayListIterator.prototype.next = function () {
            var element = this.array[this.index];
            this.index++;
            return {
                value: element,
                done: this.index >= this.array.length - 1
            };
        };
        return ArrayListIterator;
    })();

    
    return ArrayListIterator;
});
