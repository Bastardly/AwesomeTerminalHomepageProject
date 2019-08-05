"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMiddelMatch(lastElement, hashIsbeforeQuery, hashIndex, queryIndex) {
    const first = hashIsbeforeQuery ? hashIndex : queryIndex;
    const last = !hashIsbeforeQuery ? hashIndex : queryIndex;
    return lastElement.slice(first + 1, last);
}
function handleBothHashAndQuery(lastElement, hashIndex, queryIndex) {
    let hash = '';
    let query = '';
    const hashIsbeforeQuery = hashIndex < queryIndex;
    const match = getMiddelMatch(lastElement, hashIsbeforeQuery, hashIndex, queryIndex);
    if (hashIsbeforeQuery) {
        hash = match;
        query = lastElement.split('?')[1];
    }
    else {
        query = match;
        hash = lastElement.split('#')[1];
    }
    return { hash, query };
}
function getLowestValidIndex(hashIndex, queryIndex) {
    const indexList = [hashIndex, queryIndex].filter(index => index > 0); // removes if index is -1
    const l = indexList.length;
    if (l < 2)
        return indexList[0]; // undefined or remaining index
    return indexList.sort((a, b) => a - b)[0]; // e.g. return smallest
}
function removeHashAndQueryFromLastElement(lastElement, hashIndex, queryIndex) {
    const lowestIndex = getLowestValidIndex(hashIndex, queryIndex);
    if (lowestIndex === undefined) {
        return lastElement;
    }
    return lastElement.slice(0, lowestIndex);
}
// wakkawakka/test#hashi?search=bobbyOlsen || wakkawakka/test?search=bobbyOlsen#haaash
function getHashAndQuery(lastElement) {
    const hashIndex = lastElement.indexOf('#');
    const queryIndex = lastElement.indexOf('?');
    const hasHash = hashIndex !== -1;
    const hasQuery = queryIndex !== -1;
    let hash = '';
    let query = '';
    const isolatedLastElement = removeHashAndQueryFromLastElement(lastElement, hashIndex, queryIndex);
    if (!hasQuery && !hasHash) {
        return { hash, query, lastElement };
    }
    else if (hasHash && hasQuery) {
        return {
            ...handleBothHashAndQuery(lastElement, hashIndex, queryIndex),
            lastElement: isolatedLastElement,
        };
    }
    else if (hasHash && !hasQuery) {
        return {
            query,
            hash: lastElement.split('#')[1],
            lastElement: isolatedLastElement,
        };
    }
    else {
        return {
            query: lastElement.split('?')[1],
            hash,
            lastElement: isolatedLastElement,
        };
    }
}
exports.default = getHashAndQuery;
