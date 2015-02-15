import Interfaces = require("../../Interfaces");

class ArrayListIterator<E extends Interfaces.IBaseObject> implements Interfaces.IIterator<E> {
  private index = 0;

  constructor(private array: E[]) {
  }

  next(): Interfaces.IIteratorReturn<E> {
    var next = this.index < this.array.length
      ? {value: this.array[this.index], done: false}
      : {value: null, done: true};

    this.index++;
    return next;
  }
}

export = ArrayListIterator;