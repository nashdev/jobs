import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { List, Add, Edit, Delete, View } from "client/companies/components";
import ErrorBoundary from "client/common/components/error-boundary";
import { PrivateRoute } from "client/common/route-helpers";

const CompanyRoutes = () => (
  <ErrorBoundary>
    <Switch>
      <Route
        exact
        path="/companies"
        breadcrumbName="Company Listings"
        component={List}
      />
      <PrivateRoute
        exact
        breadcrumbName="Add Company"
        path="/companies/add"
        component={Add}
      />
      <PrivateRoute
        breadcrumbName="Edit Company"
        path="/companies/:id/edit"
        component={Edit}
      />
      <PrivateRoute
        breadcrumbName="Delete Company"
        path="/companies/:id/delete"
        component={Delete}
      />
      <Route
        breadcrumbName="View Company"
        path="/companies/:id"
        component={View}
      />
    </Switch>
  </ErrorBoundary>
);

export default CompanyRoutes;
