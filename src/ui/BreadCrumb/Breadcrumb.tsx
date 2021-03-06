import React from "react";
import Link from "../Link";

type BreadCrumbProps = {
    routeData: App.RouteData;
};

type BreadCrumbPath = {
    name: string;
    url: string;
};

export function getBreadCrumbPaths(path: string): BreadCrumbPath[] {
    const elements = path.split("/");
    let latestPath = "";
    const paths: BreadCrumbPath[] = [];
    elements.forEach(element => {
        if (!element || !element.length) return;
        (latestPath = latestPath + "/" + element),
            paths.push({
                name: element,
                url: latestPath,
            });
    });
    return paths;
}

export default function BreadCrumb({ routeData }: BreadCrumbProps) {
    const paths = getBreadCrumbPaths(routeData.url);
    const { hash, query } = routeData.data;

    return (
        <div className="breadCrumb">
            {" "}
            ~<Link name={window.location.hostname} path="/" />/
            {paths.map(path => (
                <Link key={path.url} name={path.name} path={path.url} />
            ))}
            {hash && hash.length > 0 && `#${hash}`}
            {query && query.length > 0 && `?${query}`}>
        </div>
    );
}
