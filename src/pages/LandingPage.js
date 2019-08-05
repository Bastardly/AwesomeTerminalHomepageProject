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
const mockText_1 = __importDefault(require("../mockText"));
const yolo = '<YOLO />';
function LandingPage() {
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement("h1", null,
            "Yo Bro! ",
            yolo),
        react_1.default.createElement("div", null, mockText_1.default)));
}
exports.default = LandingPage;
