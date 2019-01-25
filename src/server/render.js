import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import nodeFetch from "node-fetch";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider, renderToStringWithData } from "react-apollo";

import Layout from "../shared/components/Layout/Layout";
import createFetch from "../shared/utils/createFetch";
import Html from "./components/HTML";

const baseFetchURL =
  process.env.API_HOST || `http://127.0.0.1:${process.env.PORT || 3000}`;

const serverRenderer = () => (req, res, next) => {
  try {
    const fetch = createFetch(nodeFetch, {
      baseUrl: baseFetchURL,
      cookie: req.headers.cookie,
    });

    const client = new ApolloClient({
      ssrMode: true,
      // Remember that this is the interface the SSR server will use to connect to the
      // API server, so we need to ensure it isn't firewalled, etc
      link: createHttpLink({
        fetch,
        uri: `/graphql`,
        credentials: "same-origin",
        headers: {
          cookie: req.header("Cookie"),
        },
      }),
      cache: new InMemoryCache(),
    });

    const context = {};

    const App = (
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <Layout />
        </StaticRouter>
      </ApolloProvider>
    );

    return renderToStringWithData(App)
      .then((content) => {
        const apolloState = client.extract();
        res.status(200);
        res.send(
          `<!doctype html>${renderToStaticMarkup(
            <Html
              apolloState={apolloState}
              state={{
                userId: req.user ? req.user.userId : null,
                isAuthenticated: !!(req.user && req.user.userId),
              }}
              css={[
                res.locals.assetPath("bundle.css"),
                res.locals.assetPath("vendor.css"),
              ]}
              scripts={[
                res.locals.assetPath("bundle.js"),
                res.locals.assetPath("vendor.js"),
              ]}
            >
              {content}
            </Html>
          )}`
        );
        res.end();
      })
      .catch((error) => next(error));
  } catch (error) {
    return next(error);
  }
};

export default serverRenderer;
