/// <reference path="../../References.d.ts"/>

describe("Tree", () => {

    describe("RedBlackTree", () => {
        var tree: dsa.collections.RedBlackTree<number, number>;

        beforeEach(() => {
            tree = new dsa.collections.RedBlackTree<number, number>();
        });

        it("Should find a key and value after inserted once.", () => {
            tree.insert(4, 2);

            expect(tree.get(4).value === 2);
            expect(tree.size() === 1);
        });

        it("Should find a key and value after same key is inserted multiple times.", () => {
            tree.insert(4, 2);
            tree.insert(4, 2);
            tree.insert(4, 2);
            tree.insert(4, 2);
            tree.insert(4, 4);

            expect(tree.get(4).value === 4);
            expect(tree.size() === 1);
        });
    })

});
