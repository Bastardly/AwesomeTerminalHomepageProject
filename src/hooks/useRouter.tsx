import { useEffect } from "react";
import useEventListener from "./useEventListener";
import getRouteData from "src/router/getRouteData";
import { getFocus } from "../terminal";

export default function useRouter(
    routeData: App.RouteData,
    changeRouteData: (routeData: App.RouteData) => void,
    addComponent: App.AddComponent,
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
