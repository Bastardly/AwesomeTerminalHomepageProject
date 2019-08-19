import React, {
    Suspense,
    lazy,
    ReactElement,
    Fragment,
    ReactNode,
    useImperativeHandle,
    useMemo,
} from "react";
import Fallback from "./Fallback";
import { appContext } from "../App";

type TargetRouteProps = {
    url: string;
};

// Routes
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Blog = lazy(() => import("../pages/Blog"));
const NotFound = lazy(() => import("../pages/404"));

function Routes(url: string) {
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
    const Component = useMemo(() => Routes(url), [url]);
    return (
        <Suspense fallback={<Fallback />}>
            <Component />
        </Suspense>
    );
}
