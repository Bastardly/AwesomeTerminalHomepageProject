import { RouteProps } from "./routeMap";
import getRouteData, { RouteData } from "./getRouteData";

describe("Router", function() {
    describe("routeMap", function() {
        it("should return correct data when root", function() {
            const { url, title } = getRouteData("/") || ({} as RouteProps);
            expect(url).toBe("/");
            expect(title).toBe("My homepage!");
        });
    });
});
