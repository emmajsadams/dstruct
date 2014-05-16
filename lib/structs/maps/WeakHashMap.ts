/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");
import ES6BaseMap = require("./ES6BaseMap");

export class WeakHashMap<K extends Interfaces.BaseObject, V extends Interfaces.BaseObject> extends ES6BaseMap<K, V> {

    constructor() {
        super(<any>new WeakMap());
    }

}
