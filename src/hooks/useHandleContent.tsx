import React, { useState, useCallback } from "react";
import TargetRoute from "src/router/index";
import getNow from "src/helpers/date/getNow";

type ReturnTypes = {
    content: App.ContentType[];
    addComponent: (
        NewContent: App.ComponentType,
        routeData?: App.RouteData,
    ) => void;
    changeContent: (content: App.ContentType[] | []) => void;
};

function useHandleContent(
    initialContent: App.ContentType,
    routeData: App.RouteData,
): ReturnTypes {
    const [content, changeContent] = useState([initialContent]);
    const addComponent = useCallback(
        (NewContent: App.ComponentType, routeData) => {
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
