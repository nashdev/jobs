import express from 'express';
import compression from 'compression';
import { createServer } from 'http';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import config from './config';

import {
  errorHandler as jwtErrorHandler,
  authenticationHandler,
} from './middleware/jwt';

import {
  graphqlBodyParser,
  graphqlUploadHandler,
  graphqlRequestHandler,
  graphqlPlaygroundHandler,
} from './middleware/graphql';

import slackAuthHandler from './middleware/slack';
import ssrHandler from './middleware/ssr';
import errorHandler from './middleware/error';

// Create a new express app;
const app = express();

/**
 *
 * Define our middleware.
 *
 */

// Enable CORs
app.use(cors());
// Parse cookies
app.use(cookieParser());
// Enable gzip
app.use(compression());
// Serve static Assets
app.use(
  express.static(path.resolve(__dirname, 'public'), {
    maxage: '1w',
  }),
);

// Handle requets with JWT token cookie
app.use(authenticationHandler);
// Handle if there is any error with JWT parsing
app.use(jwtErrorHandler);

// body-parser-graphql checks the Content-Type header of the request.
// If the Content-Type is application/graphql,
// the request is transformed into a 'normal' application/json
// GraphQL request, and the Content-Type header is set to
// application/json.
app.post('/graphql', graphqlBodyParser);
// Enhances Apollo for intuitive file uploads via GraphQL queries or mutations.
app.post('/graphql', graphqlUploadHandler);
// Create a GraphQL HTTP server
app.post('/graphql', graphqlRequestHandler);
// GraphQL IDE.
app.get('/playground', graphqlPlaygroundHandler);
// Handle slack authentication callback
app.get('/slack/auth', slackAuthHandler);

// Server Side Rendering
app.get('*', ssrHandler);

// Default Error fallback handler
app.use(errorHandler);

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

export default app;
