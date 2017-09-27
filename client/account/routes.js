import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Login,
  Signup,
  Profile,
  Forgot,
  Reset
} from "client/account/components";

const AccountRoutes = () => (
  <Switch>
    <Route
      exact
      breadcrumbName="My Account"
      path="/account"
      component={Profile}
    />

    <Route
      exact
      breadcrumbName="Login"
      path="/account/login"
      component={Login}
    />

    <Route
      exact
      breadcrumbName="Signup"
      path="/account/signup"
      component={Signup}
    />

    <Route
      breadcrumbName="Forgot Password"
      path="/account/forgot"
      component={Forgot}
    />
    <Route
      breadcrumbName="Reset Password"
      path="/account/reset/:token"
      component={Reset}
    />
  </Switch>
);

export default AccountRoutes;
