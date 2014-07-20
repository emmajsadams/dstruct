(function(){

    function spec(factory, name) {
        describe(name, function () {
            var collection;

            beforeEach(function () {
                collection = factory();
            });
            
            it("Should add one number and contain it as the only element.", function () {
                collection.add(42);

                expect(collection.get(0)).toBe(42);
                expect(collection.size()).toBe(1);
            });

            it("Should add multiple numbers and retain expected order.", function () {
                collection.add(4);
                collection.add(42);
                collection.add(44);
                collection.add(1997);
                collection.add(18405);

                expect(collection.get(0)).toBe(4);
                expect(collection.get(1)).toBe(42);
                expect(collection.get(2)).toBe(44);
                expect(collection.get(3)).toBe(1997);
                expect(collection.get(4)).toBe(18405);
                expect(collection.size()).toBe(5);
            });

            it("Should add multiple numbers and clear them.", function () {
                collection.add(4);
                collection.add(42);
                collection.add(44);
                collection.clear();

                expect(collection.size()).toBe(0);
                expect(collection.isEmpty()).toBe(true);
            });

            it("Should find an element added to a collection that contains multiple elements.", function () {
                collection.add(4);
                collection.add(42);
                collection.add(44);
                collection.add(1997);

                expect(collection.has(1997)).toBe(true);
            });

            it("Should not find in a collection with multiple elements when that element does not exist.", function () {
                collection.add(42);
                collection.add(44);
                collection.add(34384937859);

                expect(collection.has(1814)).toBe(false);
            });
        });
    }

    define([
        "structures/lists/ArrayList",
        "structures/lists/DoublyLinkedList"], function (
        ArrayList,
        DoublyLinkedList) {

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
