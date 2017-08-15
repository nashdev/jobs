const Job = require("../models/Job");
const events = require("events");
const eventEmitter = require("../events");

exports.create = async function(req, res, next) {
  req.assert("company_id", "Please enter a valid company name.").isInt();
  req.assert("title", "Please enter a valid job title.").notEmpty();
  req.assert("description", "Please enter a valid job description.").notEmpty();
  req.assert("type", "Please select a valid type type.").notEmpty();
  req
    .assert("recruiter_agency", "Please enter a valid recruiter agency.")
    .optional();
  req.assert("location", "Please enter a valid job location.").notEmpty();
  req
    .assert(
      "contact_slack",
      "Please enter a slack nickname that somoene can reach you at."
    )
    .optional();
  req.assert("contact_email", "Please enter a contact e-mail.").isEmail();
  req
    .assert("contact_phone", "Please enter a valid contact phone number.")
    .notEmpty();
  req
    .assert("contact_website", "Please enter a valid website URL.")
    .optional()
    .isURL();
  req
    .assert("contact_person", "Please enter a valid contact person.")
    .notEmpty();
  req
    .assert("experience_range", "Please enter a valid experience range.")
    .isInt();
  req
    .assert("lower_salary", "Salaries Must be at least $30,000.")
    .isInt()
    .gte(30000);
  req
    .assert(
      "remote_available",
      "Please select a valid remote available option."
    )
    .isBoolean();
  req
    .assert("recruiter", "Please select a valid recruiter option.")
    .isBoolean();

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).send({ errors: errors });
  }

  try {
    // TODO: confirm that user can manage company?
    const data = Object.assign({}, req.body, { user_id: req.user.id });
    const job = await Job.forge(data).save();
    const newJob = await Job.where({
      id: job.id,
      user_id: req.user.id
    }).fetch({
      withRelated: ["user", "company"]
    });
    eventEmitter.emit("jobs:created", newJob.toJSON());

    res.send({
      data: newJob,
      errors: null
    });
  } catch (err) {
    console.log("error adding job", err);
    res.status(400).send({
      errors: [
        {
          param: "name",
          msg: "Sorry, there was a problem adding this job."
        }
      ]
    });
  }
};

// update
exports.update = async function(req, res, next) {
  req.assert("company_id", "Please enter a valid company_id").isInt();
  req.assert("title", "Please enter a valid title").notEmpty();
  req.assert("description", "Please enter a valid description").notEmpty();
  req.assert("type", "Please enter a valid type").notEmpty();
  req
    .assert("recruiter_agency", "Please enter a valid recruiter_agency")
    .optional();
  req.assert("location", "Please enter a valid location").notEmpty();
  req.assert("contact_slack", "Please enter a valid contact_slack").optional();
  req.assert("contact_email", "Please enter a valid contact_email").isEmail();
  req.assert("contact_website", "Please enter a valid contact_website").isURL();
  req
    .assert("contact_person", "Please enter a valid contact_person")
    .notEmpty();
  req
    .assert("experience_range", "Please enter a valid experience_range")
    .isInt();
  req.assert("lower_salary", "Please enter a valid lower_salary").isInt();
  req.assert("upper_salary", "Please enter a valid upper_salary").isInt();
  req
    .assert("remote_available", "Please enter a valid remote_available")
    .isBoolean();

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).send({ errors: errors });
  }

  try {
    const job = await new Job({
      id: req.params.id,
      user_id: req.user.id
    }).save(req.body, { patch: true });

    const updatedJob = await Job.where({
      id: job.id,
      user_id: req.user.id
    }).fetch({
      withRelated: ["user", "company"]
    });

    eventEmitter.emit("jobs:updated", updatedJob.toJSON());

    res.send({
      data: updatedJob,
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
    const job = await Job.where({ id: req.params.id }).fetch({
      withRelated: ["user", "company"]
    });
    res.send({
      data: job.toJSON(),
      errors: null
    });
  } catch (err) {
    res.status(400).send({
      errors: [
        {
          param: "id",
          msg: "Sorry, that job was not found."
        }
      ]
    });
  }
};

// delete
exports.delete = async function(req, res, next) {
  try {
    const job = await Job.where({
      id: req.params.id,
      user_id: req.user.id
    }).destroy();

    res.send({
      data: job.toJSON(),
      errors: null
    });
  } catch (err) {
    res.status(400).send({
      errors: [
        {
          param: "id",
          msg: "Sorry, that job was not found."
        }
      ]
    });
  }
};

// index
exports.index = async function(req, res) {
  const jobs = await Job.forge().orderBy("created_at", "DESC").fetchPage({
    page: req.query.page || 1,
    pageSize: req.query.pageSize || 10,
    withRelated: ["user", "company"]
  });
  res.send({ data: jobs, pagination: jobs.pagination });
};
