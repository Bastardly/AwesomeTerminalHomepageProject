"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../../router");
const validatePath_1 = __importDefault(require("./cd/validatePath"));
const getHashAndQuery_1 = __importDefault(require("./cd/getHashAndQuery"));
function stitchAbsolutePathTogether(elements) {
    return elements.reduce((final, element) => {
        if (!element || !element.length)
            return final;
        return final + '/' + element;
    }, '');
}
function createRouteDataFromAbsolutePath(path) {
    let elements = path.split('/');
    const lastPathElement = path.split('/').pop() || '';
    const { hash, query, lastElement } = getHashAndQuery_1.default(lastPathElement);
    elements.pop(); // removes old last element with hash and query
    elements.push(lastElement); // adds clean element
    const absolutePath = stitchAbsolutePathTogether(elements) || '/';
    return {
        ...router_1.getRouteData(absolutePath),
        data: {
            hash,
            query
        }
    };
}
function createAbsolutePath(path, currentRouteData) {
    let currentRoute = currentRouteData.url;
    let elements = currentRoute.split('/');
    let pathElements = path.split('/');
    while (pathElements[0] === '..') {
        elements && elements.pop();
        pathElements.shift();
    }
    return stitchAbsolutePathTogether([...elements, ...pathElements]);
}
function cd(elements, goodiebag) {
    let path = elements[1];
    if (!path)
        return; // E.g. change nothing
    // validatepath
    const errorMsg = validatePath_1.default(path);
    if (errorMsg && errorMsg.length) {
        goodiebag.setErrorMsg(errorMsg);
        return;
    }
    if (path === '/') {
        goodiebag.changeRouteData(router_1.getRouteData('/'));
    }
    if (path.length > 1) {
        // format correctly from start
        if (path.endsWith('/')) {
            path = path.slice(0, path.length - 1); // blog/ should be /blog
        }
        const isAbsolutePath = path.startsWith('/');
        // if path is an absolute path and start route from /
        if (!isAbsolutePath) {
            path = createAbsolutePath(path, goodiebag.routeData);
        }
        goodiebag.changeRouteData(createRouteDataFromAbsolutePath(path));
    }
}
exports.default = cd;
