import React, { Suspense, lazy, ReactElement, useMemo } from "react";
import Fallback from "./Fallback";

type TargetRouteProps = {
    url: string;
};

// Routes
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Blog = lazy(() => import("../pages/Blog"));
const Jolly = lazy(() => import("../pages/Jolly"));
const NotFound = lazy(() => import("../pages/404"));

function Routes(url: string) {
    // View routemap.ts
    switch (url) {
        case "/":
            return LandingPage;
        case "/blog":
            return Blog;
        case "blog/jolly": {
            return Jolly;
        }
        default:
            return NotFound;
    }
}

export default function TargetRoute({ url }: TargetRouteProps): ReactElement {
    const Component = useMemo(() => Routes(url), [url]);
    return (
        <Suspense fallback={<Fallback />}>
            <Component />
        </Suspense>
    );
}
