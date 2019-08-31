import { useEffect } from "react";
import useEventListener from "./useEventListener";
import getRouteData, { RouteData } from "src/router/getRouteData";
import { getFocus } from "../terminal";
import { AddComponent } from "./useHandleContent";

export default function useRouter(
    routeData: RouteData,
    changeRouteData: (routeData: RouteData) => void,
    addComponent: AddComponent,
): void {
    useEventListener("popstate", () => {
        const { pathname, hash, search } = window.location;
        const newRouteData = getRouteData(pathname, hash, search);
        changeRouteData(newRouteData);
    });

    const {
        url,
        title,
        data,
        data: { hash, query },
    } = routeData;

    useEffect(() => {
        document.title = title;
        window.history.pushState(data, title, url);
        addComponent(null, routeData);
        getFocus();
    }, [url, hash, query, title]);
}
