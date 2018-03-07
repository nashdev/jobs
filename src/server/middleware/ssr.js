import React from 'react';
import ReactDOM from 'react-dom/server';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { StaticRouter } from 'react-router';
import nodeFetch from 'node-fetch';

import assets from './assets.json'; // eslint-disable-line import/no-unresolved
import createFetch from '../createFetch';
import Layout from '../../client/Common/Layout/Layout';
import ContextProvider from '../../client/Common/Context/ContextProvider';
import Html from '../../client/Common/Layout/Html';

export default async (req, res, next) => {
  // Ignore requests to playround, since the middleware calls next()
  // it will enter our catch all route, here, and we don't want that.
  if (req.url === '/playground' || req.url === '/slack/auth') {
    return next();
  }
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    const insertCss = (...styles) => {
      // console.log('styles', styles);

      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.add(style._getCss()));
    };

    const fetch = createFetch(nodeFetch, {
      baseUrl: `http://127.0.0.1:${process.env.PORT}`,
      cookie: req.headers.cookie,
    });

    const client = new ApolloClient({
      ssrMode: true,
      // Remember that this is the interface the SSR server will use to connect to the
      // API server, so we need to ensure it isn't firewalled, etc
      link: createHttpLink({
        fetch,
        uri: `/graphql`,
        credentials: 'same-origin',
        headers: {
          cookie: req.header('Cookie'),
        },
      }),
      cache: new InMemoryCache(),
    });

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
    };

    const App = (
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <ContextProvider context={context}>
            <Layout />
          </ContextProvider>
        </StaticRouter>
      </ApolloProvider>
    );

    // Rende the app with data
    return renderToStringWithData(App).then(content => {
      const initialState = client.extract();
      const data = {};
      data.styles = [{ id: 'css', cssText: [...css].join('') }];
      data.scripts = [assets.vendor.js];

      // if (route.chunks) {
      //   data.scripts.push(...route.chunks.map(chunk => assets[chunk].js));
      // }

      data.scripts.push(assets.client.js);

      const html = <Html content={content} state={initialState} {...data} />;

      res.status(200);
      res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
      return res.end();
    });
  } catch (err) {
    next(err);
  }
};
