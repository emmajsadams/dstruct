interface Number {
  hashCode(): number;
  equals(otherNumber: Number);
  compareTo(otherNumber: Number): number;
}

interface String {
  hashCode(): number;
  equals(otherString: String);
  compareTo(otherString: String): number;
}

interface Boolean {
  hashCode(): number;
  equals(otherBoolean: Boolean);
  compareTo(otherBoolean: Boolean): number;
}

// TODO: make these non enumerable.
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
  return this.valueOf() ? 1 : 0; //TODO
};
Boolean.prototype.equals = function (otherBoolean) {
  return this.valueOf() === otherBoolean;
};
Boolean.prototype.compareTo = function (otherBoolean) {
  return this.valueOf() === otherBoolean ? 0 : -1;
};

// TODO: only works for base types. Ensure not used in new classes.
function DefaultComparator(item1: any, item2: any): number {
  if (item1 === item2) {
    return 0;
  } else if (!item1 || item1 < item2) {
    return -1;
  } else if (!item2 || item1 > item2) {
    return 1;
  }
}
/*
 String.prototype.equals = function (otherString: string): boolean {
 //TODO: test this implementation
 return this.compareTo(otherString) === 0;
 };
 String.prototype.compareTo = function (otherString: String): number {
 return dsa.structs.DefaultComparator(this, otherString);
 };
 */