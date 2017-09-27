import React from "react";
import { Switch, Route } from "react-router-dom";
import { List } from "client/people/components";
import ErrorBoundary from "client/common/components/error-boundary";

const PeopleRoutes = () => (
  <ErrorBoundary>
    <Switch>
      <Route
        exact
        path="/people"
        breadcrumbName="People Listings"
        component={List}
      />
    </Switch>
  </ErrorBoundary>
);

export default PeopleRoutes;
