import { GoodiebagProps } from '..'
import { getRouteData, RouteData } from '../../router';
import validatepath from './cd/validatePath';
import getHashAndQuery from './cd/getHashAndQuery';

function stitchAbsolutePathTogether(elements: string[]) {
    return elements.reduce((final, element) => {
        if (!element || !element.length) return final
        return final + '/' + element
    }, '')
}

function createRouteDataFromAbsolutePath(path: string): RouteData {
    let elements = path.split('/')
    const lastPathElement = path.split('/').pop() || ''
    const { hash, query, lastElement } = getHashAndQuery(lastPathElement)
    elements.pop(); // removes old last element with hash and query
    elements.push(lastElement) // adds clean element
    const absolutePath = stitchAbsolutePathTogether(elements) || '/'
    console.log('Absolute Path *******', absolutePath)
    return {
        ...getRouteData(absolutePath),
        data: {
            hash,
            query
        }
    }
}

function createAbsolutePath(path: string, currentRouteData: RouteData) {
    let currentRoute = currentRouteData.url;
    let elements = currentRoute.split('/');
    let pathElements = path.split('/');
    while(pathElements[0] === '..') {
        elements && elements.pop()
        pathElements.shift()
    }
    return stitchAbsolutePathTogether([...elements, ...pathElements])
}

export default function cd(elements: string[], goodiebag: GoodiebagProps) {
    let path = elements[1];
    if (!path) return; // E.g. change nothing

    // validatepath
    const errorMsg = validatepath(path)
    if (errorMsg && errorMsg.length) {
        goodiebag.setErrorMsg(errorMsg)
        return;
    }
    if (path === '/') {
        goodiebag.changeRouteData(getRouteData('/'));
    }

    if (path.length > 1) {
        // format correctly from start
        if (path.endsWith('/')) {
            path = path.slice(0, path.length -1) // blog/ should be /blog
        }
        const isAbsolutePath = path.startsWith('/')
        // if path is an absolute path and start route from /
        if (!isAbsolutePath) {
            path = createAbsolutePath(path, goodiebag.routeData)
        }
        goodiebag.changeRouteData(createRouteDataFromAbsolutePath(path))
    }    
}