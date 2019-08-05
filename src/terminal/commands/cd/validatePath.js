"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function splitCount(char, str) {
    return str.split(char).length;
}
function noHashOrQueriesInMiddleElements(char, pathElementsWithoutLast) {
    return pathElementsWithoutLast.some(el => el.indexOf(char) !== -1);
}
function tooManyDots(path) {
    return path.indexOf('...') !== -1;
}
function validatepath(path) {
    const pathElements = path.split('/');
    pathElements.pop(); // Removes last element
    const errors = [
        splitCount('#', path) > 2 ? "You can only use one hash tag." : '',
        splitCount('?', path) > 2 ? "You can only use one query tag." : '',
        noHashOrQueriesInMiddleElements('#', pathElements) ? "You can only use a hash on the last item." : '',
        noHashOrQueriesInMiddleElements('?', pathElements) ? "You can only use a query on the last item." : '',
        tooManyDots(path) ? "Seems like you've written a dot too many ..." : '',
    ];
    return errors.reduce((errorMsg, error) => {
        if (!error.length) {
            return errorMsg;
        }
        errorMsg = errorMsg + error + ' ';
        return errorMsg;
    }, '').trim();
}
exports.default = validatepath;
