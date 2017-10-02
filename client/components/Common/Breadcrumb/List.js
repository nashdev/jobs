import React from "react";
import { Link } from "react-router";
import classnames from "classnames";

function isLastCrumb(routes, route) {
  const namedRoutes = routes.filter(route => route.breadcrumbName);
  return namedRoutes.indexOf(route) === namedRoutes.length - 1;
}
function isHomeCrumb(routes) {
  const namedRoutes = routes.filter(route => route.breadcrumbName);
  return namedRoutes.length === 1;
}

const BreadcrumbList = ({ routes }) => {
  const breadcrumbs = routes
    .filter(route => route.breadcrumbName)
    .map(route => {
      let routePath = route.path;

      // TODO: Support params and optional routes
      // For not ignore the last half of the route :(
      if (routePath.includes("(")) {
        routePath = routePath.split("(")[0];
      }

      const classes = classnames({
        "breadcrumb-link": true,
        "is-active": isLastCrumb(routes, route)
      });
      return (
        <li className={classes} key={route.breadcrumbName}>
          <Link to={routePath}>{route.breadcrumbName}</Link>
        </li>
      );
    });

  if (isHomeCrumb(routes)) {
    return null;
  }

  return (
    <div className="hero is-primary is-bold">
      <div className="container is-fluid">
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>{breadcrumbs}</ul>
        </nav>
      </div>
    </div>
  );
};

export default BreadcrumbList;
