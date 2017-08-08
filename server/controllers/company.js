let Company = require("../models/Company");

exports.create = async function(req, res, next) {
  req.assert("name", "Please enter a valid company name").notEmpty();
  req.assert("location", "Please enter a valid location").notEmpty();
  req.assert("phone", "Please enter a phone number").notEmpty();
  req.assert("size", "Please enter a company size").isInt();
  req.assert("description", "Please enter a description").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).send({ errors: errors });
  }

  try {
    const data = Object.assign({}, req.body, { user_id: req.user.id });
    const company = await Company.forge(data).save();
    res.send({
      data: company,
      errors: null
    });
  } catch (err) {
    res.status(400).send({
      errors: null,
      data: [
        {
          param: "name",
          msg: "Sorry, this company name already exists."
        }
      ]
    });
  }
};

// update
exports.update = async function(req, res, next) {
  req.assert("name", "Please enter a valid company name").notEmpty();
  req.assert("location", "Please enter a valid location").notEmpty();
  req.assert("phone", "Please enter a phone number").notEmpty();
  req.assert("size", "Please enter a company size").isInt();
  req.assert("description", "Please enter a description").notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).send({ errors: errors });
  }

  try {
    const company = await new Company({
      id: req.params.id,
      user_id: req.user.id
    }).save(req.body, { patch: true });

    res.send({
      data: company,
      errors: null
    });
  } catch (err) {
    res.status(400).send({
      errors: [
        {
          param: "name",
          msg: err
        }
      ]
    });
  }
};

// read
exports.read = async function(req, res, next) {
  try {
    const company = await Company.where({ id: req.params.id }).fetch({
      withRelated: ["user", "jobs"]
    });
    res.send({
      data: company.toJSON(),
      errors: null
    });
  } catch (err) {
    res.status(400).send({
      errors: [
        {
          param: "id",
          msg: "Sorry, that company was not found."
        }
      ]
    });
  }
};

// delete
exports.delete = async function(req, res, next) {
  try {
    const company = await Company.where({
      id: req.params.id,
      user_id: req.user.id
    }).destroy();

    res.send({
      data: company.toJSON(),
      errors: null
    });
  } catch (err) {
    res.status(400).send({
      errors: [
        {
          param: "id",
          msg: "Sorry, that company was not found."
        }
      ]
    });
  }
};

// index
exports.index = async function(req, res) {
  const companies = await Company.forge()
    .orderBy("created_at", "DESC")
    .fetchAll({
      withRelated: ["user"]
    });
  res.send({ data: companies });
};

exports.owned = async function(req, res) {
  const companies = await Company.where({ user_id: req.user.id }).fetchAll({
    withRelated: "user"
  });
  res.send({ data: companies, errors: null });
};
