import { GoodiebagProps } from '..'
import { getRouteData } from '../../router';

function buildNewPath(path: string) {
    let updatedPath;
//     const currentRouteElements = getCurrentRoute().split('/');
//     const currentRouteElements = currentRoute

//     return updatedPath;
}

function getBetweenRegex(hashIsbeforeQuery: boolean): string {
    const firstChar = hashIsbeforeQuery ? '#' : '?'
    const lastChar = hashIsbeforeQuery ? '?' : '#'
    return `(?<=${firstChar}).*?(?=${lastChar})`
}

type HashAndQuery = {
    hash: string,
    query: string,
}

function handleBothHashAndQuery(lastElement: string, hashIndex: number, queryIndex: number): HashAndQuery {
    let hash = '';
    let query = '';
    const hashIsbeforeQuery = hashIndex < queryIndex;
    const matches = lastElement.match(getBetweenRegex(hashIsbeforeQuery))
    const firstMatch = matches && matches[0] || '';
    if (hashIsbeforeQuery) {
        hash = firstMatch;
        query = lastElement.split('?')[1]
    } else {
        query = firstMatch;
        hash = lastElement.split('#')[1]
    }
    return {hash, query};
}


// wakkawakka/test#hashi?search=bobbyOlsen || wakkawakka/test?search=bobbyOlsen#haaash
export function getHashAndQuery(url: string): HashAndQuery & {lastElement: string} {
    const lastElement = url.split('/').pop() || ''
    const hashIndex = lastElement.indexOf('#');
    const queryIndex = lastElement.indexOf('?');
    const hasHash = hashIndex !== -1
    const hasQuery = queryIndex !== -1
    let hash = '';
    let query = '';

    if (!hasQuery && !hasHash) {
        return { hash, query, lastElement}
    } else if (hasHash && hasQuery) {
        return ({
            ...handleBothHashAndQuery(lastElement, hashIndex, queryIndex),
            lastElement,
        })
    } else if (hasHash && !hasQuery) {
        return {
            query,
            hash: lastElement.split('#')[1],
            lastElement,
        }
    } else {
        return {
            query: lastElement.split('?')[1],
            hash,
            lastElement,
        }
    }
}

export default function cd(elements: string[], goodiebag: GoodiebagProps) {
    let url = elements[1];

    // validateUrl ## ??

    const { hash, query, lastElement } = getHashAndQuery(url)

    if (!url) url = '/';
    if (url.slice(0,2) === '..') {
        // begins with .. - like cd ../../blog
        // url = buildNewPath(path)
    }
    if (url.length > 1) {
        // blog should be /blog
        if (url.startsWith('/')) {
            url = '/' + url
        }
        if (url.endsWith('/')) {
            url = url.slice(0, url.length -1) // /blog/ should be /blog
        }
    }


    // valider for fejl fx. hvis path er undefined
    // valider for ..
    // valider for om path er skrevet korrekt fx. blog => /blog
    // changeCurrentRoute(path)
    const routeData = getRouteData(url, hash, query)
    // @ts-ignore
    goodiebag.changeRouteData(routeData)
}