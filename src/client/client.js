import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import Cookies from 'js-cookie';
import Layout from './Common/Layout/Layout';
import ContextProvider from './Common/Context/ContextProvider';

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  link,
});

const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => {
      removeCss.forEach(f => f());
    };
  },
};

ReactDOM.hydrate(
  <ApolloProvider client={client}>
    <Router>
      <ContextProvider context={context}>
        <Layout />
      </ContextProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('app'),
);
