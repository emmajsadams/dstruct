/// <reference path="../../References.d.ts"/>

function test(mapFactory: () => dsa.collections.Map<number, number>, name: string) {
    describe(name, () => {
        var map: dsa.collections.Map<number, number>;

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
        return new dsa.collections.HashMap<number, number>();
    }, "HashMap");

    test(() => {
        return new dsa.collections.TreeMap<number, number>();
    }, "TreeMap");

});
