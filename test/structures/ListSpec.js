(function(){

    function listSpec(factory, name) {
        describe(name, function () {
            var list;

            beforeEach(function () {
                list = factory();
            });

            it("Should add at index 0 with other elements in list", function () {
               list.addAtIndex(0, 42);
               list.addAtIndex(0, 39);
               list.addAtIndex(0, 2012);

               expect(list.get(0)).toBe(2012);
               expect(list.get(1)).toBe(39);
               expect(list.get(2)).toBe(42);
            });

            it("Set method should correctly change the number at the given index(middle of list)", function() {
                list.addAtIndex(0, 23);
                list.addAtIndex(0, 35024);
                list.addAtIndex(0, 4952);

                list.set(1, 42);

                expect(list.get(1)).toBe(42);
            });

            it("Set method should correctly change the number at the front of the list)", function() {
                list.addAtIndex(0, 23);
                list.addAtIndex(0, 35024);
                list.addAtIndex(0, 4952);

                list.set(0, 42);

                expect(list.get(0)).toBe(42);
            });

            it("Set method should correctly change the number at the end of the list)", function() {
                list.addAtIndex(0, 23);
                list.addAtIndex(0, 35024);
                list.addAtIndex(0, 4952);

                list.set(2, 42);

                expect(list.get(2)).toBe(42);
            });

            it("indexOf should return the correct index of all elements in the list at any index", function() {
                list.addAtIndex(0, 5);
                list.addAtIndex(1, 10);
                list.addAtIndex(2, 15);
                list.addAtIndex(3, 20);

                expect(list.indexOf(5)).toBe(0);
                expect(list.indexOf(10)).toBe(1);
                expect(list.indexOf(15)).toBe(2);
                expect(list.indexOf(20)).toBe(3);
            });

            //currently failing to do lack of implementation.
            it("removeAtIndex in the middle of the list should correctly shift the list over", function() {
                list.addAtIndex(0, 5);
                list.addAtIndex(1, 10);
                list.addAtIndex(2, 15);
                list.addAtIndex(3, 20);

                list.removeAtIndex(2);

                expect(list.indexOf(20)).toBe(2);
            });

            it("removeAtIndex from the 0 index with other items in the list", function() {
                list.addAtIndex(0, 5);
                list.addAtIndex(1, 10);
                list.addAtIndex(2, 15);

                list.removeAtIndex(0);

                expect(list.indexOf(10)).toBe(0);
            });

            //Causes Karma to hang and unable to open console and do more debugging

            // it("removeAtIndex correctly removes the last element from the last index in the list", function() {
            //     list.addAtIndex(0, 5);
            //     list.addAtIndex(1, 10);
            //     list.addAtIndex(2, 15);
            //
            //     list.removeAtIndex(2);
            //
            //     expect(list.indexOf(15)).toBe(-1);
            // });

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
