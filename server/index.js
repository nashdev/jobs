let express = require("express");
let path = require("path");
let logger = require("morgan");
let compression = require("compression");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");
let expressValidator = require("express-validator");
let dotenv = require("dotenv");

let exphbs = require("express-handlebars");
let jwt = require("jsonwebtoken");

// Load environment variables from .env file
dotenv.load();

// Models
let User = require("./models/User");

// Controllers
let userController = require("./controllers/user");
let companyController = require("./controllers/company");
let jobController = require("./controllers/job");

let app = express();

let hbs = exphbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "views", "layouts"),
  partialsDir: path.join(__dirname, "views", "partials"),
  defaultLayout: "main",
  helpers: {
    ifeq: function(a, b, options) {
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    toJSON: function(object) {
      return JSON.stringify(object);
    }
  }
});

app.set("views", path.join(__dirname, "views"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.set("port", process.env.PORT || 3000);
app.use(compression());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   next();
// });

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  expressValidator({
    customValidators: {
      isArray: function(value) {
        return Array.isArray(value);
      },
      gte: function(param, num) {
        return param >= num;
      }
    }
  })
);
app.use(cookieParser());

const ONE_DAY = 86400000;
const THIRTY_DAYS = ONE_DAY * 30;
app.use(
  "/dist",
  express.static(path.join(__dirname, "../dist"), {
    maxAge: THIRTY_DAYS
  })
);

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    let token =
      (req.headers.authorization && req.headers.authorization.split(" ")[1]) ||
      req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    let payload = req.isAuthenticated();
    new User({ id: payload.sub }).fetch().then(function(user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});

function wrap(fn) {
  return function(req, res, next) {
    fn(req, res).then().catch(next);
  };
}

app.get("/api/users/me", userController.ensureAuthenticated, userController.me);
app.put(
  "/api/users/account",
  userController.ensureAuthenticated,
  userController.accountPut
);
app.delete(
  "/api/users/account",
  userController.ensureAuthenticated,
  userController.accountDelete
);
app.post("/api/users/signup", userController.signupPost);
app.post("/api/users/login", userController.loginPost);
app.post("/api/users/forgot", userController.forgotPost);
app.post("/api/users/reset/:token", userController.resetPost);
app.get(
  "/api/unlink/:provider",
  userController.ensureAuthenticated,
  userController.unlink
);
app.post("/api/auth/github", wrap(userController.authGithub));
app.get("/api/auth/github/callback", userController.authGithubCallback);

app.get("/api/companies", wrap(companyController.index));
app.get("/api/companies/owned", wrap(companyController.owned));
app.post(
  "/api/companies",
  userController.ensureAuthenticated,
  wrap(companyController.create)
);
app.get("/api/companies/:id", wrap(companyController.read));
app.post(
  "/api/companies/:id",
  userController.ensureAuthenticated,
  wrap(companyController.update)
);
app.delete(
  "/api/companies/:id",
  userController.ensureAuthenticated,
  wrap(companyController.delete)
);

app.get("/api/jobs", wrap(jobController.index));
app.post(
  "/api/jobs",
  userController.ensureAuthenticated,
  wrap(jobController.create)
);
app.get("/api/jobs/:id", wrap(jobController.read));
app.post(
  "/api/jobs/:id",
  userController.ensureAuthenticated,
  wrap(jobController.update)
);
app.delete(
  "/api/jobs/:id",
  userController.ensureAuthenticated,
  wrap(jobController.delete)
);

app.get("/api/health", function(req, res) {
  res.send({ status: "ok" });
});

if (app.get("env") === "development") {
  let webpack = require("webpack");
  let config = require("../webpack.config.dev.js").default;
  let compiler = webpack(config);
  app.use(
    require("webpack-dev-middleware")(compiler, {
      serverSideRender: true,
      noInfo: true,
      publicPath: config.output.publicPath
    })
  );
  app.use(require("webpack-hot-middleware")(compiler));
}

function getBundledAssets(res) {
  let manifest;
  let publicPath = "/dist/";
  if (app.get("env") === "production") {
    manifest = require("../dist/manifest.json");
  } else {
    publicPath = "/";
    manifest = {
      main: res.locals.webpackStats.toJson().assetsByChunkName.main
    };
  }

  const assets = Object.entries(manifest)
    .reduce((arr, val) => {
      if (Array.isArray(val[1])) {
        val[1].forEach(v => {
          arr.push(v);
        });
      } else {
        arr.push(val[1]);
      }
      return arr;
    }, [])
    .map(val => `${publicPath}${val}`);

  const css = assets.filter(a => a.endsWith(".css"));
  const js = assets.filter(a => a.endsWith(".js"));

  return {
    js,
    css
  };
}

app.get("*", (req, res) => {
  const initialState = {
    auth: {
      token: req.cookies.token,
      user: req.user ? req.user.toJSON() : null
    },
    messages: {}
  };

  const { js, css } = getBundledAssets(res);

  res.render("layouts/main", { assets: { js, css }, initialState });
});

// // React server rendering
// app.use(function(req, res) {
//   var initialState = {
//     auth: {
//       token: req.cookies.token,
//       user: req.user ? req.user.toJSON() : null
//     },
//     messages: {}
//   };

//   var store = configureStore(initialState);

//   Router.match({ routes: routes.default(store), location: req.url }, function(
//     err,
//     redirectLocation,
//     renderProps
//   ) {
//     if (err) {
//       res.status(500).send(err.message);
//     } else if (redirectLocation) {
//       res
//         .status(302)
//         .redirect(redirectLocation.pathname + redirectLocation.search);
//     } else if (renderProps) {
//       var html = ReactDOM.renderToString(
//         React.createElement(
//           Provider,
//           { store: store },
//           React.createElement(Router.RouterContext, renderProps)
//         )
//       );
//       res.render("layouts/main", {
//         html: html,
//         initialState: store.getState()
//       });
//     } else {
//       res.sendStatus(404);
//     }
//   });
// });

// Production error handler
if (app.get("env") === "production") {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

const server = app.listen(app.get("port"), function() {
  console.log(
    `Express (${app.get("env")}) server listening on port ${app.get("port")}`
  );
});

process.on("SIGINT", function onSigint() {
  console.info("Got SIGINT. Graceful shutdown ", new Date().toISOString());
  shutdown();
});

process.on("SIGTERM", function onSigterm() {
  console.info("Got SIGTERM. Graceful shutdown ", new Date().toISOString());
  shutdown();
});

function shutdown() {
  server.close(function onServerClosed(err) {
    if (err) {
      console.error(err);
      process.exitCode = 1;
    }
    process.exit();
  });
}

// Initialize the slack bot
const bot = require("./services/slack/jobs");
bot();

module.exports = app;
