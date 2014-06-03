/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");
import HashMap = require("../maps/HashMap");
import BaseMultiSet = require("./BaseMultiSet");

class HashMultiSet<E> extends BaseMultiSet<E> {

    constructor() {
        super(new HashMap<E, number>());
    }

}

export = HashMultiSet;