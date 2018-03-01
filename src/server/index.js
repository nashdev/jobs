import express from 'express';
import compression from 'compression';

import { graphqlExpress } from 'apollo-server-express';
import { apolloUploadExpress, GraphQLUpload } from 'apollo-upload-server';
import { print } from 'graphql';
import { importSchema } from 'graphql-import';
import expressPlayground from 'graphql-playground-middleware-express';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';
import path from 'path';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser-graphql';
import cors from 'cors';
import fs from 'fs';

import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';

import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { StaticRouter } from 'react-router';
import nodeFetch from 'node-fetch';

import config from './config';
import defaultErrorFormatter from './defaultErrorFormatter';

import Layout from '../client/components/Layout';
import ContextProvider from '../client/components/Context/ContextProvider';
import Html from '../client/components/Html';
import { ErrorPageWithoutStyle } from '../client/routes/error/ErrorPage';
import createFetch from './createFetch';
import errorPageStyle from '../client/routes/error/ErrorPage.css';

import assets from './assets.json'; // eslint-disable-line import/no-unresolved

import resolvers from './resolvers';

import Job from './business/jobs';
import Company from './business/companies';
import User from './business/users';

//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
global.navigator = global.navigator || {};
global.navigator.userAgent = global.navigator.userAgent || 'all';

const pe = new PrettyError();

pe.skipNodeFiles();
pe.skipPackage('express');

const app = express();
const typeDefs = './src/server/schema.graphql';
const typeDefsString = buildTypeDefsString(typeDefs);
const uploadMixin = typeDefsString.includes('scalar Upload')
  ? { Upload: GraphQLUpload }
  : {};

const executableSchema = makeExecutableSchema({
  typeDefs: typeDefsString,
  resolvers: {
    ...uploadMixin,
    ...resolvers,
  },
});

if (!executableSchema) {
  throw new Error('No schema defined');
}

const reqContext = (req, res) => ({
  ...req,
  dataLoaders: {
    job: Job.getLoaders(),
    company: Company.getLoaders(),
    user: User.getLoaders(),
  },
  db: {
    Job,
    Company,
    User,
  },
});

// MIDDLEWARE

// Enable Cors
app.use(cors());
app.use(cookieParser());
app.use(compression());
// Static Assets
app.use(
  express.static(path.resolve(__dirname, 'public'), {
    maxage: '1w',
  }),
);
app.set('trust proxy', 'loopback');
app.use(
  expressJwt({
    secret: process.env.TOKEN_SECRET,
    credentialsRequired: false,
    getToken: req => req.cookies.token,
  }),
);
// Error handler for express-jwt
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('token');
  }
  next(err);
});

app.post('/graphql', bodyParser.graphql());
app.post('/graphql', apolloUploadExpress());
app.post(
  '/graphql',
  graphqlExpress(async request => {
    let context;

    try {
      context = await reqContext({ request });
    } catch (e) {
      console.error(e);
      throw e;
    }

    return {
      schema: executableSchema,
      tracing: true,
      // cacheControl: this.options.cacheControl,
      formatError: defaultErrorFormatter,
      // logFunction: this.options.logFunction,
      // rootValue: this.options.rootValue,
      // validationRules: this.options.validationRules,
      // fieldResolver: this.options.fieldResolver,
      // formatParams: this.options.formatParams,
      // formatResponse: this.options.formatResponse,
      // debug: this.options.debug,
      context,
    };
  }),
);

app.get('/slack/auth', (req, res) => {
  User.getToken({}, { code: req.query.code })
    .then(({ token, expiresIn }) => {
      res.cookie('token', token, { maxAge: 1000 * expiresIn });
      res.redirect('/');
    })
    .catch(e => {
      res.send({
        error: e.message,
      });
    });
});

app.get(
  '/graphql/playground',
  expressPlayground({
    endpoint: '/graphql',
    // subscriptionsEndpoint: subscriptionServerOptions.path,
  }),
);

// Server Side Rendering
app.get('*', async (req, res, next) => {
  // Ignore requests to playround, since the middleware calls next()
  // it will enter our catch all route, here, and we don't want that.
  if (req.url === '/graphql/playground' || req.url === '/slack/auth') {
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
    renderToStringWithData(App).then(content => {
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
});

// Error fallback
app.use((err, req, res) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]} // eslint-disable-line no-underscore-dangle
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  // res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

// Create the server

// Start listening
if (!module.hot) {
  const server = createServer(app);
  server.listen(process.env.PORT || 3000, () => {
    console.log(
      `The server is running at http://localhost:${process.env.PORT || 3000}`,
    );
  });
}

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if (module.hot) {
  app.hot = module.hot;
}

function isDocumentNode(node) {
  return node.kind === 'Document';
}

function mergeTypeDefs(typeDefs) {
  if (typeof typeDefs === 'string') {
    return typeDefs;
  }

  if (typeof typeDefs === 'function') {
    typeDefs = typeDefs();
  }

  if (isDocumentNode(typeDefs)) {
    return print(typeDefs);
  }

  return typeDefs.reduce((acc, t) => `${acc}\n${mergeTypeDefs(t)}`, '');
}

function buildTypeDefsString(typeDefs) {
  let typeDefinitions = mergeTypeDefs(typeDefs);

  // read from .graphql file if path provided
  if (typeDefinitions.endsWith('graphql')) {
    const schemaPath = path.resolve(typeDefinitions);

    if (!fs.existsSync(schemaPath)) {
      throw new Error(`No schema found for path: ${schemaPath}`);
    }

    typeDefinitions = importSchema(schemaPath);
  }

  return typeDefinitions;
}

export default app;
