"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const enzyme_1 = require("enzyme");
const terminal_1 = __importDefault(require("../terminal"));
describe('Terminal', function () {
    describe('UI', function () {
        it('should render Terminal with one input', function () {
            const wrapper = enzyme_1.shallow(react_1.default.createElement(terminal_1.default, null));
            const terminal = wrapper.find('input');
            expect(terminal && terminal.length).toBe(1);
        });
    });
});
