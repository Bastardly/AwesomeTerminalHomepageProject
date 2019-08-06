import { useEffect} from 'react';
import useEventListener from './useEventListener';
import { getRouteData, RouteData, updateHistory } from 'src/router'
import {getFocus} from '../terminal'

export default function useRouter(routeData: RouteData, changeRouteData: (routeData: RouteData) => void): void {
    useEventListener('popstate', () => {
        const { pathname, hash, search} = window.location;
        changeRouteData(getRouteData(pathname, hash, search))
    })

    const {
        url,
        data: {
            hash,
            query
        }
    } = routeData;
    
    useEffect(() => {
        updateHistory(routeData);
        getFocus()
    }, [url, hash, query])
}

