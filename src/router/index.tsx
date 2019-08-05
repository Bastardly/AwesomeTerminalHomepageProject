import React, { Suspense, lazy, ReactElement, Fragment } from "react";
import Fallback from './Fallback'

type RouteProps = {
  title?: string;
  url?: string;
};

export const routes: RouteProps[] = [
  {
    title: "My homepage!",
    url: "/"
  },
  {
    title: "Blog!",
    url: "/blog"
  },
];

export type RouteData = {
  title: string;
  url: string;
  data: {
      hash: string,
      query: string;
  }
};

export function getRouteData(pathname = '', hash = '', query = ''): RouteData {
  // Let's see if the given url exist.
  const {title = null, url = null} = routes.find(route => route.url === pathname) || {};
  return {
      title: title || 'Page not found',
      url: url || '/404',
      data: {
          hash,
          query,
        },
  }
}

export function updateHistory(routeData: RouteData) {
  window.history.pushState(routeData.data, routeData.title, routeData.url)
}

// Routes
const LandingPage = lazy(() => import("../pages/LandingPage"));
const Blog = lazy(() => import("../pages/Blog"));
const NotFound = lazy(() => import("../404"));

type TargetRouteProps = {
    url: string,
}

function Routes({url}: {url: string}): ReactElement {
  switch (url) {
    case "/": return <LandingPage />
    case "/blog": return <Blog />
	  default: return <NotFound />
  }
}

export default function TargetRoute({url}: TargetRouteProps): ReactElement {
    return (
      <Fragment>
        <Suspense fallback={<Fallback />}>
            <Routes url={url} />
        </Suspense>
      </Fragment>
    );
  }

