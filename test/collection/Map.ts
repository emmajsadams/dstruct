/// <reference path="../../References.d.ts"/>


//TODO: make this set of tests work with objects, to test the key equality with non primitives.
function test(mapFactory: () => dsa.structs.Map<Number, Number>, name: string) {
    describe(name, () => {
        var map: dsa.structs.Map<Number, Number>;

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
        return new dsa.structs.HashMap<Number, Number>();
    }, "HashMap");

    test(() => {
        return new dsa.structs.TreeMap<Number, Number>();
    }, "TreeMap");

    test(() => {
        return new dsa.structs.WeakHashMap<Number, Number>();
    }, "WeakHashMap");

    test(() => {
        return new dsa.structs.HashBiMap<Number, Number>();
    }, "HashBiMap");

});
