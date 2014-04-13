describe("MainController", function () {
    beforeEach(function () {
    });

    it("Should have a number after added", function () {
        var multiSet = new tsds.MultiSet();
        multiSet.add(4);
        expect(multiSet.has(4));
    });
});
