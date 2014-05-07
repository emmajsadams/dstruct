/// <reference path="../../References.d.ts"/>

//TODO: consider using Object.prototype
interface Object {
    hashCode(): number;
    compareTo(otherObject: Object): number;
}
Object.prototype.hashCode = function() {
    return 0; //TODO!
};
Object.prototype.compareTo = function(otherObject: Object) {
    return 0; //TODO
};
interface String {
    hashCode(): number;
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

    }

    //TODO: array, default object!

    var map = new HashMap<String, String>();
    map.set("foo", "foo");

}


