interface Number {
    hashCode(): number;
    equals(string:Number);
    compareTo(otherString:Number): number;
}

interface String {
    hashCode(): number;
    equals(string:String);
    compareTo(otherString:String): number;
}

String.prototype.hashCode = function () {
    var hash = 0, i, chr, len;
    if (this.length == 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
String.prototype.equals = function (otherString) {
    return this === otherString;
};
Number.prototype.hashCode = function () {
    return this;
};
Number.prototype.equals = function (otherNumber) {
    return this === otherNumber;
};

/*
 String.prototype.equals = function (otherString: string): boolean {
 //TODO: test this implementation
 return this.compareTo(otherString) === 0;
 };
 String.prototype.compareTo = function (otherString: String): number {
 return dsa.structs.DefaultComparator(this, otherString);
 };
 */