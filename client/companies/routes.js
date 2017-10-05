import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { List, Add, Edit, Delete, View } from "client/companies/components";
import ErrorBoundary from "client/common/components/error-boundary";
import { PrivateRoute } from "client/common/route-helpers";

const CompanyRoutes = () => (
  <ErrorBoundary>
    <Switch>
      <Route exact path="/companies" component={List} />
      <PrivateRoute exact path="/companies/add" component={Add} />
      <PrivateRoute path="/companies/:id/edit" component={Edit} />
      <PrivateRoute path="/companies/:id/delete" component={Delete} />
      <Route path="/companies/:id" component={View} />
    </Switch>
  </ErrorBoundary>
);

export default CompanyRoutes;
