export default function getRouteData(
    url = "/",
    hash = "",
    query = "",
): App.RouteData {
    return {
        title: "My homepage!",
        url,
        data: {
            hash,
            query,
        },
    };
}
