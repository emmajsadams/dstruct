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
String.prototype.compareTo = function (otherString) {
    return DefaultComparator(this.valueOf(), otherString);
};
Number.prototype.hashCode = function () {
    return this.valueOf();
};
Number.prototype.equals = function (otherNumber) {
    return this.valueOf() === otherNumber;
};
Number.prototype.compareTo = function (otherNumber) {
    return DefaultComparator(this.valueOf(), otherNumber);
};
Boolean.prototype.hashCode = function () {
    return this.valueOf() ? 1 : 0;
};
Boolean.prototype.equals = function (otherBoolean) {
    return this.valueOf() === otherBoolean;
};
Boolean.prototype.compareTo = function (otherBoolean) {
    return this.valueOf() === otherBoolean ? 0 : -1;
};
function DefaultComparator(item1, item2) {
    if (item1 === item2) {
        return 0;
    }
    else if (!item1 || item1 < item2) {
        return -1;
    }
    else if (!item2 || item1 > item2) {
        return 1;
    }
}
