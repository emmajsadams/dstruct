import Interfaces = require("../../Interfaces");
import ES6BaseMap = require("./ES6BaseMap");

class WeakHashMap<K extends Interfaces.IBaseObject, V extends Interfaces.IBaseObject> extends ES6BaseMap<K, V> {

  constructor() {
    super(<any>new WeakMap());
  }

}

export = WeakHashMap;
