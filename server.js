var express = require("express");
var path = require("path");
var logger = require("morgan");
var compression = require("compression");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var dotenv = require("dotenv");
var React = require("react");
var ReactDOM = require("react-dom/server");
var Router = require("react-router");
var Provider = require("react-redux").Provider;
var exphbs = require("express-handlebars");
var jwt = require("jsonwebtoken");
var moment = require("moment");
var request = require("request");
var postcss = require("postcss-middleware");
var cssnext = require("postcss-cssnext");
var atImport = require("postcss-import");
var webpack = require("webpack");
var config = require("./webpack.config");

// Load environment variables from .env file
dotenv.load();

// ES6 Transpiler
require("babel-core/register");
require("babel-polyfill");

// Models
var User = require("./server/models/User");

// Controllers
var userController = require("./server/controllers/user");

// React and Server-Side Rendering
var routes = require("./client/routes");
var configureStore = require("./client/store/configureStore").default;

var app = express();

var compiler = webpack(config);

var hbs = exphbs.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "server", "views", "layouts"),
  partialsDir: path.join(__dirname, "server", "views", "partials"),
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

app.set("views", path.join(__dirname, "server", "views"));
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

app.set("port", process.env.PORT || 3000);
app.use(compression());

app.use(
  "/css",
  postcss({
    src: function(req) {
      return path.join(__dirname, "server", "public", "css", req.path);
    },
    plugins: [atImport(), cssnext()]
  })
);

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token =
      (req.headers.authorization && req.headers.authorization.split(" ")[1]) ||
      req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    new User({ id: payload.sub }).fetch().then(function(user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});

if (app.get("env") === "development") {
  app.use(
    require("webpack-dev-middleware")(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath
    })
  );
  app.use(require("webpack-hot-middleware")(compiler));
}

function wrap(fn) {
  return function(req, res, next) {
    fn(req, res).then().catch(next);
  };
}

app.put(
  "/account",
  userController.ensureAuthenticated,
  userController.accountPut
);
app.delete(
  "/account",
  userController.ensureAuthenticated,
  userController.accountDelete
);
app.post("/signup", userController.signupPost);
app.post("/login", userController.loginPost);
app.post("/forgot", userController.forgotPost);
app.post("/reset/:token", userController.resetPost);
app.get(
  "/unlink/:provider",
  userController.ensureAuthenticated,
  userController.unlink
);
app.post("/auth/github", wrap(userController.authGithub));
app.get("/auth/github/callback", userController.authGithubCallback);

// React server rendering
app.use(function(req, res) {
  var initialState = {
    auth: { token: req.cookies.token, user: req.user },
    messages: {}
  };

  var store = configureStore(initialState);

  Router.match({ routes: routes.default(store), location: req.url }, function(
    err,
    redirectLocation,
    renderProps
  ) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res
        .status(302)
        .redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var html = ReactDOM.renderToString(
        React.createElement(
          Provider,
          { store: store },
          React.createElement(Router.RouterContext, renderProps)
        )
      );
      res.render("layouts/main", {
        html: html,
        initialState: store.getState()
      });
    } else {
      res.sendStatus(404);
    }
  });
});

// Production error handler
if (app.get("env") === "production") {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

app.listen(app.get("port"), function() {
  console.log("Express server listening on port " + app.get("port"));
});

module.exports = app;
