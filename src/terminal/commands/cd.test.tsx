import getHashAndQuery from "./cd/getHashAndQuery";
import { getElements } from "./index";
import cd from "./cd";

type RunCdQuery = {
    routeData: App.RouteData;
    errorMsg: string;
};

const defaultRouteData: App.RouteData = {
    url: "/",
    title: "The Title",
    data: {
        hash: "",
        query: "",
    },
};

const modifiedRouteData: App.RouteData = {
    ...defaultRouteData,
    url: "/blog",
};

const modifiedRouteData2: App.RouteData = {
    ...defaultRouteData,
    url: "/meDoNottyExisto/somethingBad/wowser#hashy?food=meLike",
};

function runCdQuery(
    query: string,
    optionalRouteData?: App.RouteData,
): RunCdQuery {
    let routeData: App.RouteData = optionalRouteData || defaultRouteData;
    let errorMsg = "";

    const mockGoodiebag = {
        routeData,
        setInputValue: (s: string) => s,
        changeRouteData: (val: App.RouteData) => (routeData = val), // So we can test the callback result
        setErrorMsg: (err: string) => (errorMsg = err),
    };
    const elements = getElements(query);
    // @ts-ignore -  For the sake of the test, our methods have been changed
    cd(elements, mockGoodiebag);
    return { routeData, errorMsg };
}

describe("Commands", function() {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("cd", function() {
        test("should render absolute root route correctly", function() {
            const { routeData } = runCdQuery("cd /");
            expect(routeData.url).toBe("/");
        });

        test("should render absolute route paths correctly", function() {
            const { routeData } = runCdQuery("cd /blog");
            expect(routeData.url).toBe("/blog");
        });
        test("should return route paths correctly if it has hash", function() {
            const { routeData } = runCdQuery("cd blog#itWorks");
            expect(routeData.url).toBe("/blog");
        });
        test("should render routeData url correctly", function() {
            const { routeData } = runCdQuery("cd blog/");
            expect(routeData.url).toBe("/blog");
        });
        test("should return invalid url error message", function() {
            const { errorMsg } = runCdQuery("cd blog#hash/invalid");
            expect(errorMsg).toBe("You can only use a hash on the last item.");
        });
        test("should return two error messages", function() {
            const { errorMsg } = runCdQuery("cd blog#ha?sh/invalid");
            expect(errorMsg).toBe(
                "You can only use a hash on the last item. You can only use a query on the last item.",
            );
        });
        test("should be able to handle /#", function() {
            const { routeData } = runCdQuery("cd blog/#itWorks");
            expect(routeData.url).toBe("/blog");
            expect(routeData.data.hash).toBe("itWorks");
        });
        test("should return error message if two hashes are used messages", function() {
            const { errorMsg } = runCdQuery("cd blog/valid##hashieDashie");
            expect(errorMsg).toBe("You can only use one hash tag.");
        });

        test("should return error message if two query tags are used messages", function() {
            const { errorMsg } = runCdQuery("cd blog/valid??hashieDashie");
            expect(errorMsg).toBe("You can only use one query tag.");
        });

        test("should be able to go back from blog to root in route", function() {
            const { routeData } = runCdQuery("cd ..", modifiedRouteData);
            expect(routeData.url).toBe("/");
        });

        test("should be able to go back from blog to root and pass on hash and query", function() {
            const { routeData } = runCdQuery(
                "cd ../#foo?search=bar",
                modifiedRouteData,
            );
            expect(routeData.url).toBe("/");
            expect(routeData.data.hash).toBe("foo");
            expect(routeData.data.query).toBe("search=bar");
        });

        test("should be able to navigate in routes and and add new hash and query", function() {
            const { routeData } = runCdQuery(
                "cd ../../../blog#newHash?me=works",
                modifiedRouteData2,
            );
            expect(routeData.url).toBe("/blog");
            expect(routeData.data.hash).toBe("newHash");
            expect(routeData.data.query).toBe("me=works");
        });

        describe("getHashAndQuery", function() {
            test("should return url Hash correctly", function() {
                const url = "subpath#meHash";
                const { hash, query, lastElement } = getHashAndQuery(url);
                expect(hash).toBe("meHash");
                expect(query).toBe("");
                expect(lastElement).toBe("subpath");
            });

            test("should return url Query correctly", function() {
                const url = "subpath?me=question";
                const { hash, query, lastElement } = getHashAndQuery(url);
                expect(hash).toBe("");
                expect(query).toBe("me=question");
                expect(lastElement).toBe("subpath");
            });
            test("should get url Hash And Query correctly", function() {
                const url = "subpath#meHash?me=question";
                const { hash, query, lastElement } = getHashAndQuery(url);
                expect(hash).toBe("meHash");
                expect(query).toBe("me=question");
                expect(lastElement).toBe("subpath");
            });
            test("should get url Hash And Query correctly when written reverse", function() {
                const url = "subpath?me=question#meHash";
                const { hash, query, lastElement } = getHashAndQuery(url);
                expect(hash).toBe("meHash");
                expect(query).toBe("me=question");
                expect(lastElement).toBe("subpath");
            });
            test("should keep hash and query and return lastElement as empty string", function() {
                const url = "?me=question#meHash";
                const { hash, query, lastElement } = getHashAndQuery(url);
                expect(hash).toBe("meHash");
                expect(query).toBe("me=question");
                expect(lastElement).toBe("");
            });
        });
    });
});
