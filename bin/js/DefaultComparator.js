define(["require", "exports"], function(require, exports) {
    function DefaultComparator(item1, item2) {
        if (item1 === item2) {
            return 0;
        } else if (!item1 || item1 < item2) {
            return -1;
        } else if (!item2 || item1 > item2) {
            return 1;
        } else {
        }
    }

    
    return DefaultComparator;
});
