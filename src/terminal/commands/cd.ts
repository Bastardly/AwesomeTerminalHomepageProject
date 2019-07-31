import { GoodiebagProps } from '..'
import { getRouteData } from '../../router';

function buildNewPath(path: string) {
    let updatedPath;
//     const currentRouteElements = getCurrentRoute().split('/');
//     const currentRouteElements = currentRoute

//     return updatedPath;
}

// I fucking hate regex, this people can understand and will work wil all chars!
function getMiddelMatch(lastElement: string, hashIsbeforeQuery: boolean, hashIndex: number, queryIndex: number): string {
    const first = hashIsbeforeQuery ? hashIndex : queryIndex;
    const last = !hashIsbeforeQuery ? hashIndex : queryIndex;
    return lastElement.slice(first + 1, last);
}

type HashAndQuery = {
    hash: string,
    query: string,
}

function handleBothHashAndQuery(lastElement: string, hashIndex: number, queryIndex: number): HashAndQuery {
    let hash = '';
    let query = '';
    const hashIsbeforeQuery = hashIndex < queryIndex;
    const match = getMiddelMatch(lastElement, hashIsbeforeQuery, hashIndex, queryIndex)
    if (hashIsbeforeQuery) {
        hash = match;
        query = lastElement.split('?')[1]
    } else {
        query = match;
        hash = lastElement.split('#')[1]
    }
    return {hash, query};
}


// wakkawakka/test#hashi?search=bobbyOlsen || wakkawakka/test?search=bobbyOlsen#haaash
export function getHashAndQuery(url: string): HashAndQuery {
    const lastElement = url.split('/').pop() || ''
    const hashIndex = lastElement.indexOf('#');
    const queryIndex = lastElement.indexOf('?');
    const hasHash = hashIndex !== -1
    const hasQuery = queryIndex !== -1
    let hash = '';
    let query = '';

    if (!hasQuery && !hasHash) {
        return { hash, query}
    } else if (hasHash && hasQuery) {
        return handleBothHashAndQuery(lastElement, hashIndex, queryIndex)
    } else if (hasHash && !hasQuery) {
        return {
            query,
            hash: lastElement.split('#')[1],
        }
    } else {
        return {
            query: lastElement.split('?')[1],
            hash,
        }
    }
}

export default function cd(elements: string[], goodiebag: GoodiebagProps) {
    let url = elements[1];

    // validateUrl ## ??

    const { hash, query } = getHashAndQuery(url)

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