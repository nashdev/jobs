import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';

export const authenticationHandler = expressJwt({
  secret: process.env.TOKEN_SECRET,
  credentialsRequired: false,
  getToken: req => req.cookies.token,
});

export const errorHandler = (err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  if (err instanceof Jwt401Error) {
    console.error('[express-jwt-error]', req.cookies.token);
    // `clearCookie`, otherwise user can't use web-app until cookie expires
    res.clearCookie('token');
  }
  next(err);
};
