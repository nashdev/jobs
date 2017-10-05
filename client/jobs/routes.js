import React from "react";
import { Switch, Route } from "react-router-dom";
import { List, Add, Edit, Delete, View } from "client/jobs/components";
import ErrorBoundary from "client/common/components/error-boundary";
import { PrivateRoute } from "client/common/route-helpers";

const JobRoutes = () => (
  <ErrorBoundary>
    <Switch>
      <Route exact path="/jobs" component={List} />
      <Route path="/jobs/list/:page" component={List} />
      <PrivateRoute exact path="/jobs/add" component={Add} />
      <PrivateRoute path="/jobs/:id/edit" component={Edit} />
      <PrivateRoute path="/jobs/:id/delete" component={Delete} />
      <Route path="/jobs/:id" component={View} />
    </Switch>
  </ErrorBoundary>
);

export default JobRoutes;
