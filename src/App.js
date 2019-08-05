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
const router_1 = __importStar(require("./router"));
const useRouter_1 = __importDefault(require("./hooks/useRouter"));
const terminal_1 = __importDefault(require("./terminal"));
const { pathname, hash, search } = window.location;
const initialRouteData = router_1.getRouteData(pathname, hash, search);
const initialContent = react_1.default.createElement("div", null, "Hello world!");
exports.appContext = react_1.createContext({
    changeRouteData: () => undefined,
    routeData: initialRouteData,
    changeContent: () => undefined,
    content: [initialContent],
});
function App() {
    const [routeData, changeRouteData] = react_1.useState(initialRouteData);
    const [content, changeContent] = react_1.useState(initialContent);
    useRouter_1.default(routeData, changeRouteData);
    return (react_1.default.createElement(exports.appContext.Provider, { value: { changeRouteData, routeData, content, changeContent } },
        react_1.default.createElement(router_1.default, null),
        react_1.default.createElement(terminal_1.default, null)));
}
exports.App = App;
