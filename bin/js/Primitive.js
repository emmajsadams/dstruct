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
    return this.valueOf() === otherString;
};
Number.prototype.hashCode = function () {
    return this.valueOf();
};
Number.prototype.equals = function (otherNumber) {
    return this.valueOf() === otherNumber;
};
