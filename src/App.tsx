
import React, {Context, useState, createContext, ReactNode, ReactElement} from 'react';
import TargetRoute, { getRouteData, RouteData } from './router'
import useRouter from './hooks/useRouter'
import TerminalInput from './terminal';


const { pathname, hash, search} = window.location;
const initialRouteData = getRouteData(pathname, hash, search)
const initialContentComponent = () => <div>Hello world!</div>
const initialContent: ReactNode = initialContentComponent

export interface AppContext extends Context<any> {
    routeData?: RouteData,
    changeRouteData?: (path: string) => void,
    changeContent: (val: ReactNode[]) => void, 
    content: ReactNode[],
}

export const appContext = createContext({
    changeRouteData: () => undefined,
    routeData: initialRouteData,
    changeContent: () => undefined, 
    content: [initialContent],
}) as AppContext;

export function App() {
    const [routeData, changeRouteData] = useState(initialRouteData)
    const [content, changeContent] = useState([initialContent])
    useRouter(routeData, changeRouteData)

    return (
        <appContext.Provider value={{changeRouteData, routeData, content, changeContent}}>
            <TargetRoute url={routeData.url} />
            <TerminalInput />
        </appContext.Provider>
    )
}
 