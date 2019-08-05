"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const router_1 = require("../router");
const App_1 = require("../App");
function Link({ name, path, hash, query, disabled }) {
    const { changeRouteData } = react_1.useContext(App_1.appContext);
    const handleClick = react_1.useCallback(() => changeRouteData(router_1.getRouteData(path, hash, query)), [path, hash, query]);
    return react_1.default.createElement("button", { onClick: handleClick, disabled: disabled }, name);
}
exports.default = Link;
