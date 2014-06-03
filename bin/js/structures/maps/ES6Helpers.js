define(["require", "exports"], function(require, exports) {
    

    var Iterator = (function () {
        function Iterator(iterator, valueCallback) {
            this.iterator = iterator;
            this.valueCallback = valueCallback;
            this.done = false;
        }
        Iterator.prototype.next = function () {
            if (this.currentEntry === null || this.currentEntry.next === null) {
                var next = this.iterator.next();
                this.done = next.done;
                this.currentEntry = next.value;
            }

            return {
                value: this.valueCallback(this.currentEntry),
                done: !!(this.currentEntry.next === null && this.done)
            };
        };
        return Iterator;
    })();
    exports.Iterator = Iterator;
});
