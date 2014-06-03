(function(){

    function listSpec(listFactory, name) {
        describe(name, function () {
            var list;

            beforeEach(function () {
                list = listFactory();
            });

            it("Should add one number and contain it as the only element.", function () {
                list.add(42);

                expect(list.get(0)).toBe(42);
                expect(list.size()).toBe(1);
            });

            it("Should add multiple numbers and retain expected order.", function () {
                list.add(4);
                list.add(42);
                list.add(44);
                list.add(1997);
                list.add(18405);

                expect(list.get(0)).toBe(4);
                expect(list.get(1)).toBe(42);
                expect(list.get(2)).toBe(44);
                expect(list.get(3)).toBe(1997);
                expect(list.get(4)).toBe(18405);
                expect(list.size()).toBe(5);
            });

        });
    }

    define(["structures/lists/ArrayList", "structures/lists/DoublyLinkedList"], function (ArrayList, DoublyLinkedList) {

        describe("Maps", function () {

            listSpec(function () {
                return new ArrayList();
            }, "ArrayList");

            listSpec(function () {
                return new DoublyLinkedList();
            }, "DoublyLinkedList");

        });

    });

})();
