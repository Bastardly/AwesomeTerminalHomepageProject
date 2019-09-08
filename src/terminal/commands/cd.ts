import getRouteData from "src/router/getRouteData";
import validatepath from "./cd/validatePath";
import getHashAndQuery from "./cd/getHashAndQuery";

function stitchAbsolutePathTogether(elements: string[]) {
    return elements.reduce((final, element) => {
        if (!element || !element.length) return final;
        return final + "/" + element;
    }, "");
}

function createRouteDataFromAbsolutePath(path: string): App.RouteData {
    const elements = path.split("/");
    const lastPathElement = path.split("/").pop() || "";
    const { hash, query, lastElement } = getHashAndQuery(lastPathElement);
    let last = lastElement;
    elements.pop(); // removes old last element with hash and query
    if (last === "") {
        // For instance, if path is blog/#myHash, last element will be and empty string, therfore we will remove an extra to get the correct one.
        last = elements.pop() || "";
    }
    elements.push(last); // adds clean element
    const absolutePath = stitchAbsolutePathTogether(elements) || "/";
    return {
        ...getRouteData(absolutePath),
        data: {
            hash,
            query,
        },
    };
}

function createAbsolutePath(path: string, currentRouteData: App.RouteData) {
    const currentRoute = currentRouteData.url;
    const elements = currentRoute.split("/");
    const pathElements = path.split("/");
    while (pathElements[0] === "..") {
        elements && elements.pop();
        pathElements.shift();
    }
    return stitchAbsolutePathTogether([...elements, ...pathElements]);
}

export default function cd(
    elements: string[],
    goodiebag: App.Terminal.GoodiebagProps,
) {
    let path = elements[1];
    if (!path) return; // E.g. change nothing

    // validatepath
    const errorMsg = validatepath(path);
    if (errorMsg && errorMsg.length) {
        goodiebag.setErrorMsg(errorMsg);
        return;
    }
    if (path === "/") {
        goodiebag.changeRouteData(getRouteData("/"));
    }

    if (path.length > 1) {
        // format correctly from start
        if (path.endsWith("/")) {
            path = path.slice(0, path.length - 1); // blog/ should be /blog
        }
        const isAbsolutePath = path.startsWith("/");
        // if path is an absolute path and start route from /
        if (!isAbsolutePath) {
            path = createAbsolutePath(path, goodiebag.routeData);
        }
        goodiebag.changeRouteData(createRouteDataFromAbsolutePath(path));
    }
}
