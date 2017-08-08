import React from "react";
import { Link } from "react-router";

function isLastCrumb(routes, route) {
  const namedRoutes = routes.filter(route => route.breadcrumbName);
  return namedRoutes.indexOf(route) === namedRoutes.length - 1;
}

const BreadcrumbList = ({ routes }) => {
  const breadcrumbs = routes
    .filter(route => route.breadcrumbName)
    .map(route => {
      let separator = "/";
      let routePath = route.path;

      // TODO: Support params and optional routes
      // For not ignore the last half of the route :(
      if (routePath.includes("(")) {
        routePath = routePath.split("(")[0];
      }

      if (isLastCrumb(routes, route)) {
        separator = "";
      }
      return (
        <span className="breadcrumb-link" key={route.breadcrumbName}>
          {isLastCrumb(routes, route) &&
            <span>
              {route.breadcrumbName}
            </span>}

          {!isLastCrumb(routes, route) &&
            <Link to={routePath}>
              {route.breadcrumbName}
            </Link>}
          <span className="breadcrumb-separator">
            {separator}
          </span>
        </span>
      );
    });

  return (
    <div className="container-fluid breadcrumb-container">
      {breadcrumbs}
    </div>
  );
};

export default BreadcrumbList;
