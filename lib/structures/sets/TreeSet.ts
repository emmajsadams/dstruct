import Interfaces = require("../../Interfaces");
import MapSet = require("./MapSet");
import TreeMap = require("../maps/TreeMap");

class TreeSet<E extends Interfaces.IComparableBaseObject> extends MapSet<E> implements Interfaces.ISortedSet<E> {

  constructor() {
    super(new TreeMap<E, boolean>());
  }

}

export = TreeSet;