import React, { useState, useCallback, ReactNode, ReactElement } from "react";
import { RouteData } from "src/router/getRouteData";
import TargetRoute from "src/router/index";
import getNow from "src/helpers/date/getNow";

type ComponentType = ReactNode | Element;

export type ContentType = {
    Component: ComponentType;
    date: number;
    routeData?: RouteData;
};

export type AddComponent = (
    NewContent: ComponentType,
    routeData?: RouteData,
) => void;

type ReturnTypes = {
    content: ContentType[];
    addComponent: (NewContent: ComponentType, routeData?: RouteData) => void;
    changeContent: (content: ContentType[]) => void;
};

function useHandleContent(
    initialContent: ContentType,
    routeData: RouteData,
): ReturnTypes {
    const [content, changeContent] = useState([initialContent]);
    const addComponent = useCallback(
        (NewContent: ComponentType, routeData) => {
            let Component = null;
            if (routeData) {
                Component = <TargetRoute url={routeData.url} />;
            } else if (typeof NewContent === "string") {
                Component = <div>{NewContent}</div>;
            } else {
                // @ts-ignore - I know it's ugly, but I was having so much fun and had a little bit too much gin.
                Component = <NewContent />;
            }

            changeContent(
                content.concat({
                    Component,
                    date: getNow(),
                    routeData,
                }),
            );
        },
        [content, routeData],
    );
    return {
        content,
        addComponent,
        changeContent,
    };
}

export default useHandleContent;
