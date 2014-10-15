(function () {

    function mapSpec(mapFactory, name) {
        describe(name, function () {
            var map;

            beforeEach(function () {
                map = mapFactory();
            });

            it("size should return zero when get is invoked with key that has been not set", function () {
                expect(map.size()).toBe(0);
            });

            it("get should return null when invoked with a key that has been not set", function () {
                expect(map.get("foo")).toBe(null);
                expect(map.size()).toBe(0);
            });

            it("get should return a value when invoked with a key set to a value and no other keys have been set.", function () {
                map.set("foo", 2);

                expect(map.get("foo")).toBe(2);
                expect(map.size()).toBe(1);
            });

            it("get should return a value when invoked with a key set to a value and other keys have been set.", function () {
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

            it("remove should return a value and remove that key value pair from the map when invoked with a key set to a value and no other keys have been set.", function () {
                map.set("foo", 2);

                expect(map.remove("foo")).toBe(2);
                expect(map.size()).toBe(0);
            });

            it("remove should return a value and remove that key value pair from the map when invoked with a key set to a value and no other keys have been set.", function () {
                map.set("foo", 2);
                map.set("foo2", 2);
                map.set("foo3", 2);
                map.set("foo4", 2);
                map.set("foo5", 2);
                map.set("foo6", 2);
                map.set("foo7", 2);

                expect(map.remove("foo4")).toBe(2);
                expect(map.size()).toBe(6);
            });

            it("forEach should not invoke the map callback when the map is empty", function () {
                var hasInvoked = false;
                map.forEach(function () {
                    hasInvoked = true;
                });

                expect(hasInvoked).toBe(false);
            });

            it("forEach should not invoke the map callback when the map is empty", function () {
                map.set("foo", 2);

                var index = 0;
                map.forEach(function (value, key) {
                    expect(key).toBe("foo");
                    expect(value).toBe(2);
                    index++;
                });

                expect(index).toBe(1);
            });
        });
    }

    define([
        "structures/maps/HashMap",
        "structures/maps/TreeMap"], function (
        HashMap,
        TreeMap) {

        describe("Map", function () {

            mapSpec(function () {
                return new HashMap();
            }, "HashMap");

            mapSpec(function () {
                return new TreeMap();
            }, "TreeMap");

        });

    });

})();
