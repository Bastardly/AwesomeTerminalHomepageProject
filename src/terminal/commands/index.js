"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cd_1 = __importDefault(require("./cd"));
const clear_1 = __importDefault(require("./clear"));
function getElements(query) {
    return query.trim().split(' ');
}
exports.getElements = getElements;
exports.methods = {
    cd: {
        method: cd_1.default,
        header: 'cd',
        description: "Change directory, by writing 'cd blog' to access the blog from root.  "
    },
    clear: {
        method: clear_1.default,
        header: 'clear',
        description: "Clears the directory, and brings the console to the top."
    }
};
function runCommand(query, goodiebag) {
    if (!query || !query.length)
        return;
    const elements = getElements(query);
    const commandName = elements[0]; // e.g. cd, clear or ls
    const command = exports.methods[commandName];
    return command && command.method(elements, goodiebag);
}
exports.default = runCommand;
