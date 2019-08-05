"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
function notFound() {
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", null, "Hey Dude!"),
        react_1.default.createElement("h2", null, "This is the annoying 404 page"),
        react_1.default.createElement("p", null,
            "It means that I can't find the page you're looking for. And I've searched freaking everywhere! I mean, it's gone - Like Puff the Magic Dragon gone. Which is a fact that makes me kinda nostalgic, and a bit sad.",
            react_1.default.createElement("br", null),
            "...Even though the song was about smoking weed."),
        react_1.default.createElement("p", null, "Anyhow, my guess it that you've had one G&T too many, and that your fingers aren't working properly. It happens, I know!")));
}
exports.default = notFound;
