(function(){

    function spec(factory, name) {
        describe(name, function () {
            var queue;

            beforeEach(function () {
                queue = factory();
            });

            it("peek should return the element at index 0", function() {
                queue.push(10);
                queue.push(15);
                queue.push(25);

                expect(queue.peek()).toBe(10);
            });

        });
    }

    define(["structures/queues/LinkedListQueue"], function (LinkedListQueue) {

        describe("Queue", function () {

            spec(function () {
                return new LinkedListQueue();
            }, "LinkedListQueue");

        });

    });

})();
