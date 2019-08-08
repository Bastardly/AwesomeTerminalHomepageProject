import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { getRouteData, RouteData } from "src/router";

import App from "./App";

let container: any;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

window.scrollTo = jest.fn();

describe("App", () => {
    test("should render", function() {
        act(() => {
            ReactDOM.render(<App />, container);
        });
    });

    describe("useRouter hooks", () => {
        test("should generate a document title when App loads", function() {
            expect(document.title).toBe("My homepage!");
        });

        test("should listen for history changes", function() {
            const { data, title, url } = getRouteData("/blog") as RouteData;
            window.history.pushState(data, title, url);
            expect(window.location.pathname).toBe("/blog");
        });
    });
});
