/// <reference path="../References.d.ts"/>

describe("MainController", () => {

    beforeEach(() => {

    });

    it("Should have a number after added", () => {
        var multiSet = new tsds.MultiSet<number>();
        multiSet.add(4);
        expect(multiSet.has(4));
    });

});
