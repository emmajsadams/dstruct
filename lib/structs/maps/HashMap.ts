/// <reference path="../../../References.d.ts"/>

import Interfaces = require("../../Interfaces");

module dsa.structs {

    export class HashMap<K extends Interfaces.BaseObject, V extends Interfaces.BaseObject> extends ES6BaseMap<K, V> {

        constructor() {
            super(<any>new Map());
        }

    }

}