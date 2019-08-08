import { useEffect} from 'react';
import useEventListener from './useEventListener';
import { getRouteData, RouteData } from 'src/router'
import {getFocus} from '../terminal'

export default function useRouter(routeData: RouteData, changeRouteData: (routeData: RouteData) => void): void {
    useEventListener('popstate', () => {
        const { pathname, hash, search} = window.location;
        changeRouteData(getRouteData(pathname, hash, search))
    })

    const {
        url,
        title,
        data,
        data: {
            hash,
            query
        }
    } = routeData;
    
    useEffect(() => {
        document.title = title;
        window.history.pushState(data, title, url)
        getFocus()
    }, [url, hash, query, title])
}

