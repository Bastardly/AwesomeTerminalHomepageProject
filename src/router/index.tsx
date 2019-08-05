import React, { Suspense, lazy, ReactElement, Fragment, useContext, useEffect, ReactNode, ErrorBoundary } from "react";
import Fallback from './Fallback'
import { appContext, Content } from "../App";
// import Blog from '../pages/Blog'
// import LandingPage from '../pages/LandingPage'
// import NotFound from '../404'

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

function Routes({url}: {url: string}): ReactNode {
  switch (url) {
    case "/": return LandingPage
    case "/blog": return Blog
	  default: return NotFound
  }
}

export default function TargetRoute({url}: TargetRouteProps): ReactElement {
  const { content, changeContent } = useContext(appContext)

  useEffect(() => {
    changeContent([...content,  Routes({url})])
  }, [url])

  return <Fragment>
    {content.map((Component: Content, index: number) => {
      return (
        <Fragment key={index}>
        <Suspense fallback={<Fallback />}>
          <Component />
        </Suspense>
      </Fragment>
      )
    })}
  </Fragment>
  }

