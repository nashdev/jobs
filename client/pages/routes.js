import React from "react";
import { Switch, Route } from "react-router-dom";
import { Terms, Privacy, Conduct } from "client/pages/components";
import ErrorBoundary from "client/common/components/error-boundary";

const PagesRoutes = () => (
  <ErrorBoundary>
    <Switch>
      <Route
        breadcrumbName="Terms of Service"
        path="/pages/tos"
        component={Terms}
      />
      <Route
        breadcrumbName="Privacy Policy"
        path="/pages/privacy"
        component={Privacy}
      />
      <Route
        breadcrumbName="Code of Conduct"
        path="/pages/conduct"
        component={Conduct}
      />
    </Switch>
  </ErrorBoundary>
);

export default PagesRoutes;
