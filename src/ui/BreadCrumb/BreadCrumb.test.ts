import { getBreadCrumbPaths } from "./Breadcrumb";

describe("BreadCrumb", function() {
    describe("getBreadCrumbPaths", function() {
        it("should return empty array when root", function() {
            const paths = getBreadCrumbPaths("/");
            expect(paths.length).toBe(0);
        });
        it("should return correct name and path for simple path", function() {
            const paths = getBreadCrumbPaths("/KittensAreEvil");
            expect(paths.length).toBe(1);
            expect(paths[0].url).toBe("/KittensAreEvil");
            expect(paths[0].name).toBe("KittensAreEvil");
        });
        it("should return correct name and path for deep paths", function() {
            const paths = getBreadCrumbPaths(
                "/KittensAreEvil/fluffyTakeOverPlan/4",
            );
            expect(paths.length).toBe(3);
            expect(paths[0].url).toBe("/KittensAreEvil");
            expect(paths[0].name).toBe("KittensAreEvil");

            expect(paths[1].url).toBe("/KittensAreEvil/fluffyTakeOverPlan");
            expect(paths[1].name).toBe("fluffyTakeOverPlan");

            expect(paths[2].url).toBe("/KittensAreEvil/fluffyTakeOverPlan/4");
            expect(paths[2].name).toBe("4");
        });
    });
});
