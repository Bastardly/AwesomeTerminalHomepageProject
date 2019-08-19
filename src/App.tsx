import React, { Context, useState, createContext, useEffect } from "react";
import getRouteData, { RouteData } from "src/router/getRouteData";
import TargetRoute from "src/router/index";
import useRouter from "src/hooks/useRouter";
import useIPFS from "src/hooks/useIPFS";
import useHandleContent, {
    ContentType,
    AddContent,
} from "src/hooks/useHandleContent";
import TerminalInput from "src/terminal/index";
// @ts-ignore
import ipfsFunc from "./ipfs";
import ContentMapper from "./ContentMapper";

const { pathname, hash, search } = window.location;
const initialRouteData = () => getRouteData(pathname, hash, search);
const now = new Date().toISOString();
const initialContent: ContentType = {
    content: () => <div>Hello world!</div>,
    date: Date.parse(now),
};

export interface AppContext extends Context<any> {
    routeData: RouteData;
    changeRouteData: (data: RouteData) => void;
    changeContent: (obj: ContentType) => void;
    addContent: AddContent;
    content: ContentType[];
}

export const appContext = createContext({
    changeRouteData: () => undefined,
    routeData: initialRouteData(),
    changeContent: () => undefined,
    content: [initialContent],
}) as AppContext;

export default function App() {
    const [routeData, changeRouteData] = useState(initialRouteData());
    const { content, changeContent, addContent } = useHandleContent(
        initialContent,
        routeData,
    );
    useRouter(routeData, changeRouteData, addContent);
    const ipfsReady = useIPFS(addContent);
    useEffect(() => ipfsFunc(ipfsReady), [ipfsReady]);
    // setTimeout(() => {
    //     addContent("This actually works!!! Holy fuck!!!!!!!!!!!!!!!!!!!!");
    // }, 5000);

    return (
        <appContext.Provider
            value={{
                changeRouteData,
                routeData,
                content,
                changeContent,
                addContent,
            }}
        >
            <ContentMapper content={content} />
            <TerminalInput />
        </appContext.Provider>
    );
}
