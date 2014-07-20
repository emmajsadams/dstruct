(function(){

    function spec(factory, name) {
        describe(name, function () {
            var multiSet;

            beforeEach(function () {
                multiSet = factory();
            });
        });
    }

    define([
        "structures/multiSets/HashMultiSet",
        "structures/multiSets/TreeMultiSet"], function (
        HashMultiSet,
        TreeMultiSet) {

        describe("MultiSet", function () {

            spec(function () {
                return new HashMultiSet();
            }, "HashMultiSet");

            spec(function () {
                return new TreeMultiSet();
            }, "TreeMultiSet");

        });

    });

})();