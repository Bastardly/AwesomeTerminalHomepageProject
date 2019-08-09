import React, { Suspense, lazy, ReactElement, Fragment, useContext, useEffect, ReactNode } from "react";
import Fallback from "./Fallback";
import { appContext } from "../App";

type TargetRouteProps = {
    url: string;
};

// Routes
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Blog = lazy(() => import("../pages/Blog"));
const NotFound = lazy(() => import("../pages/404"));

function Routes({ url }: { url: string }): ReactNode {
    switch (url) {
        case "/":
            return LandingPage;
        case "/blog":
            return Blog;
        default:
            return NotFound;
    }
}

export default function TargetRoute({ url }: TargetRouteProps): ReactElement {
    const { content, changeContent } = useContext(appContext);

    useEffect(() => {
        changeContent([...content, Routes({ url })]);
    }, [url]);

    return (
        <Fragment>
            {content.map((Component: any, index: number) => {
                return (
                    <Fragment key={index}>
                        <Suspense fallback={<Fallback />}>
                            <Component />
                        </Suspense>
                    </Fragment>
                );
            })}
        </Fragment>
    );
}
