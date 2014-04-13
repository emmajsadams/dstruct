/// <reference path="../References.d.ts"/>

module tsds.collections {

    export interface Comparator<E> {
        (item1: E, item2: E): number
    }

    // TODO: only works for base types. Ensure not used in new classes.
    export var DefaultComparator: Comparator<any> = (item1: any, item2: any): number  => {
        if (item1 === item2) {
            return 0;
        } else if (item1 < item2) {
            return -1;
        } else if (item1 > item2) {
            return 1;
        } else {
            // Check all conditions, and throw an error else. This ensures base types
            // and class types that cannot be compared will throw an error when this is used.
            throw new tsds.Exceptions.IllegalArgument("item1 cannot be compared to item2");
        }

    }

}