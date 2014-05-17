/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");
import ES6BaseMap = require("./ES6BaseMap");

class HashMap<K extends Interfaces.BaseObject, V extends Interfaces.BaseObject> extends ES6BaseMap<K, V> {

    constructor() { super(<any>new Map()); }

}

export = HashMap;
