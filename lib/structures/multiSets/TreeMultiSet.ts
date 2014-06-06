
import Interfaces = require("../../Interfaces");
import TreeMap = require("../maps/TreeMap");
import BaseMultiSet = require("./BaseMultiSet");

// TODO: create SortedMultiSet interface!
class TreeMultiSet<E extends Interfaces.ComparableBaseObject> extends BaseMultiSet<E> {

    constructor() {
        super(new TreeMap<E, number>());
    }

}

export = TreeMultiSet;