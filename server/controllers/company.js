var Company = require("../models/Company");

exports.create = async function(req, res, next) {
  req.assert("name", "Please enter a valid company name").notEmpty();
  req.assert("location", "Please enter a valid location").notEmpty();
  req.assert("phone", "Please enter a phone number").notEmpty();
  req.assert("size", "Please enter a phone number").isInt();

  var errors = req.validationErrors();

  if (errors) {
    return res.status(400).send(errors);
  }

  try {
    const company = await new Company(req.body).save();
    res.send({
      company,
      error: null
    });
  } catch (err) {
    res.status(400).send([
      {
        param: "name",
        msg: "I don't know what happened, but its probably the name"
      }
    ]);
  }
};

// update

// delete

// read

// index

exports.index = async function(req, res, next) {
  const companies = await new Company({}).fetchAll();
  res.send(companies);
};
