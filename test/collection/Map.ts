/// <reference path="../../References.d.ts"/>

import Interfaces = require("../../lib/Interfaces");
import HashMap = require("../../lib/structures/maps/HashMap");
import TreeMap = require("../../lib/structures/maps/TreeMap");
import WeakHashMap = require("../../lib/structures/maps/WeakHashMap");
import HashBiMap = require("../../lib/structures/maps/biMaps/HashBiMap");


//TODO: make this set of tests work with objects, to test the key equality with non primitives.
function test(mapFactory: () => Interfaces.Map<Number, Number>, name: string) {
    describe(name, () => {
        var map: Interfaces.Map<Number, Number>;

        beforeEach(() => {
            map = mapFactory();
        });

        it("Should get a key and value that has been set once.", () => {
            map.set(4, 2);

            expect(map.get(4) === 2);
            expect(map.size() === 1);
        });
    });
}

describe("Map", () => {

    test(() => {
        return new HashMap<Number, Number>();
    }, "HashMap");

    test(() => {
        return new TreeMap<Number, Number>();
    }, "TreeMap");

    test(() => {
        return new WeakHashMap<Number, Number>();
    }, "WeakHashMap");

    test(() => {
        return new HashBiMap<Number, Number>();
    }, "HashBiMap");

});
