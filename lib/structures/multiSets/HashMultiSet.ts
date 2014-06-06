
import Interfaces = require("../../Interfaces");
import HashMap = require("../maps/HashMap");
import BaseMultiSet = require("./BaseMultiSet");

class HashMultiSet<E extends Interfaces.BaseObject> extends BaseMultiSet<E> {

    constructor() {
        super(new HashMap<E, number>());
    }

}

export = HashMultiSet;