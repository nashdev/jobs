import UsersService from "../services/users";

export default (req, res) => {
  UsersService.getToken({}, { code: req.query.code })
    .then(({ token, expiresIn }) => {
      res.cookie("token", token, { maxAge: 1000 * expiresIn });
      res.redirect("/dashboard");
    })
    .catch((e) => {
      console.error(e);
      res.redirect(`/slack/login?error=${e.message}`);
    });
};
