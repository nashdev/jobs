import React from "react";
import Helmet from "react-helmet";
import { Route, Switch, Redirect } from "react-router";

import s from "./Layout.css";
import Header from "../Header/Header";
import routes from "../../Routes";
import Auth from "../../../client/Auth/Auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      Auth.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect
          push
          to={{
            pathname: "/slack/login",
            state: {
              flash: {
                status: "warning",
                title: "Login Required",
                message: `Sorry! You must be logged in to access ${
                  props.match.url
                }.`,
              },
            },
          }}
        />
      )
    }
  />
);

const Layout = ({ children }) => (
  <React.Fragment>
    <Helmet
      defaultTitle="Nashville Developer Jobs | NashDev"
      titleTemplate="%s – nashdev/jobs"
    />

    <Header />

    <main>
      {children}
      <Switch>
        {routes.map((route) => {
          if (route.private) {
            return <PrivateRoute key={route.name} {...route} />;
          }
          return <Route key={route.name} {...route} />;
        })}
      </Switch>
    </main>
  </React.Fragment>
);

export default Layout;
