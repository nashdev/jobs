import React from "react";
import { Switch, Route } from "react-router-dom";
import { List, Add, Edit, Delete, View } from "client/jobs/components";
import ErrorBoundary from "client/common/components/error-boundary";

const JobRoutes = () => (
  <ErrorBoundary>
    <Switch>
      <Route
        exact
        path="/jobs"
        breadcrumbName="Job Listings"
        component={List}
      />

      <Route
        path="/jobs/list/:page"
        breadcrumbName="Job Listings"
        component={List}
      />
      <Route exact breadcrumbName="Add Job" path="/jobs/add" component={Add} />
      <Route breadcrumbName="Edit Job" path="/jobs/:id/edit" component={Edit} />
      <Route
        breadcrumbName="Delete Job"
        path="/jobs/:id/delete"
        component={Delete}
      />
      <Route breadcrumbName="Profile" path="/jobs/:id" component={View} />
    </Switch>
  </ErrorBoundary>
);

export default JobRoutes;
