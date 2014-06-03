/// <reference path="../../../References.d.ts"/>

import MapSet = require("./MapSet");
import TreeMap = require("../maps/TreeMap");

class TreeSet<E extends Interfaces.BaseObject> extends MapSet<E> implements Interfaces.SortedSet<E> {

    constructor() {
        super(new TreeMap<E, boolean>());
    }

}

export = TreeSet;
