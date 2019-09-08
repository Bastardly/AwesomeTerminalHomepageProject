export type RouteProps = {
    title?: string;
    url: string;
    children?: {
        [key: string]: RouteProps;
    };
} | void;

const routeMap = {
    title: "My homepage!",
    url: "/",
    children: {
        blog: {
            title: "Blog!",
            url: "/blog",
            children: {
                jolly: {
                    title: "Jolly",
                    url: "/jolly",
                },
            },
        },
        funny: {
            title: "funny",
            url: "/funny",
        },
    },
} as RouteProps;


// Lav test så crawlRouteMap returnerer blog/jolly ved cd blog/jolly

// Kill den her - Og styr det hele fra route


export function crawlRouteMap(urlParts: string[]): RouteProps {
    return urlParts.reduce((routeInfo: RouteProps | void, part) => {
        if (part === "") {
            return routeInfo;
        }
        if (routeInfo && routeInfo.children && routeInfo.children[part]) {
            routeInfo = routeInfo.children[part];
            return routeInfo;
        }
        return;
    }, routeMap);
}

export default routeMap;
