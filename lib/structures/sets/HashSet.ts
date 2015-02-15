import Interfaces = require("../../Interfaces");
import MapSet = require("./MapSet");
import HashMap = require("../maps/HashMap");

class HashSet<E extends Interfaces.IBaseObject> extends MapSet<E> implements Interfaces.ISet<E> {

  constructor() {
    super(new HashMap<E, boolean>());
  }

}

export = HashSet;
