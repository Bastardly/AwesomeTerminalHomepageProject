
import React, {Context, useState, createContext} from 'react';
import TargetRoute, { getRouteData, RouteData } from './router'
import useRouter from './hooks/useRouter'
import TerminalInput from './terminal';

interface RouteContext extends Context<any> {
    routeData?: RouteData,
    changeRouteData?: (path: string) => void,
}

const { pathname, hash, search} = window.location;
const initialRouteData = getRouteData(pathname, hash, search)

export const routeContext: RouteContext = createContext({
    changeRouteData: () => undefined,
    routeData: initialRouteData 
});

export function App() {
    const [routeData, changeRouteData] = useState(initialRouteData)
    const [hideRoute, changeHideRoute] = useState(false)
    useRouter(routeData, changeRouteData)

    return (
        <routeContext.Provider value={{changeRouteData, routeData}}>
            <TargetRoute hideRoute={hideRoute} url={routeData.url} />
            <TerminalInput hideRoute={hideRoute} changeHideRoute={changeHideRoute} />
        </routeContext.Provider>
    )
}
 