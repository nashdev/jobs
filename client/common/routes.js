import React from "react";
import { Switch, Route } from "react-router-dom";
import AccountRoutes from "client/account/routes";
import JobRoutes from "client/jobs/routes";
import CompanyRoutes from "client/companies/routes";
import PeopleRoutes from "client/people/routes";
import PagesRoute from "client/pages/routes";

import { Home, NotFound } from "client/common/components";

const ensureAuthenticated = (nextState, replace) => {
  if (!store.getState().auth.token) {
    replace("/login");
  }
};
const skipIfAuthenticated = (nextState, replace) => {
  if (store.getState().auth.token) {
    replace("/");
  }
};
const clearMessages = () => {
  store.dispatch({
    type: "CLEAR_MESSAGES"
  });
};

const AppRoutes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/account" component={AccountRoutes} />
    <Route path="/people" component={PeopleRoutes} />
    <Route path="/jobs" component={JobRoutes} />
    <Route path="/companies" component={CompanyRoutes} />
    <Route path="/pages" component={PagesRoute} />
    <Route component={NotFound} />
  </Switch>
);

export default AppRoutes;
