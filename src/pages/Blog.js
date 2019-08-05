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
function Blog() {
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement("h1", null, "Blog"),
        react_1.default.createElement("div", null, "This is my blog")));
}
exports.default = Blog;
