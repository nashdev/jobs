import React from "react";
import { Switch, Route } from "react-router-dom";
import { PrivateRoute } from "client/common/route-helpers";
import ErrorBoundary from "client/common/components/error-boundary";

import {
  Login,
  Signup,
  Profile,
  Forgot,
  Reset
} from "client/account/components";

const AccountRoutes = () => (
  <ErrorBoundary>
    <Switch>
      <PrivateRoute exact path="/account" component={Profile} />
      <Route exact path="/account/login" component={Login} />
      <Route exact path="/account/signup" component={Signup} />
      <Route path="/account/forgot" component={Forgot} />
      <Route path="/account/reset/:token" component={Reset} />
    </Switch>
  </ErrorBoundary>
);

export default AccountRoutes;
