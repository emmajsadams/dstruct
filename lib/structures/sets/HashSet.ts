/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");
import MapSet = require("./MapSet");
import HashMap = require("../maps/HashMap");

class HashSet<E extends Interfaces.BaseObject> extends MapSet<E> implements Interfaces.Set<E> {

    constructor() {
        super(new HashMap<E, boolean>());
    }

}

export = HashSet;
