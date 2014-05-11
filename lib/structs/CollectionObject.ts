/// <reference path="../../References.d.ts"/>

//TODO: consider using Object.prototype, make the prototype not enumberable
interface Object {
    // TODO: hashCode needs to be unique currently, should not! Consider implementing an actual hashMap instead of using the ES6 collections.
    hashCode(): number;
    equals(otherObject: Object);
}
interface Comparable {
    compareTo(otherObject: Object): number;
}
//TODO: is this necessary? typesafe generics seems to not be able to implement multiple interfaces
interface ComparableObject extends Object, Comparable {
}
interface String extends Object, Comparable {
    hashCode(): number;
    equals(string: String);
    compareTo(otherString: String): number;
}
String.prototype.hashCode = function () {
    var hash = 0, i, chr, len;
    if (this.length == 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
String.prototype.equals = function (otherString: string): boolean {
    //TODO: test this implementation
    return this.compareTo(otherString) === 0;
};
String.prototype.compareTo = function (otherString: String): number {
    return dsa.structs.DefaultComparator(this, otherString);
};
//TODO: array

module dsa.structs {

    // TODO: only works for base types. Ensure not used in new classes.
    export var DefaultComparator = (item1: any, item2: any): number  => {
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

    };

}


