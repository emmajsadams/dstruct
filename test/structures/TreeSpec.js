(function () {

    function treeSpec(treeFactory, name) {
        describe(name, function () {
            var tree;

            beforeEach(function () {
                tree = treeFactory();
            });


            it("Should find a key and value after inserted once.", function () {
                tree.insert(4, 2);

                expect(tree.get(4) === 2);
                expect(tree.size() === 1);
            });

            it("Should find a key and value after same key is inserted multiple times.", function () {
                tree.insert(4, 2);
                tree.insert(4, 2);
                tree.insert(4, 2);
                tree.insert(4, 2);
                tree.insert(4, 4);

                expect(tree.get(4) === 4);
                expect(tree.size() === 1);
            });

            it("Should remove a key inserted.", function () {
                tree.insert(4, 2);
                tree.insert(2, 2);
                tree.insert(4, 4);
                tree.remove(4);

                expect(tree.get(4) === null);
                expect(tree.size() === 1);
            });
        });
    }

    define(["structures/trees/RedBlackTree"], function (RedBlackTree) {

        describe("Trees", function () {

            treeSpec(function () {
                return new RedBlackTree();
            }, "RedBlackTree");

        });

    });

})
();