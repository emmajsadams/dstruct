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

            it("pop should remove and return the only element in the queue", function() {
                queue.push(10);

                expect(queue.pop()).toBe(10);
            });

            it("pop should remove and return the element at index 0 with several elements in a queue", function () {
                queue.push(35);
                queue.push(23);
                queue.push(52);
                queue.push(73);

                expect(queue.pop()).toBe(35);
            });

            it("pop should remove elements in the same order they were pushed in", function() {
                queue.push(5);
                queue.push(10);
                queue.push(15);
                queue.push(20);

                expect(queue.pop()).toBe(5);
                expect(queue.pop()).toBe(10);
                expect(queue.pop()).toBe(15);
                expect(queue.pop()).toBe(20);
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
