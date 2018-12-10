import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

import Layout from "../shared/components/Layout/Layout";
import withTracker from "./Common/WithTracker";
import Auth from "./Auth/Auth";

const browserHistory = window.browserHistory || createHistory();

const link = createHttpLink({
  uri: "/graphql",
  credentials: "same-origin",
});

window.__APOLLO_CLIENT__ = client;

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  link,
});

client.onResetStore(() => {
  // Reset the store
});

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      name
      picture
      createdAt
    }
  }
`;

client.cache.watch({
  query: ME_QUERY,
  callback: ({ result }) => {
    Auth.update({
      userId: result.me ? result.me.id : null,
      isAuthenticated: !!(result.me && result.me.id),
    });
  },
});

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
const ScrollTopWithRouter = withRouter(ScrollToTop);
const LayoutWithTracker = withRouter(withTracker(Layout));

ReactDOM.hydrate(
  <ApolloProvider client={client}>
    <Router>
      <ScrollTopWithRouter>
        <LayoutWithTracker />
      </ScrollTopWithRouter>
    </Router>
  </ApolloProvider>,
  document.getElementById("app")
);

if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept();
  }

  if (!window.browserHistory) {
    window.browserHistory = browserHistory;
  }
}
