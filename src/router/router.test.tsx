import getRouteData from "./getRouteData";

describe("Router", function() {
    describe("getRouteData", function() {
        it("should return correct url when root", function() {
            const { url } = getRouteData("/");
            expect(url).toBe("/");
        });

        it("should return correct url when using route paths", function() {
            const { url } = getRouteData("/blog");
            expect(url).toBe("/blog");
        });

        it("should return correct url when using sub subpaths", function() {
            const { url } = getRouteData("/blog/sub");
            expect(url).toBe("/blog/sub");
        });
    });
});
