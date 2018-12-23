const shouldRedirect = (req) =>
  !req.secure &&
  req.get("x-forwarded-proto") !== "https" &&
  process.env.NODE_ENV === "production";

export default (req, res, next) => {
  if (shouldRedirect) {
    return res.redirect(`https://${req.get("host")}${req.url}`);
  }
  return next();
};
