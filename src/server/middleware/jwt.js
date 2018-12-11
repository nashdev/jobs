import expressJwt, { UnauthorizedError as Jwt401Error } from "express-jwt";

export const authenticationHandler = expressJwt({
  secret: process.env.TOKEN_SECRET,
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring(req) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      return req.headers.authorization.split(" ")[1];
    }
    if (req.query && req.query.token) {
      return req.query.token;
    }
    if (req.cookies && req.cookies.token) {
      return req.cookies.token;
    }
    return null;
  },
});

export const errorHandler = (err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error("[express-jwt-error]", req.cookies.token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie("token");
  }
  next(err);
};
