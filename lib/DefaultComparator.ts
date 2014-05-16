/// <reference path="../References.d.ts"/>

import Interfaces = require("./Interfaces");

// TODO: only works for base types. Ensure not used in new classes.
function DefaultComparator(item1: any, item2: any): number {
    if (item1 === item2) {
        return 0;
    } else if (!item1 || item1 < item2) {
        return -1;
    } else if (!item2 || item1 > item2) {
        return 1;
    } else {
        // Check all conditions, and throw an error else. This ensures base types
        // and class types that cannot be compared will throw an error when this is used.
        /*
         throw new dsa.error.IllegalArgument("item1 cannot be compared to item2");
         TODO: convert to checkArgument
         */
    }
}

export = DefaultComparator;