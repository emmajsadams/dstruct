(function(){

    function spec(factory, name) {
        describe(name, function () {
            var queue;

            beforeEach(function () {
                queue = factory();
            });

        });
    }

    define(["structures/queue/LinkedListQueue"], function (LinkedListQueue) {

        describe("Queue", function () {

            spec(function () {
                return new LinkedListQueue();
            }, "LinkedListQueue");

        });

    });

})();