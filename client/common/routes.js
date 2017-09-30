import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AccountRoutes from "client/account/routes";
import JobRoutes from "client/jobs/routes";
import CompanyRoutes from "client/companies/routes";
import PeopleRoutes from "client/people/routes";
import PagesRoute from "client/pages/routes";
import { Home, NotFound } from "client/common/components";
import { store } from "client/store";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      store.getState().auth.token ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/account/login",
            state: { from: props.location }
          }}
        />
      )}
  />
);

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
