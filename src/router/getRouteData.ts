import { crawlRouteMap } from "./routeMap";

export type RouteData = {
    title: string;
    url: string;
    data: {
        hash: string;
        query: string;
    };
};

export default function getRouteData(pathname: string = "/", hash: string = "", query: string = ""): RouteData {
    const urlParts = pathname.split("/");
    const { title = null, url = null } = crawlRouteMap(urlParts) || {};
    return {
        title: title || "Page not found",
        url: url || "/404",
        data: {
            hash,
            query,
        },
    };
}
