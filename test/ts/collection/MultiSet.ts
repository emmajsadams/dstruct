/// <reference path="../../References.d.ts"/>

describe("MultiSet", () => {

    beforeEach(() => {

    });

    it("Should have a number after added", () => {
        var multiSet = new dsa.collections.MultiSet<number>();
        multiSet.add(4);
        expect(multiSet.has(4));
    });

    it("Should have a ")
});
