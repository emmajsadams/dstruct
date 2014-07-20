define(["require", "exports"], function(require, exports) {
    var ArrayListIterator = (function () {
        function ArrayListIterator(array) {
            this.array = array;
            this.index = 0;
        }
        ArrayListIterator.prototype.next = function () {
            var next = this.index < this.array.length ? { value: this.array[this.index], done: false } : { value: null, done: true };

            this.index++;
            return next;
        };
        return ArrayListIterator;
    })();

    
    return ArrayListIterator;
});
