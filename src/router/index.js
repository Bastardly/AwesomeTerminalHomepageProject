"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const Fallback_1 = __importDefault(require("./Fallback"));
const App_1 = require("../App");
exports.routes = [
    {
        title: "My homepage!",
        url: "/"
    },
    {
        title: "Blog!",
        url: "/blog"
    },
];
function getRouteData(pathname = '', hash = '', query = '') {
    // Let's see if the given url exist.
    const { title = null, url = null } = exports.routes.find(route => route.url === pathname) || {};
    return {
        title: title || 'Page not found',
        url: url || '/404',
        data: {
            hash,
            query,
        },
    };
}
exports.getRouteData = getRouteData;
function updateHistory(routeData) {
    window.history.pushState(routeData.data, routeData.title, routeData.url);
}
exports.updateHistory = updateHistory;
// Routes
const LandingPage = react_1.lazy(() => Promise.resolve().then(() => __importStar(require("../pages/LandingPage"))));
const Blog = react_1.lazy(() => Promise.resolve().then(() => __importStar(require("../pages/Blog"))));
const NotFound = react_1.lazy(() => Promise.resolve().then(() => __importStar(require("../404"))));
function Routes({ url }) {
    switch (url) {
        case "/": return LandingPage;
        case "/blog": return Blog;
        default: return NotFound;
    }
}
function TargetRoute({ url, hideRoute }) {
    const { content, changeContent } = react_1.useContext(App_1.appContext);
    react_1.useEffect(() => {
        changeContent([...content, Routes({ url })]);
    }, [url]);
    if (!content || !content.length)
        return react_1.default.createElement("div", null);
    return react_1.default.createElement(react_1.Fragment, null, content.map((Component, index) => {
        return (react_1.default.createElement(react_1.Fragment, { key: index },
            react_1.default.createElement(react_1.Suspense, { fallback: react_1.default.createElement(Fallback_1.default, null) },
                react_1.default.createElement(Component, null))));
    }));
}
exports.default = TargetRoute;
