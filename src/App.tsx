import React, { useState, createContext } from "react";
import getRouteData from "src/router/getRouteData";
import useRouter from "src/hooks/useRouter";
import useHandleContent from "src/hooks/useHandleContent";
import TerminalInput from "src/terminal/index";
import ContentMapper from "./ContentMapper";
import InitialLoaders from "./dataLoaders/InitialLoaders";
import getNow from "src/helpers/date/getNow";

const { pathname, hash, search } = window.location;
const initialRouteData = () => getRouteData(pathname, hash, search);

export const appContext = createContext({
    changeRouteData: () => undefined,
    routeData: initialRouteData(),
    content: [],
}) as App.AppContext;

export default function App() {
    const [modules, setModule] = useState([]) as any[];
    const initialContent: App.ContentType = {
        Component: <InitialLoaders modules={modules} setModule={setModule} />,
        date: getNow(),
    };
    const [routeData, changeRouteData] = useState(initialRouteData());
    const { content, changeContent, addComponent } = useHandleContent(
        initialContent,
        routeData,
    );
    useRouter(routeData, changeRouteData, addComponent);

    return (
        <appContext.Provider
            value={{
                changeRouteData,
                routeData,
                content,
                changeContent,
                addComponent,
            }}
        >
            <ContentMapper content={content} />
            <TerminalInput />
        </appContext.Provider>
    );
}
