interface Number {
    hashCode(): number;
    equals(otherNumber:Number);
    compareTo(otherNumber:Number): number;
}

interface String {
    hashCode(): number;
    equals(otherString:String);
    compareTo(otherString:String): number;
}

interface Boolean {
    hashCode(): number;
    equals(otherBoolean:Boolean);
    compareTo(otherBoolean:Boolean): number;
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
String.prototype.compareTo = function (otherString) {
    return null; //TODO
};

Number.prototype.hashCode = function () {
    return this;
};
Number.prototype.equals = function (otherNumber) {
    return this === otherNumber;
};
Number.prototype.compareTo = function (otherNumber) {
    return null; //TODO
};

Boolean.prototype.hashCode = function () {
    return this ? 1 : 0; //TODO
};
Boolean.prototype.equals = function (otherBoolean) {
    return this === otherBoolean;
};
Boolean.prototype.compareTo = function (otherBoolean) {
    return null; //TODO
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