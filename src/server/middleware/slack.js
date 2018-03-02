import User from '../business/users';

export default (req, res) => {
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
};
