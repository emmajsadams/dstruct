(function(){

    function spec(factory, name) {
        describe(name, function () {
            var table;

            beforeEach(function () {
                table = factory();
            });

        });
    }

    define(["structures/tables/MapBasedTable"], function (MapBasedTable) {

        describe("Table", function () {

            spec(function () {
                return new MapBasedTable();
            }, "MapBasedTable");

        });

    });

})();