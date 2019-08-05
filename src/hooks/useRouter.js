"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useEventListener_1 = __importDefault(require("./useEventListener"));
const router_1 = require("../router");
const terminal_1 = require("../terminal");
function useRouter(routeData, changeRouteData) {
    useEventListener_1.default('popstate', () => {
        const { pathname, hash, search } = window.location;
        changeRouteData(router_1.getRouteData(pathname, hash, search));
    });
    const { url, data: { hash, query } } = routeData;
    react_1.useEffect(() => {
        router_1.updateHistory(routeData);
        terminal_1.getFocus();
    }, [url, hash, query]);
}
exports.default = useRouter;
