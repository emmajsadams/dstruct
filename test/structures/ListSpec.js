(function(){

    function listSpec(listFactory, name) {
        describe(name, function () {
            var list;

            beforeEach(function () {
                list = listFactory();
            });

            it("Should add at index 0 with other elements in list", function () {
               list.addAtIndex(0, 42);
               list.addAtIndex(0, 39);
               list.addAtIndex(0, 2012);

               expect(list.get(0)).toBe(2012);
               expect(list.get(1)).toBe(39);
               expect(list.get(2)).toBe(42);
            });

        });
    }

    define([
        "structures/lists/ArrayList",
        "structures/lists/DoublyLinkedList"], function (
        ArrayList,
        DoublyLinkedList) {

        describe("List", function () {

            listSpec(function () {
                return new ArrayList();
            }, "ArrayList");

            listSpec(function () {
                return new DoublyLinkedList();
            }, "DoublyLinkedList");

        });

    });

})();
