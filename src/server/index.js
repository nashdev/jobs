import compression from "compression";
import { createServer } from "http";
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import https from "./middleware/https";

import {
  errorHandler as jwtErrorHandler,
  authenticationHandler,
} from "./middleware/jwt";

import manifestHelpers from "./middleware/manifest";
import { graphqlRequestHandler } from "./middleware/graphql";

import slackAuthHandler from "./middleware/slack";
import errorHandler from "./middleware/error";

import serverRender from "./render";
import paths from "../../config/paths";
import ensureRequiredEnvVars from "./envCheck";

require("dotenv").config();

const app = express();

/**
 *
 * Define our middleware.
 *
 */

// Redirect all non-HTTPS request to HTTPS unless development mode
app.use(https);

// Enable CORs
app.use(cors());

// Parse body
app.use(bodyParser.json());

// Parse cookies
app.use(cookieParser());

// Enable gzip
app.use(compression());

// Serve static Assets
app.use(
  paths.publicPath,
  express.static(path.join(paths.clientBuild, paths.publicPath))
);

app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: ");
});

app.use("/favicon.ico", (req, res) => {
  res.send("");
});

// Handle requets with JWT token cookie
app.use(authenticationHandler);
// Handle if there is any error with JWT parsing
app.use(jwtErrorHandler);

// Handle slack authentication callback
app.get("/slack/auth", slackAuthHandler);

// Create graphql server and graphiql playground
graphqlRequestHandler.applyMiddleware({ app });

// Manifest Helper
app.use(
  manifestHelpers({
    manifestPath: `${path.join(
      paths.clientBuild,
      paths.publicPath
    )}/manifest.json`,
  })
);

// Server side rendering
app.use(serverRender());

// Default Error fallback handler
app.use(errorHandler);

// Utility route for testing Airbrake
app.get("/error", (req, res, next) => {
  next(new Error("test error in a route"));
});

// Utility route for monitoring
app.get("/health-check", (req, res) => {
  res.json({ success: true });
});

// Throw if we are missing required environment variables
ensureRequiredEnvVars(process.env);

// Create the server
const server = createServer(app);

// Start listening
server.listen(process.env.PORT || 3000, () => {
  console.log(
    `The server is running at http://localhost:${process.env.PORT || 3000}`
  );
});

process.on("unhandledRejection", (reason, p) => {
  console.error("Unhandled Rejection at:", p, "reason:", reason);
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
