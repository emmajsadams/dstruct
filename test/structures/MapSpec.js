(function () {

    function mapSpec(mapFactory, name) {
        describe(name, function () {
            var map;

            beforeEach(function () {
                map = mapFactory();
            });

            it("Should get a key and value that has been set once from a number.", function () {
                map.set(4, 2);

                expect(map.get(4)).toBe(2);
                expect(map.size()).toBe(1);
            });

            it("Should get a string key and value that has been set once with no other keys have been set.", function () {
                map.set("foo", 2);

                expect(map.get("foo")).toBe(2);
                expect(map.size()).toBe(1);
            });

            it("Should get a string key and value that has been set once with other keys have been set.", function () {
                map.set("foo", 2);
                map.set("foo2", 2);
                map.set("foo3", 2);
                map.set("foo4", 2);
                map.set("foo5", 2);
                map.set("foo6", 2);
                map.set("foo7", 2);

                expect(map.get("foo")).toBe(2);
                expect(map.size()).toBe(7);
            });

        });
    }

    define([
        "structures/maps/HashMap",
        "structures/maps/TreeMap"], function (
        HashMap,
        TreeMap) {

        describe("Maps", function () {

            mapSpec(function () {
                return new HashMap();
            }, "HashMap");

            mapSpec(function () {
                return new TreeMap();
            }, "TreeMap");

        });

    });

})();
