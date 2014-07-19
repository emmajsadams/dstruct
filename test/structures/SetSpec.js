(function(){

    function spec(factory, name) {
        describe(name, function () {
            var set;

            beforeEach(function () {
                set = factory();
            });

        });
    }

    define([
        "structures/sets/HashSet",
        "structures/sets/TreeSet"], function (
        HashSet,
        TreeSet) {

        describe("Set", function () {

            spec(function () {
                return new HashSet();
            }, "HashSet");

            spec(function () {
                return new TreeSet();
            }, "TreeSet");

        });

    });

})();