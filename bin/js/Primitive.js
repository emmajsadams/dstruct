String.prototype.hashCode = function () {
    var hash = 0, i, chr, len;
    if (this.length == 0)
        return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
};
String.prototype.equals = function (otherString) {
    return this === otherString;
};
String.prototype.compareTo = function (otherString) {
    return null;
};

Number.prototype.hashCode = function () {
    return this;
};
Number.prototype.equals = function (otherNumber) {
    return this === otherNumber;
};
Number.prototype.compareTo = function (otherNumber) {
    return null;
};

Boolean.prototype.hashCode = function () {
    return this ? 1 : 0;
};
Boolean.prototype.equals = function (otherBoolean) {
    return this === otherBoolean;
};
Boolean.prototype.compareTo = function (otherBoolean) {
    return null;
};
