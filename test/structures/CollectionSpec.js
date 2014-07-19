(function(){

    function spec(factory, name) {
        describe(name, function () {
            var iterable;

            beforeEach(function () {
                iterable = factory();
            });
            
            it("Should add one number and contain it as the only element.", function () {
                iterable.add(42);

                expect(iterable.get(0)).toBe(42);
                expect(iterable.size()).toBe(1);
            });

            it("Should add multiple numbers and retain expected order.", function () {
                iterable.add(4);
                iterable.add(42);
                iterable.add(44);
                iterable.add(1997);
                iterable.add(18405);

                expect(iterable.get(0)).toBe(4);
                expect(iterable.get(1)).toBe(42);
                expect(iterable.get(2)).toBe(44);
                expect(iterable.get(3)).toBe(1997);
                expect(iterable.get(4)).toBe(18405);
                expect(iterable.size()).toBe(5);
            });
            
        });
    }

    define([
        "structures/lists/ArrayList",
        "structures/lists/DoublyLinkedList"], function (
        ArrayList,
        DoublyLinkedList,
        LinkedListQueue) {

        describe("Collection", function () {

            spec(function () {
                return new ArrayList();
            }, "ArrayList");

            spec(function () {
                return new DoublyLinkedList();
            }, "DoublyLinkedList");

            // TODO: add rest of collections

        });

    });

})();
