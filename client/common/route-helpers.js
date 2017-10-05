import React from "react";
import { store } from "client/store";
import { Route, Redirect } from "react-router-dom";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (store.getState().auth.token) {
        return <Component {...props} />;
      }
      return (
        <Redirect
          to={{
            pathname: "/account/login",
            state: { from: props.location }
          }}
        />
      );
    }}
  />
);
