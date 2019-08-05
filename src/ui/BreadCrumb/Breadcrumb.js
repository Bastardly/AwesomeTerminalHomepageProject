"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Link_1 = __importDefault(require("../Link"));
function getBreadCrumbPaths(path) {
    const elements = path.split('/');
    let latestPath = '';
    const paths = [];
    elements.forEach((element) => {
        if (!element || !element.length)
            return;
        latestPath = latestPath + '/' + element,
            paths.push({
                name: element,
                url: latestPath,
            });
    });
    return paths;
}
exports.getBreadCrumbPaths = getBreadCrumbPaths;
function BreadCrumb({ routeData }) {
    const paths = getBreadCrumbPaths(routeData.url);
    const { hash, query } = routeData.data;
    return (react_1.default.createElement("div", { className: "breadCrumb" },
        " ~",
        react_1.default.createElement(Link_1.default, { name: window.location.hostname, path: "/" }),
        "/",
        paths.map(path => react_1.default.createElement(Link_1.default, { key: path.url, name: path.name, path: path.url })),
        hash && hash.length > 0 && `#${hash}`,
        query && query.length > 0 && `?${query}`,
        ">"));
}
exports.default = BreadCrumb;
