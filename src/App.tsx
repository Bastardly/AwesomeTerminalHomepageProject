import React, { Context, useState, createContext, ReactNode, useCallback, useEffect } from "react";
import getRouteData, { RouteData } from "src/router/getRouteData";
import TargetRoute from "src/router/index";
import useRouter from "src/hooks/useRouter";
import useIPFS from "src/hooks/useIPFS";
import TerminalInput from "src/terminal/index";
// @ts-ignore
import ipfsFunc from "./ipfs";

export interface AppContext extends Context<any> {
    routeData: RouteData;
    changeRouteData: (data: RouteData) => void;
    changeContent: (val: ReactNode[]) => void;
    content: ReactNode[];
}

const { pathname, hash, search } = window.location;
const initialRouteData = () => getRouteData(pathname, hash, search);
const initialContentComponent = () => <div>Hello world!</div>;
const initialContent: ReactNode = initialContentComponent;

export const appContext = createContext({
    changeRouteData: () => undefined,
    routeData: initialRouteData(),
    changeContent: () => undefined,
    content: [initialContent],
}) as AppContext;

export default function App() {
    const ipfsReady = useIPFS();
    const [routeData, changeRouteData] = useState(initialRouteData());
    const [content, changeContent] = useState([initialContent]);
    useRouter(routeData, changeRouteData);
    useEffect(() => ipfsFunc(ipfsReady), [ipfsReady]);

    return (
        <appContext.Provider value={{ changeRouteData, routeData, content, changeContent }}>
            <TargetRoute url={routeData.url} />
            <TerminalInput />
        </appContext.Provider>
    );
}
